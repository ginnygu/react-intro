import React, { Component } from "react";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";

import TodoList from "./TodoList";

import "./Todo.css";

//const URL = process.env.NODE_ENV === "product" ? "DEPLOYED ADDRESS" : "http://localhost:3001"
const URL = "http://localhost:3001";
export class Todo extends Component {
  state = {
    todoList: [],
    todoInput: "",
    error: null,
    errorMessage: "",
  };

  async componentDidMount() {
    try {
      //making a get request to the server
      let allTodos = await axios.get(`${URL}/api/todos/get-all-todos`);

      console.log(allTodos);
      console.log(allTodos.data);
      console.log(allTodos.data.payload);

      this.setState({
        todoList: allTodos.data.payload,
      });
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

  handleOnSubmit = async (event) => {
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
        try {
          let createdTodo = await axios.post(`${URL}/api/todos/create-todo`, {
            todo: this.state.todoInput,
          });

          console.log(createdTodo);

          let newArray = [...this.state.todoList, createdTodo.data.payload];

          this.setState({
            todoList: newArray,
            todoInput: "",
          });
        } catch (e) {
          console.log(e);
        }
      }
    }
  };

  handleDeleteByID = async (_id) => {
    try {
      let deletedTodo = await axios.delete(
        `${URL}/api/todos/delete-todo-by-id/${_id}`
      );

      let filteredArray = this.state.todoList.filter(
        (item) => item._id !== deletedTodo.data.payload._id
      );

      this.setState({
        todoList: filteredArray,
      });
    } catch (e) {
      console.log(e);
    }
  };

  handleDoneByID = async (id, isDone) => {
    //console.log(id, isDone);
    try {
      let todoIsDoneUpdated = await axios.put(
        `${URL}/api/todos/update-done-by-id/${id}`,
        {
          isDone: !isDone,
        }
      );

      let updatedArray = this.state.todoList.map((item) => {
        if (item._id === todoIsDoneUpdated.data.payload._id) {
          item.isDone = todoIsDoneUpdated.data.payload.isDone;
        }
        return item;
      });

      this.setState({
        todoList: updatedArray,
      });
    } catch (e) {
      console.log(e);
    }
  };

  handleEditByID = async (id, editInput) => {
    try {
      let editedTodo = await axios.put(
        `${URL}/api/todos/update-todo-by-id/${id}`,
        {
          todo: editInput,
        }
      );

      console.log(editedTodo);

      let updatedTodoArray = this.state.todoList.map((item) => {
        if (item._id === id) {
          item.todo = editedTodo.data.payload.todo;
        }
        return item;
      });

      this.setState({
        todoList: updatedTodoArray,
      });
    } catch (e) {
      console.log(e);
    }
  };

  // sortByDateNewestToOldest = () => {
  //   let sortedTodos = this.state.todoList
  //     .sort((a, b) => {
  //       return new Date(a.dateAdded) - new Date(b.dateAdded);
  //     })
  //     .reverse();

  //   this.setState({
  //     todoList: sortedTodos,
  //   });
  // };

  // sortByDateOldestToNewest = () => {
  //   let sortedTodos = this.state.todoList.sort((a, b) => {
  //     return new Date(a.dateAdded) - new Date(b.dateAdded);
  //   });

  //   this.setState({
  //     todoList: sortedTodos,
  //   });
  // };

  sortByDate = async (sortOrder) => {
    try {
      let sortedTodo = await axios.get(
        `${URL}/api/todos/get-todos-by-sort?sort=${sortOrder}`
      );
      this.setState({
        todoList: sortedTodo.data.payload,
      });
    } catch (e) {
      console.log(e);
    }
  };

  sortByDone = async (isDone) => {
    try {
      let isDoneTodoArray = await axios.get(
        `${URL}/api/todos/get-todos-by-done?isDone=${isDone}`
      );

      this.setState({
        todoList: isDoneTodoArray.data.payload,
      });
    } catch (e) {
      console.log(e);
    }
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
              autoFocus
              id="inputTodo"
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
              <button onClick={() => this.sortByDate("desc")}>
                Sort by Date - Newest to oldest
              </button>
            </li>
            <li>
              <button onClick={() => this.sortByDate("asc")}>
                Sort by Date - Oldest to newest
              </button>
            </li>
            <li>
              <button onClick={() => this.sortByDone("true")}>
                Sort by Done
              </button>
            </li>
            <li>
              <button onClick={() => this.sortByDone("false")}>
                Sort by Not Done
              </button>
            </li>
          </ul>
        </div>{" "}
        <div className="todo-div">
          <ul>
            {this.state.todoList.map((item, index) => {
              return (
                <TodoList
                  key={item._id}
                  item={item}
                  handleDeleteByID={this.handleDeleteByID}
                  handleDoneByID={this.handleDoneByID}
                  handleEditByID={this.handleEditByID}
                  inputID={item._id}
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
