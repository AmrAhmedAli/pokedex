import React, { Component } from "react";

class Pokemon extends Component {
  state = {
    name: this.props.name
  };

  render() {
    return (
      <li
        className={this.props.active}
        onMouseOver={() => this.props.Hovered(this.state.name)}
        onClick={() => this.props.Clicked(this.state.name)}
      >
        <a>{this.state.name}</a>
      </li>
    );
  }
}

export default Pokemon;
