# react-model-component

> 

[![NPM](https://img.shields.io/npm/v/react-model-component.svg)](https://www.npmjs.com/package/react-model-component) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save react-model-component
```

## Usage

```jsx
import React, { Component, Fragment } from 'react';
import { RMCModel, bindElement, DetailsContext, RMCModelLoader , ModelContext } from 'react-model-component';
import PropTypes from 'prop-types';

const MyRMCModelLoader = (props) => (
  <RMCModelLoader modelName="Organization" apiHandler={ApiList} {...props} >{props.children}</RMCModelLoader>
)
const MyRMCElementLoader = (props) => (
  <MyModelTest apiHandler={ApiDetail} {...props} >{props.children}</MyModelTest>
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
        <MyRMCModelLoader idList={[1,2,3,4]} >
          <MyRMCElementLoader oid="1234">
            <b><ModelElement field="Name"/></b> <ModelElement field="SurName"/>
          </MyRMCElementLoader>

          <br/>

          <MyRMCElementLoader oid="1236">
            <b><ModelElement field="Name"/></b> <ModelElement field="SurName"/>
          </MyRMCElementLoader>

        </MyRMCModelLoader>

        <MyRMCElementLoader oid="1235">
          <b><ModelElement field="Name"/></b> <ModelElement field="SurName"/>
        </MyRMCElementLoader>

      </div>
    );
  }
}

const ApiList = (IDs) => {
  console.log('Call ApiList ', IDs)
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
const ApiDetail = (ID) => {
  console.log('Call ApiDetail ', ID)
  return {
    Id: ID,
    Name: 'Name detail '+ID,
    SurName: 'SurName detail '+ID
  }
}


class MyModelTest extends RMCModel {
  static contextType = DetailsContext;

	render () {
		const renderElement = (context) => {
			return super.renderContext(OrgDetailsContext.Provider);
    };

		return (
      <DetailsContext.Consumer>
        {renderElement}
      </DetailsContext.Consumer>
		);
	}
}

const OrgDetailsContext = ModelContext

const ModelElement = (props) => {
	const renderElement = (context) => {
		return <Fragment>{ bindElement(props.field, context.detail) }</Fragment>;
	};

	return <OrgDetailsContext.Consumer>{renderElement}</OrgDetailsContext.Consumer>;
};

ModelElement.defaultProps = {
	field: ''
};

ModelElement.propTypes = {
	field: PropTypes.string
};


export default App;

```

## License

MIT © [jeurboy](https://github.com/jeurboy)
