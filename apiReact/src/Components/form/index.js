import React, { Component } from 'react'
import axios from 'axios';

export class Forms extends Component {
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

    async onSubmit(e) {
        e.preventDefault();
        const obj = {
            person_name: this.state.person_name,
            person_cpf: this.state.person_cpf
        };
        console.log(obj)

        if (this.props.obj === 'Update') {
           
            await axios.put('http://localhost:3001/api/update/' + this.props.id, obj)
                .then(res => alert('Pessoa atualizada'))
                .catch(res => alert("Nome ou cpf invalidos"));


            this.props.history.history.push('/')
        }
        if (this.props.obj === 'Creat') {
            await axios.post('http://localhost:3001/api/add', obj)
                .then(res => alert("Item adicionado com sucesso"))
                .catch(res => alert("Nome ou cpf invalidos" + res));


            this.setState({
                person_name: '',
                person_cpf: ''
            });
        }
    }

    render() {
        return (
            <div>
                <form onSubmit={this.onSubmit}>
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
                        <input type="submit" value="Registrar Pessoa" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}

export default Forms
