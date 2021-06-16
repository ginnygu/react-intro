import React from "react";

// function Button(props) {
//   console.log(props);
//   //props.clickFunc ? props.clickFunc : () => {}

//   return (
//     <React.Fragment>
//       <button onClick={() => props.clickFunc()} id={props.cssid}>
//         {props.buttonName}
//       </button>
//     </React.Fragment>
//   );
// }

function Button({ clickFunc = () => {}, cssid, buttonName }) {
  //console.log(clickFunc);
  return (
    <div>
      <button onClick={() => clickFunc()} id={cssid}>
        {buttonName}
      </button>
    </div>
  );
}

export default Button;

// function Button1({ handleDeleteByID, cssid, buttonName, _id }) {
//   return (
//     <div>
//       <button
//         onClick={() => handleDeleteByID(_id)}
//         id={cssid}
//       >
//         {buttonName}
//       </button>
//     </div>
//   );
// }

// export default Button1;

// import React, { Component } from "react";

// export class Button extends Component {
//   render() {
//     return (
//       <div>
//         <button>{this.props.buttonName}</button>
//       </div>
//     );
//   }
// }

// export default Button;
