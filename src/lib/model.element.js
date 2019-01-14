import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { has } from 'lodash'
import { ModelContext } from './const.js'

export const bindElement = (fieldSelect, contextDetail) => {
  if (!has(contextDetail, fieldSelect)) {
    return null
  }

  return contextDetail[fieldSelect]
}

export class RMCModelElement extends React.Component {
  render () {
    const { field, modelName } = this.props
    const renderElement = (context) => {
      // console.log('element', context)
      return <Fragment>{ bindElement(field, context.detail[modelName]) }</Fragment>
    }

    return <ModelContext.Consumer>{renderElement}</ModelContext.Consumer>
  }
}

RMCModelElement.defaultProps = {
  field: ''
}

RMCModelElement.propTypes = {
  field: PropTypes.string,
  modelName: PropTypes.string
}
