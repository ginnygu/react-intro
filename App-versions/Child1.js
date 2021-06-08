import React, { Component } from "react";

export class Child1 extends Component {
  constructor(props) {
    super(props);
    // console.log(this);
    // console.log(this.props);
  }

  render() {
    return (
      <div>
        Hi, my name is {this.props.name}, and I am {this.props.age} year old
      </div>
    );
  }
}

export default Child1;
