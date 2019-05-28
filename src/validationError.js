import React from 'react'
import PropTypes from 'prop-types'

export default function validationError(props) {
  console.log(props.message, 'props message')
  if(props.hasErrors) {
    return <div>{props.message}</div>
  }

  return <></>
}

validationError.propTypes = {
  hasErrors: PropTypes.bool,
  message: PropTypes.string
}