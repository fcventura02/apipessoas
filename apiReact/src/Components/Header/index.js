import React, { Component } from 'react';
import './styles.css';


export class Header extends Component {
  render() {
    return (
      <header id="main-header">
        <ul>
          <li>
            <a href='/'>Home</a>
          </li>
          <li className="nav-item">
            <a href='/create'>Create</a>
          </li>
        </ul>
      </header>
    );
  };
};

export default Header;