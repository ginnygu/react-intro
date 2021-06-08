import React, { Component } from "react";
import Child1 from "./components/Child1";
import "./App.css";

export class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      count: 0,
      toggleMe: false,
    };

    this.addCount = this.addCount.bind(this);
  }

  addCount() {
    console.log(this.state.count, this.state.count + 1);
    this.setState({
      count: this.state.count + 1,
    });
  }

  minusCount = () => {
    this.setState({
      count: this.state.count - 1,
    });
  };

  toggleMeColor = () => {
    // this.setState({
    //   toggleMe: !this.state.toggleMe,
    // });

    this.setState((prevState) => {
      console.log(prevState);
      return {
        toggleMe: !prevState.toggleMe,
      };
    });
  };

  render() {
    return (
      <div style={{ textAlign: "center", marginTop: 50 }}>
        <div>Count: {this.state.count}</div>
        <button onClick={this.minusCount}>-</button>
        <button onClick={this.addCount}>+</button>

        <hr />

        <div style={styles.divStyle}>
          <h1 style={styles.h1Style}>Hello, class!</h1>
        </div>

        <hr />
        <div
          className={`toggle-me-div ${
            this.state.toggleMe
              ? "toggle-me-original"
              : "toggle-me-not-original"
          }`}
        >
          <button onClick={this.toggleMeColor}>Toggle Me</button>
        </div>

        <hr />

        <Child1 name="Joe" age={99} />
        <br />
        <Child1 name="Kathy" age={500} />
        <br />
        <Child1 name="Mike" age={1000} />
      </div>
    );
  }
}

const styles = {
  divStyle: {
    height: "150px",
    backgroundColor: "yellow",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  h1Style: {
    color: "green",
  },
};

export default App;
