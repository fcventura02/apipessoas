import React, { Component } from 'react';
import './styles.css';
import Forms from '../../Components/form'

export default class Create extends Component {


  render() {
    return (
      <div className='create-person'>
        <h3>Adicione uma nova pessoa</h3>
        <Forms obj={'Creat'}/>
      </div>
    );
  }
}