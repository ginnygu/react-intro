import React, { Component } from "react";
import PropTypes from "prop-types";
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
  };

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
    const { todo, id, isDone } = this.props.item;
    const { handleDeleteByID, handleDoneByID } = this.props;
    const { canEdit, editInput } = this.state;
    return (
      <div className="todolist-div">
        {canEdit ? (
          <input
            type="text"
            value={editInput}
            onChange={this.handleEditOnChange}
            name="editInput"
          />
        ) : (
          <li className={`li-style ${isDone ? "li-style-isDone" : ""}`}>
            {todo}
          </li>
        )}

        {canEdit ? (
          <button onClick={() => this.onHandleEditSubmit(id)} id="edit-button">
            Submit
          </button>
        ) : (
          <button onClick={this.onHandleEditClick} id="edit-button">
            Edit
          </button>
        )}

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

TodoList.propTypes = {
  item: PropTypes.object.isRequired,
  handleDeleteByID: PropTypes.func.isRequired,
  handleDoneByID: PropTypes.func.isRequired,
  handleEditByID: PropTypes.func.isRequired,
};

export default TodoList;
