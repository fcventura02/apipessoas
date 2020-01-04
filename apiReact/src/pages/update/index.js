import React, { Component } from 'react';
import './styles.css';
import Forms from '../../Components/form'


export default class Create extends Component {
  render() {
    return (
      <div className='create-person'>
        <h3>Atualize uma pessoa</h3>
        <Forms obj={'Update'} id={this.props.match.params.id} history={this.props}/>
      </div>
    );
  }
}