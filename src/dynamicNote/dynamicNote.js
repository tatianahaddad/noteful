import React, { Component } from 'react'
import './dynamicNote.css'

export class dynamicNote extends Component {
  render() {
    const notes = this.props.store.notes
    .map(note => {
      return <div className='note'>
        <div key={note.id}>{note.name}</div>
        <div>Date modified: {note.modified}</div>
      </div>
    })
    return (
      <div className='notes'>
        {notes}
      </div>
    )
  }
}

export default dynamicNote
