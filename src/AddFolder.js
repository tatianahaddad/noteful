import React, { Component } from 'react'
import NotefulForm from './NotefulForm'
import NotefulContext from './notefulContext';
import config from './config'
import PropType from 'prop-types'
import Error from './error'

export default class AddFolder extends Component {
  /*constructor(props) {
    super(props)
    this.state = {
      hasError: false,
      name: '',
      nameValid: false,
      validationMessages : {
        name: '',
        addFolder: ''
      }
    }
  }*/
  static defaultProps = {
    history: {
      push: () => { }
    },
  }
  static contextType = NotefulContext;

  handleSubmit = e => {
    e.preventDefault()
    const folder = {
      name: e.target['folder-name'].value
    }

    fetch(`${config.API_ENDPOINT}/folders`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(folder),
    })
      .then(res => {
        if (!res.ok)
          return res.json().then(e => Promise.reject(e))
        return res.json()
      })
      .then(folder => {
        this.context.addFolder(folder)
        this.props.history.push(`/folder/${folder.id}`)
      })
      .catch(error => {
        console.error({ error })
      })
  }

  /*updateName(name) {
    this.setState(
      {name}, () => this.validateName(name)
    )
  }

  validateName(enteredValue) {
    const errors =  this.state.validationMessages
    let hasErrors = false;
    console.log(errors, 'errors')

    enteredValue = enteredValue.trim()
      if(enteredValue.length === 0) {
        errors.name = 'Please enter a value'
        hasErrors = true
      } else {
        errors.name = ''
        hasErrors = false
      }
    
    this.setState({
      validationMessages: errors,
      nameValue : !hasErrors
    })
  }*/

  render() {
    //throw new Error('error')
    return (
      <section className='AddFolder'>
        <h2>Create a folder</h2>
        <Error>
          <NotefulForm onSubmit={this.handleSubmit}>
            <div className='field'>
              <label htmlFor='folder-name-input'>
                Name
              </label>
              <input type='text' id='folder-name-input' name='folder-name' required/>
            </div>
            <div className='buttons'>
              <button type='submit'>
                Add folder
              </button>
            </div>
          </NotefulForm>
        </Error>
      </section>
    )
  }
}
AddFolder.propType = {
  folders : PropType.string
}