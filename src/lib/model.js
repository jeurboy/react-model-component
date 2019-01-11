import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { has } from 'lodash'

import { LoaderContext, ModelContext } from './const.js'

const initialState = {
  detail: {},
  loaded: false
}

export class RMCModel extends PureComponent {
  static contextType = LoaderContext;

  constructor (props) {
    super(props)

    this.state = { ...initialState }
  }
  componentDidMount() {
    const { oid } = this.props

    if (this.context.loader === true) {
      return
    }

    this.getDetail(oid)
  }

  componentDidUpdate (prevProps, prevState) {
    const {oid} = this.props

    // console.log('context ' + this.props.modelName, this.context)
    // console.log('state', state)
    // console.log('this.state', this.state)
    // console.log('props', prevProps)
    // console.log('this.props', this.props)

    if (this.state.loaded === true) {
      return
    }

    if (has(this.context.details, this.props.modelName)) {
      this.loadDataList(oid, this.context.details[this.props.modelName])
      return
    }

    // Get detail of selected organization
    if (this.context.loader !== true) {
      if (prevProps.oid !== oid) {
        this.getDetail(oid)
      }
    }
  }

  getDetail = async (organizationId) => {
    const rGetOrganizationDetail = await this.loadData(organizationId, this.props.apiHandler)

    if (rGetOrganizationDetail === null) {
      return false
    }

    return true
  }

  loadData = async (objectId, callback) => {
    const { modelName } = this.props
    const element = await callback(objectId)

    this.setState((prevState) => {
      return {
        ...prevState,
        loaded: true,
        detail: {
          [modelName]: element
        }
      }
    })

    return element
  }

  loadDataList (objectId, detailList = []) {
    const { modelName } = this.props

    if (detailList.length === 0) {
      return false
    }

    detailList.forEach((element) => {
      if (objectId === element.Id) {
        this.setState((prevState) => {
          return {
            ...prevState,
            loaded: true,
            detail: {
              [modelName]: element
            }
          }
        })
      }

      return true
    })

    return true
  }

  renderContext (DetailContextProvider) {
    const { children } = this.props
    const { detail } = this.state

    // console.log('model', detail)
    return (
      <DetailContextProvider value={{ detail }}>
        {children}
      </DetailContextProvider>
    )
  }

  render () {
    const renderElement = (context) => {
      return this.renderContext(ModelContext.Provider)
    }

    return (
      <LoaderContext.Consumer>
        {renderElement}
      </LoaderContext.Consumer>
    )
  }
}

RMCModel.defaultProps = {
  apiHandler: () => {},
  oid: '',
  children: null,
  detail: {},
  modelName: '',
  loading: false
}

RMCModel.propTypes = {
  apiHandler: PropTypes.func,
  oid: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]),
  modelName: PropTypes.string
}
