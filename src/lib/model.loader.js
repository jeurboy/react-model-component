import React, { PureComponent } from 'react'
import { createContext } from 'react'
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
      // console.log('config', config)
      // console.log('modeleName', config.modelName)
      // console.log('ID', this.props[config.modelName + 'Id'])
      const apiHandler = config.apiHandler
      const idList = this.props[config.modelName + 'Id']
      const modelName = config.modelName

      if (idList === []) {
        return null
      }

      const rGetOrganizationDetail = apiHandler({
        Id: idList.join()
      })

      details[modelName] = rGetOrganizationDetail
    })
    console.log('details', details)
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

    // console.log('props', this.props)
    // console.log('details', details)

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
  apiHandler: () => { },
  children: null,
  idList: [],
  modelName: ''
}

RMCGlobalLoader.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]),
  apiHandler: PropTypes.func,
  idList: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  modelName: PropTypes.string
}
