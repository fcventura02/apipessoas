import React, { Component } from 'react';
import api from '../../services/api';
import TableRow from './tableRow';
import Search from './search'
import ValidaBd from './validaBd'
import Botoes from './botoes'
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css'
export default class Main extends Component {
    state = {
        person: [],
        personInfo: {},
        page: 1,
    };
    componentDidMount() {
        this.loadPerson();
    };

    loadPerson = async (page = 1) => {
        await api.get(`/list?page=${page}`)
            .then((response) => {
                const { docs, ...personInfo } = response.data
                this.setState({
                    person: docs,
                    personInfo,
                    page
                })
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    render() {
        return (
            <React.Fragment>
               
                <ValidaBd obj={this.state.personInfo.total} />

                <div className="person-list">
                    <h3 align="center">Lista de Pessoas</h3>

                    <Search obj={this.state} />

                    <table className="table table-striped" style={{ marginTop: 20 }}>
                        <thead>
                            <tr>
                                <th>Pessoa</th>
                                <th>Cpf</th>
                                <th colSpan="2">Ação</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.person.map((object, i) => {
                                    return <TableRow obj={object} key={i} />;
                                })
                            }
                        </tbody>
                    </table>
                    <Botoes obj={this.state} loadPerson={this.loadPerson} />
                </div>
            </React.Fragment>
        );
    };
};