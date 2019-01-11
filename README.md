# react-model-component

>

[![NPM](https://img.shields.io/npm/v/react-model-component.svg)](https://www.npmjs.com/package/react-model-component) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save react-model-component
```

## Usage

```jsx
import React, { Component } from 'react';
import { RMCModel, ModelElement, RMCModelLoader, RMCGlobalLoader} from 'react-model-component';

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
  <RMCModel modelName="Organization" apiHandler={OrganizationApiDetail} {...props}>{props.children}</RMCModel>
)
const OrganizationField = (props) => (
  <ModelElement modelName="Organization" {...props}>{props.children}</ModelElement>
)


/* CompanyLoader confuguration */

const CompanyObject = (props) => (
  <RMCModel modelName="Company" apiHandler={CompanyApiDetail} {...props}>{props.children}</RMCModel>
)
const CompanyField = (props) => (
  <ModelElement modelName="Company" {...props}>{props.children}</ModelElement>
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
        <div>With .loader</div>
        <GlobalLoader OrganizationId={[1,2,3,4]} >
          <OrganizationObject oid="1234">
            <b><OrganizationField field="Name"/></b> <OrganizationField field="SurName"/>
          </OrganizationObject>

          <br/>

          <OrganizationObject oid="1236">
            <b><OrganizationField field="Name"/></b> <OrganizationField field="SurName"/>
          </OrganizationObject>
        </GlobalLoader>

        <div>Without .loader</div>
        <OrganizationObject oid="1235">
          <b><OrganizationField field="Name"/></b> <OrganizationField field="SurName"/>
        </OrganizationObject>

        <div>Multi .loader</div>
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
      Id: 'asdf',
      Name: 'Company: asdf'
    },
    {
      Id: 'ghjk',
      Name: 'Company: ghjk'
    },
  ]
}
const CompanyApiDetail = (ID) => {
  console.log('Call CompanyApiDetail ', ID)
  return {
    Id: 'asdf',
    Name: 'Company: asdf'
  }
}

const OrganizationApiList = (IDs) => {
  console.log('Call OrganizationApiList ', IDs)
  return [
    {
      Id: '1234',
      Name: 'Name List 1234',
      SurName: 'SurName List 1234'
    },
    {
      Id: '1235',
      Name: 'Name List 1235',
      SurName: 'SurName List 1235'
    },
    {
      Id: '1236',
      Name: 'Name List 1236',
      SurName: 'SurName List 1236'
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


```

## License

MIT © [jeurboy](https://github.com/jeurboy)
