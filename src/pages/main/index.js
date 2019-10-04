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
                return parseInt(formData.get('q')) === object.person_cpf
            });
        }
        let page = 1;
        let result = [];
        
        for (page; page <= this.state.personInfo.pages; page++) {
           result = result.concat(await api.get(`/list?page=${page}`).then((response) => {
               return tiradata(response)
            }))
        }
        if (result.length !== 0) {

            this.alerta(result);
            // window.location.href= `/show/${result[0]._id}`           
        } else {
            this.alerta(false)
        }
    }

    alerta = (result) => {
        if (result) {
            document.getElementById("alerta").style.display = 'block';
            document.getElementById("confirmado").style.display = 'block';
            document.getElementById("alert-nome").innerHTML = `Pessoa: ${result[0].person_name}`;
            document.getElementById("alert-cpf").innerHTML = `Pessoa: ${result[0].person_cpf}`;
            document.getElementById("editar").onclick = function (e) {
                e.preventDefault();
                window.location.href = `/edit/${result[0]._id}`
            };
            document.getElementById("delete").onclick = function (e) {
                e.preventDefault();
                api.delete(`http://localhost:3001/api/del/${result[0]._id}`)
                    .then(alert("Deletado"))
                    .catch(err => console.log(err));
             }
        } else {
            document.getElementById("alerta").style.display = 'block';
            document.getElementById("negado").style.display = 'block';
            document.getElementById("delete").style.display = 'none';
            document.getElementById("editar").style.display = 'none';
            document.getElementById("alert-nome").innerHTML = `Cpf não encontrado`;

        }
    }

    close = () => {
        document.getElementById("alerta").style.display = 'none';
        document.getElementById("confirmado").style.display = 'none';
        document.getElementById("negado").style.display = 'none';
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

                <div id='alerta' className='alerta'>
                    <span id='negado' className='ion-ios-close-outline'></span>
                    <span id='confirmado' className='ion-checkmark-round'></span>
                    <p id='alert-nome'></p>
                    <p id='alert-cpf'></p>
                    <button id='editar' className='editar' >Editar</button>
                    <button id='delete' className='excluir' >Excluir</button>
                    <button onClick={this.close} id='fechar' className='fechar' >Fechar</button>

                </div>

                <h3 align="center">Lista de Pessoas</h3>
                <form id="search-people" className="header_search_input">
                    <input name="q" type="number" className="form-control" placeholder="Pesquisar Cpf" />
                    <button onClick={this.inputPesquisa} className="ion-search" ></button>
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