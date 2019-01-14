import React, { Component } from 'react';
import { RMCModel, RMCModelElement, RMCGlobalLoader} from 'react-model-component';

const GlobalLoader = (props) => (
  <RMCGlobalLoader
    configs={[
      {
        apiHandler: CompanyLoaderApiList,
        modelName: "Company"
      },{
        apiHandler: OrganizationApiList,
        modelName: "Organization"
      }
    ]}
  {...props}>{props.children}</RMCGlobalLoader>
)

/* Organization confuguration */

const OrganizationObject = (props) => (
  <RMCModel modelName="Organization" apiHandler={OrganizationApiDetail} Primarykey="Id" {...props}>{props.children}</RMCModel>
)
const OrganizationField = (props) => (
  <RMCModelElement modelName="Organization" {...props}>{props.children}</RMCModelElement>
)

/* CompanyLoader confuguration */

const CompanyObject = (props) => (
  <RMCModel modelName="Company" apiHandler={CompanyApiDetail} {...props}>{props.children}</RMCModel>
)
const CompanyField = (props) => (
  <RMCModelElement modelName="Company" {...props}>{props.children}</RMCModelElement>
)

const initialState = {
  loading :false,
}

class App extends Component {
	constructor (props) {
		super(props);

		this.state = { ...initialState };
  }

  componentDidMount() {
    this.setState((prevState) => {
      return {
        ...prevState,
        loading: true
      }
    })
  }

  render() {
    return (
      <div className="App">
          <GlobalLoader CompanyId={[1,2,3,4]} OrganizationId={['as', 'df']}>
            <OrganizationObject oid="1234">
              Organization 1234 name : <b><OrganizationField field="Name"/></b> <br/>
              Organization 1234 surname : <OrganizationField field="SurName"/> <br/>
            </OrganizationObject>

            <CompanyObject oid="asdf">
              CompanyName : <CompanyField field="Name"/> <br/>
            </CompanyObject>

            <OrganizationObject oid="1234">
              Organization 1234 name : <b><OrganizationField field="Name"/></b> <br/>
              Organization 1234 surname : <OrganizationField field="SurName"/> <br/>
            </OrganizationObject>
        </GlobalLoader>
      </div>
    );
  }
}

const CompanyLoaderApiList = (IDs) => {
  console.log('Call CompanyLoaderApiList ', IDs)
  return [
    {
      id: 'asdf',
      Name: 'Company: asdf'
    },
    {
      id: 'ghjk',
      Name: 'Company: ghjk'
    },
  ]
}
const CompanyApiDetail = (ID) => {
  console.log('Call CompanyApiDetail ', ID)
  return {
    id: 'asdf',
    Name: 'Company: asdf'
  }
}

const OrganizationApiList = (IDs) => {
  console.log('Call OrganizationApiList ', IDs)
  return [
    {
      Id: '1234',
      Name: 'Organization Name List: 1234',
      SurName: 'SurName List: 1234',
      Abbv: 'ABBv'
    },
    {
      Id: '1235',
      Name: 'Organization Name List: 1235',
      SurName: 'SurName List: 1235'
    },
    {
      Id: '1236',
      Name: 'Organization Name List: 1236',
      SurName: 'SurName List: 1236'
    }
  ]
}
const OrganizationApiDetail = (ID) => {
  console.log('Call OrganizationApiDetail ', ID)
  return {
    Id: ID,
    Name: 'Name detail '+ID,
    SurName: 'SurName detail '+ID
  }
}

export default App;
