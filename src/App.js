import React, { Component } from "react";
import Todo from "./components/Todo/Todo";
import Header from "./components/Header/Header";

export class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <Todo />
      </div>
    );
  }
}

export default App;
