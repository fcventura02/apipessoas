import React, { Component } from 'react';
import api from '../../services/api';
import TableRow from './tableRow';
import Search from './search'
import ValidaBd from './validaBd'
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

    prevPage = () => {
        const { page } = this.state;
        if (page === 1) return;
        const pageNumber = page - 1;
        this.loadPerson(pageNumber);
    }
    nextPage = () => {
        const { page, personInfo } = this.state;
        if (page === personInfo.pages) return;
        const pageNumber = page + 1;
        this.loadPerson(pageNumber);
    }


    render() {
        const { page, personInfo } = this.state;
        return (
            <div>
                <React.Fragment>
                    <ValidaBd obj={this.state.personInfo.total} />
                </React.Fragment>
                <div className="person-list">

                    <h3 align="center">Lista de Pessoas</h3>

                    <React.Fragment>
                        <Search obj={this.state} />
                    </React.Fragment>

                    <table className="table table-striped" style={{ marginTop: 20 }}>
                        <thead>
                            <tr>
                                <th>Pessoa</th>
                                <th>Cpf</th>
                                <th colSpan="2">Ação</th>
                            </tr>
                        </thead>
                        <tbody>
                            <React.Fragment>
                                {
                                    this.state.person.map((object, i) => {
                                        return <TableRow obj={object} key={i} />;
                                    })
                                }
                            </React.Fragment>

                        </tbody>
                    </table>

                    <div className="actions">
                        <button disabled={page === 1} onClick={this.prevPage}>Anterior</button>
                        <button disabled={page === personInfo.pages} onClick={this.nextPage}>Próximo</button>
                    </div>
                </div>
            </div>
        );

    };
};