import React, { Component } from 'react';
class If extends Component{

	render() {
    if (this.props.test) {
      return this.props.children;
    } else {
      return false;
    }
  }

}
export default If;
