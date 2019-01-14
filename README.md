# react-model-component
The component to mapping API data into React model and
>

[![NPM](https://img.shields.io/npm/v/react-model-component.svg)](https://www.npmjs.com/package/react-model-component) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save react-model-component
```

## Usage
This component supports for React rendering only and not yet tested on React-Native.

### How to use ModelComponent rendering single object
1. import the components of model-component

```jsx
  import { RMCModel, RMCModelElement, RMCGlobalLoader} from 'react-model-component';
```

2. Create api handle const which having input field as string of Id and return data as a key-value object.
``` jsx
  const OrganizationApiDetail = (ID) => {
    console.log('Call OrganizationApiDetail ', ID)
    return {
      Id: ID,
      Name: 'Name detail '+ID,
      SurName: 'SurName detail '+ID
    }
  }
```

3. Bind api const into RMCModel component. The parameter modelName can be anything but should be the same in all scope

```jsx
const OrganizationObject = (props) => (
  <RMCModel modelName="Organization" apiHandler={OrganizationApiDetail} {...props}>{props.children}</RMCModel>
)
```

if your api doesn't use ket name 'id' as a primary key then you can modify with prop name Primarykey.

```jsx
const OrganizationObject = (props) => (
  <RMCModel modelName="Organization" apiHandler={OrganizationApiDetail} Primarykey="Id" {...props}>{props.children}</RMCModel>
)
```

4. Create element
```jsx
const OrganizationField = (props) => (
  <RMCModelElement modelName="Organization" {...props}>{props.children}</RMCModelElement>
)
```

5. To use the model-component you shuold create Object and put Element inside.
Beware of difference modelName, The field rendered may be blank.
```jsx
  <OrganizationObject oid="1234">
    <b><OrganizationField field="Name"/></b>
    <OrganizationField field="SurName"/>
    <b><OrganizationField field="Abbv"/></b>
  </OrganizationObject>
```

### How to use ModelComponent rendering single object
Rendering single object is easiest way to render data from api but the weakness of render in this way, if we have multiple objects with various type of components we want to display in the same page.

Api will call with X times multiply by total objects.  In this case we needs to apply GlobalLoader to load whole data as a list.

This example will show the step to apply GlobalLoader into existing components.

1. First step define the const to handle what api loader does. Input of the const will be array of id.

```jsx
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
```

2. Create Global config with RMCGlobalLoader Component and set config through props

```jsx
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
```

3. Wrap existings with loader object

```jsx
<GlobalLoader OrganizationId={[1,2,3,4]} >
  <OrganizationObject oid="1234">
    <b><OrganizationField field="Name"/></b> <OrganizationField field="SurName"/>
    <b><OrganizationField field="Abbv"/></b>
  </OrganizationObject>
</GlobalLoader>
```

Input id will pass by props name and the name of props refers with moduleName follow with string 'Id'

Examples: moduleName = Organization , props name of organization's id is OrganizationId

Multiple data tpye can be loaded from single loader also.

```jsx
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
```

## Example

```jsx
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

/* Organization configuration */

const OrganizationObject = (props) => (
  <RMCModel modelName="Organization" apiHandler={OrganizationApiDetail} Primarykey="Id" {...props}>{props.children}</RMCModel>
)
const OrganizationField = (props) => (
  <RMCModelElement modelName="Organization" {...props}>{props.children}</RMCModelElement>
)

/* CompanyLoader configuration */

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
        <div>With .loader</div>
        <GlobalLoader OrganizationId={[1,2,3,4]} >
          <OrganizationObject oid="1234">
            <b><OrganizationField field="Name"/></b> <OrganizationField field="SurName"/>
            <b><OrganizationField field="Abbv"/></b>
          </OrganizationObject>

          <br/>

          <OrganizationObject oid="1236">
            <b><OrganizationField field="Name"/></b> <OrganizationField field="SurName"/>
            <b><OrganizationField field="Name"/></b>
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

```

## License

Pornprasith Mahasith © [jeurboy](https://github.com/jeurboy)
