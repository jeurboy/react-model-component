import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { LoaderContext } from './const.js'
import { has } from 'lodash'

const initialState = {
  details: [],
  modelName: '',
  loading: false
}

export class RMCGlobalLoader extends PureComponent {
  constructor (props) {
    super(props)

    this.state = { ...initialState }
  }

  componentDidUpdate (prevProps, prevState) {
    if (this.state.loading !== true) {
      this.getListDetail(this.props.configs)
    }
  }

  componentDidMount () {
  }

  getListDetail = async (configs) => {
    const details = {}

    configs.forEach((config) => {
      const apiHandler = config.apiHandler
      const idList = this.props[config.modelName + 'Id']
      const modelName = config.modelName

      if (!has(this.props, config.modelName + 'Id') || idList === []) {
        return false
      }

      const rGetOrganizationDetail = apiHandler(idList.join())

      details[modelName] = rGetOrganizationDetail

      return true
    })

    this.setState((prevState) => {
      return {
        ...prevState,
        loading: true,
        details
      }
    })
  }

  render () {
    const { children } = this.props
    const { details } = this.state

    return (
      <LoaderContext.Provider value={{
        details,
        loader: true
      }}>
        {children}
      </LoaderContext.Provider>
    )
  }
}

RMCGlobalLoader.defaultProps = {
  children: null,
  configs: [{}]
}

RMCGlobalLoader.propTypes = {
  configs: PropTypes.arrayOf(PropTypes.object),
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
}
