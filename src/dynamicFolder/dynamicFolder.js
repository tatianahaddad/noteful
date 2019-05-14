import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import './dynamicFolder.css'

export class dynamicFolder extends Component {
  render() {

    const folders = this.props.store.folders
      .map(folder => <Link store={this.props.store} to={`/folder/${folder.id}`}><div className='folder' key={folder.id}>{folder.name}</div> </Link>) 
    return (
        <div className='folders'>
          {folders}
        </div>
    )
  }
}

export default dynamicFolder
