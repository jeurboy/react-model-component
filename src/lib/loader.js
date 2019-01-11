import React, { PureComponent } from 'react'
import { createContext } from 'react'
import PropTypes from 'prop-types'
import { LoaderContext } from './const.js'

const initialState = {
  details: [],
  modelName: '',
  loading: false
}

export class RMCModelLoader extends PureComponent {
  constructor (props) {
    super(props)

    this.state = { ...initialState }
  }

  componentDidUpdate (prevProps, prevState) {
    const { idList } = this.props

    if (this.state.loading === false) {
    // Get detail of selected organization
      this.getListDetail(idList)
    }
  }

  componentDidMount () {
  }

  getListDetail = async (idList) => {
    const { modelName } = this.props
    if (idList === []) {
      return null
    }

    const rGetOrganizationDetail = await this.props.apiHandler({
      Id: idList.join()
    })

    this.setState((prevState) => {
      return {
        ...prevState,
        loading: true,
        details: {
          [modelName]: rGetOrganizationDetail
        }
      }
    })

    return rGetOrganizationDetail
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

RMCModelLoader.defaultProps = {
  apiHandler: () => { },
  children: null,
  idList: [],
  modelName: ''
}

RMCModelLoader.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]),
  apiHandler: PropTypes.func,
  idList: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  modelName: PropTypes.string
}
