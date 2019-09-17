import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import api from '../../services/api';

import './style.css';
export default class Show extends Component {
    state = {
        person: {},
    };

    async componentDidMount() {
        const { id } = this.props.match.params;
        const response = await api.get(`/show/${id}`);
        this.setState({ person: response.data })
    };

    delete = () => {
        const { person } = this.state
        axios.delete('http://localhost:3001/api/del/' + person._id)
            .then(alert("Deletado"))
            .catch(err => console.log(err));
    }

    render() {
        const { person } = this.state;
        return (
            <div className='person-info'>
                <h1>{person.person_name}</h1>
                <p>{person.person_cpf}</p>

                <Link to={"/edit/" + person._id} className="btn btn-primary">Edit</Link>

                <button onClick={this.delete} className="btn btn-danger">Delete</button>


            </div>
        )
    }
}