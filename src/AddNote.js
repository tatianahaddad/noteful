import React, { Component } from 'react'
import NotefulForm from './NotefulForm'
import NotefulContext from './notefulContext'
import config from './config'
import Error from './error'
import ValidationError from './validationError'

export default class AddNote extends Component {
  constructor(props){
    super(props)
    this.state = {
      name: '',
      content: '',
      nameValid: false,
      contentValid: false,
      formValid: false,
      validationMessages: {
        name: '',
        content: '',
      }
    }
  }

  updateName(name){
    this.setState({name}, () => {this.validateName(name)})
  }

  updateContent(content) {
    this.setState({content}, () => {this.validateContent(content)})
  }

  validateName(enteredValue) {
    const errors = {...this.state.validationMessages}
    let hasError= false;
    

    enteredValue= enteredValue.trim();
    if (enteredValue.length === 0) {
      errors.name= 'Please enter a name';
      hasError= true;
    } else {
      if (enteredValue.length < 3) {
        errors.name= 'Please enter a name with at least 3 characters'
        hasError= true;
      } else {
        errors.name = ''
        hasError = false;
      }
    }

    this.setState({
      validationMessages: errors,
      nameValid: !hasError
    }, this.formValid);
  }

  validateContent(enteredContent) {
    const errors = {...this.state.validationMessages}
    let hasError= false;

    enteredContent = enteredContent.trim()
    if(enteredContent.length === 0) {
      errors.content = 'Please enter content.'
      hasError= true;
    } else {
      errors.content = ''
      hasError= false
    }

    this.setState({
      validationMessages: errors,
      contentValid: !hasError
    }, this.formValid)
  }

  formValid() {
    this.setState({
      formValid: this.state.nameValid && this.state.contentValid
    });
  }
  static defaultProps = {
    history: {
      push: () => { }
    },
  }
  static contextType = NotefulContext;

  handleSubmit = e => {
    e.preventDefault()
    const newNote = {
      name: e.target['note-name'].value,
      content: e.target['note-content'].value,
      folderId: e.target['note-folder-id'].value,
      modified: new Date(),
    }
    fetch(`${config.API_ENDPOINT}/notes`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(newNote),
    })
      .then(res => {
        if (!res.ok)
          return res.json().then(e => Promise.reject(e))
        return res.json()
      })
      .then(note => {
        this.context.addNote(note)
        this.props.history.push(`/folder/${note.folderId}`)
      })
      .catch(error => {
        console.error({ error })
      })
  }

  render() {
    const { folders=[] } = this.context
    return (
      <section className='AddNote'>
        <h2>Create a note</h2>
        <Error>
          <NotefulForm onSubmit={this.handleSubmit}>
            <div className='field'>
              <label htmlFor='note-name-input'>
                Name
              </label>
              <input type='text' id='note-name-input' name='note-name' required onChange={e => this.updateName(e.target.value)}/>
              <ValidationError hasErrors={!this.state.nameValid} message={this.state.validationMessages.name} />
            </div>
            <div className='field'>
              <label htmlFor='note-content-input'>
                Content
              </label>
              <textarea id='note-content-input' name='note-content' required 
              onChange={e=> this.updateContent(e.target.value)}
              />
              <ValidationError hasErrors={!this.state.contentValid} message={this.state.validationMessages.content} />
            </div>
            <div className='field'>
              <label htmlFor='note-folder-select'>
                Folder
              </label>
              <select id='note-folder-select' name='note-folder-id'>
                <option value={null}>...</option>
                {folders.map(folder =>
                  <option key={folder.id} value={folder.id}>
                    {folder.name}
                  </option>
                )}
              </select>
            </div>
            <div className='buttons'>
              <button type='submit' disabled= {!this.state.formValid}>
                Add note
              </button>
            </div>
          </NotefulForm>
        </Error>
      </section>
    )
  }
}