import React, { Component } from 'react';
import api from '../../services/api';
import TableRow from './tableRow';
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

    tabRow() {
        return this.state.person.map(function (object, i) {
            return <TableRow obj={object} key={i} />;
        })
    }


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

    inputPesquisa = async (e) => {
        e.preventDefault();
        const form = e.target.parentNode
        const formData = new FormData(form);
        function tiradata(d) {
            return d.data.docs.filter((object) => {
                return formData.get('q') == object.person_cpf
            });
        }
        let page = 1;
        let result = [];
        for (page; page <= this.state.personInfo.pages; page++) {
            await api.get(`/list?page=${page}`).then((response) => {
                result = result.concat(tiradata(response))
            })
        }
        if (result.length !== 0) {
  
            alert("Achei.... o cpf pertence à " + result[0].person_name);
            window.location.href= `/show/${result[0]._id}`           
        } else {
            alert("Cpf não encontrado. Confira se o que digitou está correto")
        }

    }


    BdVazio = () => {

        if (this.state.personInfo.total === 0) {
            return (<h5>
                Seu banco de dados está vazio, por favor vá em create e alimente seu
                Banco de dados. Ele esta com fome!
                </h5>)
        }
    }


    render() {
        const { page, personInfo } = this.state;
        return (
            <div className="person-list">
                


                <h3 align="center">Lista de Pessoas</h3>
                <form id="search-people" className="header_search_input">
                    <input name="q" type="number" className="form-control" placeholder="Pesquisar Cpf" />
                    <button onClick={this.inputPesquisa} placeholder="Buscar" className="icon search-icon" ></button>
                </form>

                <div className="bd-vazio">
                    {this.BdVazio()}
                </div>

                <table className="table table-striped" style={{ marginTop: 20 }}>
                    <thead>
                        <tr>
                            <th>Pessoa</th>
                            <th>Cpf</th>
                            <th colSpan="2">Ação</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.tabRow()}
                    </tbody>
                </table>

                <div className="actions">
                    <button disabled={page === 1} onClick={this.prevPage}>Anterior</button>
                    <button disabled={page === personInfo.pages} onClick={this.nextPage}>Próximo</button>
                </div>
            </div>
        );

    };
};