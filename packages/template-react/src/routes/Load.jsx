import React from 'react';

export default (com) => {

  return class AsyncComponent extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        component: null
      };
    }

    async componentDidMount() {
      const { default: component } = await com();

      this.setState({
        component: component
      });
    }

    componentWillUnmount() {
      this.setState({
        component: null
      });
    }

    render() {
      const C = this.state.component;

      return C ? <C {...this.props} /> : null;
    }
  }
}