import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import Store from '../dummy-store'
import DynamicNote from '../dynamicNote/dynamicNote'


export class sidebar extends Component {
  render() {
    //const folders = this.props.folders
    console.log(Store,'sidebar');
    /*const folder = Store.find(folder => 
      folder.id === this.props.match.params.folderId)*/
    return (
      <div>
        <header className='header'>
          <Link to ={'/'}>
            <h1 className='noteful'>Noteful</h1>
          </Link>
        </header>
        <div className='folders'>
            {}
          </div>
      </div>
    )
  }
}

export default sidebar
