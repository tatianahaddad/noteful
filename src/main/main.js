import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import './main.css'
import DynamicFolder from '../dynamicFolder/dynamicFolder';
import DynamicNote from '../dynamicNote/dynamicNote'
import Store from '../dummy-store'



export class main extends Component {
  render() {
    return (
      <div>
        <header className='header'>
          <Link to ={'/'}>
            <h1 className='noteful'>Noteful</h1>
          </Link>
        </header>
        <div className='container'>
          <DynamicFolder store={Store} />
          <DynamicNote store={Store}/>
        </div>
      </div>
    )
  }
}

export default main
