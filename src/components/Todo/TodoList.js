import React, { Component } from "react";
import PropTypes from "prop-types";

import Button from "../common/Button";

import "./TodoList.css";

export class TodoList extends Component {
  state = {
    canEdit: false,
    editInput: this.props.item.todo,
  };

  // constructor(props) {
  //   super(props);
  //   console.log(this.props);
  //   this.state = {
  //     canEdit: false,
  //     editInput: this.props.item.todo,
  //   };
  // }

  onHandleEditClick = () => {
    this.setState((prevState) => {
      return {
        canEdit: !prevState.canEdit,
      };
    });

    //let inputElement = document.getElementById(this.props.inputID);
    //inputElement.focus();
  };

  componentDidUpdate() {
    let input = document.getElementById(this.props.inputID);
    if (input) {
      input.focus();
    }
  }

  handleEditOnChange = (event) => {
    this.setState({
      editInput: event.target.value,
    });
  };

  onHandleEditSubmit = (id) => {
    this.onHandleEditClick();

    this.props.handleEditByID(id, this.state.editInput);
  };

  render() {
    const { todo, _id, isDone } = this.props.item;
    const { handleDeleteByID, handleDoneByID, inputID } = this.props;
    const { canEdit, editInput } = this.state;

    return (
      <div className="todolist-div">
        {canEdit ? (
          <input
            type="text"
            value={editInput}
            onChange={this.handleEditOnChange}
            name="editInput"
            id={inputID}
          />
        ) : (
          <li className={`li-style ${isDone ? "li-style-isDone" : ""}`}>
            {todo}
          </li>
        )}

        {canEdit ? (
          // <button onClick={() => this.onHandleEditSubmit(_id)} id="edit-button">
          //   Submit
          // </button>
          <Button
            buttonName="Submit"
            cssid="edit-button"
            clickFunc={() => this.onHandleEditSubmit(_id)}
          />
        ) : (
          // <button onClick={this.onHandleEditClick} id="edit-button">
          //   Edit
          // </button>
          <Button
            buttonName="Edit"
            cssid="edit-button"
            clickFunc={() => this.onHandleEditClick()}
          />
        )}

        {/* <button id="done-button" onClick={() => handleDoneByID(_id, isDone)}>
          Done
        </button> */}

        <Button
          buttonName="Done"
          cssid="done-button"
          clickFunc={() => handleDoneByID(_id, isDone)}
        />

        {/* <button onClick={() => handleDeleteByID(_id)} id="delete-button">
          Delete
        </button> */}

        <Button
          buttonName="Delete"
          cssid="delete-button"
          clickFunc={() => handleDeleteByID(_id)}
        />
      </div>
    );
  }
}

TodoList.propTypes = {
  item: PropTypes.object.isRequired,
  handleDeleteByID: PropTypes.func.isRequired,
  handleDoneByID: PropTypes.func.isRequired,
  handleEditByID: PropTypes.func.isRequired,
};

export default TodoList;
