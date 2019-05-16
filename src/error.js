import React, { Component } from 'react'


export class addFolderError extends Component {
  static getDerivedStateFromError(error) {
    return { hasError: true }
  }
  render() {

    if(this.props.value){
      return (
        <h2>Couldn't display info</h2>
      )
    }
  return (
    this.props.children
  )  
  }
}

export default addFolderError
