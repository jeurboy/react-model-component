import React, { PureComponent, createContext } from 'react'
import PropTypes from 'prop-types'

const initialState = {
  details: [],
  modelName: '',
  loading: false
}

export const DetailsContext = createContext({
  details: []
})

export class RMCModelLoader extends PureComponent {
  constructor (props) {
    super(props)
    this.state = { ...initialState }
  }

  componentDidUpdate (props, state) {
    const { idList } = this.props

    if (props.idList !== idList) {
    // Get detail of selected organization
      this.getListDetail(idList)
    }
  }

  componentDidMount () {
    // console.log('componentDidMount')
  }

  getListDetail = async (idList) => {
    if (idList === []) {
      return null
    }

    this.setState((prevState) => {
      return {
        ...prevState,
        loading: true
      }
    })

    const rGetOrganizationDetail = await this.props.apiHandler({
      Id: idList.join()
    })

    // 	if (!has(rGetOrganizationDetail, 'status.code')) {
    // 	return null
    // 	}

    //   if (rGetOrganizationDetail.status.code !== 200) {
    // 	return null
    // 	}

    //   if (!has(rGetOrganizationDetail, 'data')) {
    // 	return null
    // 	}

    this.setState((prevState) => {
      return {
        ...prevState,
        details: rGetOrganizationDetail
      }
    })

    return rGetOrganizationDetail
  }

  render () {
    const { children, modelName } = this.props
    const { details } = this.state

    return (
      <DetailsContext.Provider value={{ [modelName]: details, loader: true }}>
        {children}
      </DetailsContext.Provider>
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
