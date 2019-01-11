import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { LoaderContext } from './const.js'

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

      if (idList === []) {
        return false
      }

      const rGetOrganizationDetail = apiHandler({
        Id: idList.join()
      })

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
        loader: { [this.props.modelName]: true }
      }}>
        {children}
      </LoaderContext.Provider>
    )
  }
}

RMCGlobalLoader.defaultProps = {
  children: null,
  modelName: '',
  configs: []
}

RMCGlobalLoader.propTypes = {
  configs: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]),
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]),
  modelName: PropTypes.string
}
