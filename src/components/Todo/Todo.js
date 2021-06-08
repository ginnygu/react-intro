import React, { Component } from "react";
import { v4 as uuidv4 } from "uuid";

import TodoList from "./TodoList";

import "./Todo.css";
export class Todo extends Component {
  state = {
    todoList: [
      {
        id: uuidv4(),
        todo: "walk the dog",
        isDone: false,
      },
      {
        id: uuidv4(),
        todo: "walk the cat",
        isDone: false,
      },
      {
        id: uuidv4(),
        todo: "buy food",
        isDone: false,
      },
    ],
    todoInput: "",
  };

  handleTodoOnChange = (event) => {
    this.setState({
      todoInput: event.target.value,
    });
  };

  handleOnSubmit = (event) => {
    event.preventDefault();

    let newArray = [
      ...this.state.todoList,
      {
        id: uuidv4(),
        todo: this.state.todoInput,
      },
    ];

    this.setState({
      todoList: newArray,
      todoInput: "",
    });
  };

  handleDeleteByID = (id) => {
    //console.log("handleDeleteByID id:", id);

    let filteredArray = this.state.todoList.filter((item) => item.id !== id);

    this.setState({
      todoList: filteredArray,
    });
  };

  handleDoneByID = (id) => {
    let updatedArray = this.state.todoList.map((item) => {
      if (item.id === id) {
        item.isDone = !item.isDone;
      }
      return item;
    });

    this.setState({
      todoList: updatedArray,
    });
  };

  render() {
    return (
      <div>
        <div className="form-div">
          <form onSubmit={this.handleOnSubmit}>
            <input
              name="todoInput"
              type="text"
              onChange={this.handleTodoOnChange}
              value={this.state.todoInput}
            />
            <button type="submit">Submit</button>
          </form>
        </div>

        <div className="todo-div">
          <ul>
            {this.state.todoList.map((item) => {
              return (
                <TodoList
                  key={item.id}
                  item={item}
                  handleDeleteByID={this.handleDeleteByID}
                  handleDoneByID={this.handleDoneByID}
                />
              );
            })}
          </ul>
        </div>
      </div>
    );
  }
}

export default Todo;
