import React, { PureComponent, createContext } from 'react'
import PropTypes from 'prop-types'
import { has } from 'lodash'

export const ModelContext = createContext({
	detail: {}
})

const initialState = {
  detail: {},
  loaded: false
}

export class RMCModel extends PureComponent {
  constructor (props) {
    super(props)

    this.state = { ...initialState }
  }
    componentDidMount() {
        const {oid} = this.props

        this.getDetail(oid)
    }
  componentDidUpdate (props, state) {
    const {oid} = this.props
    const {loaded} = this.state

    console.log('state', state)
    console.log('this.state', this.state)
    console.log('props', props)
    console.log('this.props', this.props)

// return;
    // Get detail of selected organization
    if (this.context.loader !== true) {
        if (props.oid !== oid) {
            return this.getDetail(oid)
        }
    }

    if (has(this.context, 'Organization')) {
      return this.loadDataList(oid, this.context.Organization)
    }

    return true
  }

  getDetail = async (organizationId) => {
    const rGetOrganizationDetail = await this.loadData(organizationId, this.props.apiHandler)

    if (rGetOrganizationDetail === null) {
        return false
    }

    return true
  }

    loadData = async (objectId, callback) => {
      const rGetDetail = await callback(objectId)

      this.setState((prevState) => {
        return {
          ...prevState,
          loaded: true,
          detail: rGetDetail
        }
      })

      return rGetDetail
    }

    loadDataList (objectId, detailList = []) {
    //   this.setState((prevState) => {
    //     return {
    //       ...prevState,
    //       loaded: true
    //     }
    //   })

      if (detailList.length === 0) {
        return false
      }

      detailList.forEach((element) => {
        //   console.log('objectId', objectId)
        // console.log('element' , element)
        if (objectId === element.Id) {
          this.setState((prevState) => {
            return {
              ...prevState,
              detail: element
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

      return (
        <DetailContextProvider value={{ detail }}>
          {children}
        </DetailContextProvider>
      )
    }

	// render () {
	// 	const renderElement = (context) => {
	// 		return this.renderContext(OrgDetailsContext.Provider);
    //     };

	// 	return (
    //   <ModelContext.Consumer>
    //     {renderElement}
    //   </ModelContext.Consumer>
	// 	);
	// }
}

RMCModel.defaultProps = {
  apiHandler: () => {},
  oid: '',
  children: null,
  detail: {}
}

RMCModel.propTypes = {
  apiHandler: PropTypes.func,
  oid: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]),
  detail: PropTypes.oneOfType([PropTypes.object])
}
