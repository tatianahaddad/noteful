import { Route, Link } from 'react-router-dom';
import NoteListNav from './noteListNav';
import NotePageNav from './NotePageNav';
import NoteListMain from './NoteListMain';
import NotePageMain from './NotePageMain';
import AddFolder from './AddFolder';
import AddNote from './AddNote';
//import dummyStore from './dummy-store'
//import { getNotesForFolder, findNote, findFolder } from './notes-helpers'
import NotefulContext from './notefulContext'
import config from './config'


import React, { Component } from 'react'

class App extends Component {
  state = {
    notes: [],
    folders: [],
  };

  componentDidMount() {
    Promise.all([
      fetch(`${config.API_ENDPOINT}/notes`),
      fetch(`${config.API_ENDPOINT}/folders`)
    ])
      .then(([notesRes, foldersRes]) => {
        if (!notesRes.ok)
          return notesRes.json().then(e => Promise.reject(e))
        if (!foldersRes.ok)
          return foldersRes.json().then(e => Promise.reject(e))

        return Promise.all([
          notesRes.json(),
          foldersRes.json(),
        ])
      })
      .then(([notes, folders]) => {
        this.setState({ notes, folders })
      })
      .catch(error => {
        console.error({ error })
      })
    }

    handleAddFolder = folder => {
      this.setState({
        folders: [
          ...this.state.folders,
          folder
        ]
      })
    }
  
    handleAddNote = note => {
      this.setState({
        notes: [
          ...this.state.notes,
          note
        ]
      })
    }
  
    handleDeleteNote = noteId => {
      this.setState({
        notes: this.state.notes.filter(note => note.id !== noteId)
      })
    }

    renderNavRoutes() {
      return (
        <>
          {['/', '/folder/:folderId'].map(path =>
            <Route
              exact
              key={path}
              path={path}
              component={NoteListNav}
            />
          )}
          <Route
            path='/note/:noteId'
            component={NotePageNav}
          />
          <Route
            path='/add-folder'
            component={NotePageNav}
          />
          <Route
            path='/add-note'
            component={NotePageNav}
          />
        </>
      )
    }
  
    renderMainRoutes() {
      return (
        <>
          {['/', '/folder/:folderId'].map(path =>
            <Route
              exact
              key={path}
              path={path}
              component={NoteListMain}
            />
          )}
          <Route
            path='/note/:noteId'
            component={NotePageMain}
          />

          <Route
            path='/add-folder'
            component={AddFolder}
          />
          <Route
            path='/add-note'
            component={AddNote}
          />
        </>
      )
    }
  
    render() {
      //throw new Error('error');
      const value = {
        notes: this.state.notes,
        folders: this.state.folders,
        addFolder: this.handleAddFolder,
        addNote: this.handleAddNote,
        deleteNote: this.handleDeleteNote,
      }
      

      return (
          <NotefulContext.Provider value={value}>
            <div className='App'>
              <nav className='App__nav'>
                {this.renderNavRoutes()}
              </nav>
              <header className='App__header'>
                <h1>
                  <Link to='/'>Noteful</Link>
                  {' '}
                </h1>
              </header>
              <main className='App__main'>
                {this.renderMainRoutes()}
              </main>
            </div>
          </NotefulContext.Provider>
        
      )
    }
  }
  
  export default App