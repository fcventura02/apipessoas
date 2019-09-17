import React, { Component } from 'react';
import './styles.css';
import axios from 'axios';

export default class Create extends Component {
  constructor(props) {
    super(props);
    this.onChangePersonName = this.onChangePersonName.bind(this);
    this.onChangeCpf = this.onChangeCpf.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      person_name: '',
      person_cpf: '',
    };
  };

  onChangePersonName(e) {
    this.setState({
      person_name: e.target.value
    });
  }

  onChangeCpf(e) {
    this.setState({
      person_cpf: e.target.value
    });
  }

  onSubmit(e) {
    e.preventDefault();
    const obj={
      person_name:this.state.person_name,
      person_cpf:this.state.person_cpf
    };
    axios.post('http://localhost:3001/api/add' ,obj).then(res => alert("Item adicionado com sucesso"))
    .catch(res => alert("Nome ou cpf invalidos"));


    this.setState({
      person_name: '',
      person_cpf: ''
    });
  }


  render() {
    return (
      <div className='create-person'>
        <h3>Adicione uma nova pessoa</h3>
        <form onSubmit = {this.onSubmit}>
          <div className="form-group">
            <label>Adicionar Nome*: </label>
            <input type="text"
              className="form-control"
              value={this.state.person_name}
              onChange={this.onChangePersonName} />
          </div>
          <div className="form-group">
            <label>Adicionar Cpf*: </label>
            <input type="text"
              className="form-control"
              value={this.state.person_cpf}
              onChange={this.onChangeCpf} />
          </div>
          <div className="form-goup">
            <input type="submit" value="Registrar Pessoa" className="btn btn-primary"/>
          </div>
        </form>
      </div>
    );
  }
}