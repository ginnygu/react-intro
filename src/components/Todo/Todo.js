import React, { Component } from "react";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";

import TodoList from "./TodoList";

import "./Todo.css";
export class Todo extends Component {
  state = {
    todoList: [],
    todoInput: "",
    error: null,
    errorMessage: "",
  };

  async componentDidMount() {
    try {
      let allTodos = await axios.get(
        "http://localhost:3001/api/todos/get-all-todos"
      );

      console.log(allTodos);
    } catch (e) {
      console.log(e);
    }
  }

  handleTodoOnChange = (event) => {
    this.setState({
      todoInput: event.target.value,
      error: null,
      errorMessage: "",
    });
  };

  handleOnSubmit = (event) => {
    event.preventDefault();

    if (this.state.todoInput.length === 0) {
      this.setState({
        error: true,
        errorMessage: "Cannot create empty todo",
      });
    } else {
      let checkIfTodoAlreadyExists = this.state.todoList.findIndex(
        (item) =>
          item.todo.toLocaleLowerCase() ===
          this.state.todoInput.toLocaleLowerCase()
      );

      if (checkIfTodoAlreadyExists > -1) {
        this.setState({
          error: true,
          errorMessage: "Todo already exists",
        });
      } else {
        let newArray = [
          ...this.state.todoList,
          {
            id: uuidv4(),
            todo: this.state.todoInput,
            isDone: false,
            dateAdded: new Date().getTime(),
          },
        ];

        this.setState({
          todoList: newArray,
          todoInput: "",
        });
      }
    }
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

  handleEditByID = (id, editInput) => {
    let updatedTodoArray = this.state.todoList.map((item) => {
      if (item.id === id) {
        item.todo = editInput;
      }
      return item;
    });

    this.setState({
      todoList: updatedTodoArray,
    });
  };

  sortByDateNewestToOldest = () => {
    let sortedTodos = this.state.todoList
      .sort((a, b) => {
        return new Date(a.dateAdded) - new Date(b.dateAdded);
      })
      .reverse();

    this.setState({
      todoList: sortedTodos,
    });
  };

  sortByDateOldestToNewest = () => {
    let sortedTodos = this.state.todoList.sort((a, b) => {
      return new Date(a.dateAdded) - new Date(b.dateAdded);
    });

    this.setState({
      todoList: sortedTodos,
    });
  };

  sortByDone = () => {};

  sortByNotDone = () => {};

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
            <br />
            <span style={{ color: "red" }}>
              {this.state.error && this.state.errorMessage}
            </span>
          </form>
        </div>
        <div className="sorting">
          <ul>
            <li>
              <button onClick={this.sortByDateNewestToOldest}>
                Sort by Date - Newest to oldest
              </button>
            </li>
            <li>
              <button onClick={this.sortByDateOldestToNewest}>
                Sort by Date - Oldest to newest
              </button>
            </li>
            <li>
              <button onClick={this.sortByDone}>Sort by Done</button>
            </li>
            <li>
              <button onClick={this.sortByNotDone}>Sort by Not Done</button>
            </li>
          </ul>
        </div>{" "}
        <div className="todo-div">
          <ul>
            {this.state.todoList.map((item) => {
              return (
                <TodoList
                  key={item.id}
                  item={item}
                  handleDeleteByID={this.handleDeleteByID}
                  handleDoneByID={this.handleDoneByID}
                  handleEditByID={this.handleEditByID}
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
