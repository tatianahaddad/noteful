import React from 'react'
import PropType from 'prop-types'

export default function NotefulForm(props) {
  const { className, ...otherProps } = props
  return (
    <form
      className={['Noteful-form', className].join(' ')}
      action='#'
      {...otherProps}
    />
  )
}

NotefulForm.propType = {
  onSubmit: PropType.func.isRequired
}