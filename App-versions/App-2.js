import React, { Component } from "react";

import "./App.css";
export class App extends Component {
  // state = {
  //   name: "Pikachu",
  //   initialBackgroundColor: "orange",
  //   backgroundBoolean: false,
  //   username: "",
  //   shouldUpdate: false,
  // };

  constructor(props) {
    super(props);

    this.state = {
      name: "Pikachu",
      initialBackgroundColor: "orange",
      backgroundBoolean: false,
      username: "",
      shouldUpdate: false,
      toggleChild: true,
    };
    //console.log("1 constructor");
  }

  componentDidMount() {
    //console.log("3 componentDidMount");

    this.setState({
      name: "Meow",
      initialBackgroundColor: "blue",
    });
  }

  componentDidUpdate(prevProps, prevState) {
    // console.log("5 componentDidUpdate");
    // console.log("prevState", prevState.name, " Pikachu");
    // console.log("prevState Boolean", prevState.name === "Pikachu");
    // console.log("current State", this.state.name);
    // console.log("-=----------------------");
    if (prevState.name === "Pikachu") {
      //console.log("I RAN LINE 24");
      this.setState({
        name: "Meow",
      });
    }
  }

  handleOnChange = (event) => {
    //console.log(event.target.value);
    this.setState({
      username: event.target.value,
    });
  };

  handleShouldUpdate = () => {
    if (this.state.username === "goku") {
      this.setState({
        shouldUpdate: true,
      });
    }
  };

  shouldComponentUpdate(nextProps, nextState) {
    //console.log("4 handleShouldUpdate");
    if (nextState.username === "goku") {
      return false;
    } else {
      return true;
    }
  }

  render() {
    //console.log("2 render");

    return (
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        {this.state.name}
        <div
          style={{
            height: 150,
            backgroundColor: this.state.initialBackgroundColor,
          }}
        ></div>
        <hr />
        <div
          style={{ height: 150 }}
          className={`${
            this.state.backgroundBoolean
              ? "background-color-red"
              : "background-color-green"
          }`}
        >
          <button
            onClick={() =>
              // this.setState({
              //   backgroundBoolean: !this.state.backgroundBoolean,
              // })
              this.setState((prevState) => {
                return {
                  backgroundBoolean: !prevState.backgroundBoolean,
                  name: "Pikachu",
                };
              })
            }
          >
            Change Color
          </button>
        </div>
        <hr />

        <div>
          <input type="text" name="username" onChange={this.handleOnChange} />
          <button onClick={this.handleShouldUpdate}>Submit</button>
          <br />

          <div
            style={{
              height: 150,
            }}
            className={`${
              this.state.shouldUpdate
                ? "background-color-red"
                : "background-color-green"
            }`}
          >
            Input value : {this.state.username}
          </div>
        </div>
        <hr />

        {this.state.toggleChild ? <Child1 /> : "No Child is shown"}
        {/* {this.state.toggleChild && <Child1 />} */}
        <br />
        <button
          onClick={() =>
            this.setState({ toggleChild: !this.state.toggleChild })
          }
        >
          Toggle Child
        </button>
      </div>
    );
  }
}

class Child1 extends Component {
  state = {
    pokemon: "pikachu",
  };

  componentDidMount() {
    this.timer = window.setTimeout(() => {
      this.setState({
        pokemon: "Mew 2",
      });
    }, 2000);
  }

  componentWillUnmount() {
    console.log("I AM LEAVING THE DOM!!!");
    clearTimeout(this.timer);
  }

  render() {
    return <div>Child Component: {this.state.pokemon}</div>;
  }
}

export default App;
