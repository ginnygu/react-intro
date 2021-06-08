import React, { Component } from "react";

import "./TodoList.css";

export class TodoList extends Component {
  state = {
    canEdit: false,
  };

  render() {
    const { todo, id, isDone } = this.props.item;
    //console.log(this.props.item);
    const { handleDeleteByID, handleDoneByID } = this.props;
    return (
      <div className="todolist-div">
        <li className={`li-style ${isDone && "li-style-isDone"}`}>{todo}</li>

        <button id="edit-button">Edit</button>
        <button id="done-button" onClick={() => handleDoneByID(id)}>
          Done
        </button>
        <button onClick={() => handleDeleteByID(id)} id="delete-button">
          Delete
        </button>
      </div>
    );
  }
}

export default TodoList;
