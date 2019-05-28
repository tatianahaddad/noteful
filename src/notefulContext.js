import React from 'react'

export default React.createContext({
  notes: [],
  folders: [],
  addFolder: () => {},
  addNote: () => {},
  deleteNote: () => {},
  hasError: false,
  name: '',
  validationMessages : {
    name: '',
    addFolder: ''
  }
})
