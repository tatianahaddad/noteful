import React, { Component } from 'react'
import PropTypes from 'prop-types'


export class Error extends Component {
  constructor(props) {
    super(props) 
    this.state = {
      hasError: false
    }
  }
  static getDerivedStateFromError(error) {
    return { hasError: true }
  }
  render() {

    if(this.state.hasError) {
      return (
        <h2>Couldn't display info</h2>
      )
    }
    return (
      this.props.children
    )  
  }
}

Error.propTypes = {
  children : PropTypes.object

}

export default Error
