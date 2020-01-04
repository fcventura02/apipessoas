import React, { Component } from 'react'
import api from '../../services/api';

export class Search extends Component {
    
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
        for (page; page <= this.props.obj.personInfo.pages; page++) {
            result = result.concat(await api.get(`/list?page=${page}`).then((response) => {
                return tiradata(response)
            }))
        }
        if (result.length !== 0) {

            this.alerta(result);         
        } else {
            this.alerta(false)
        }
        
    }

    alerta = (result) => {
        if (result) {
            document.getElementById("alerta").style.display = 'block';
            document.getElementById("confirmado").style.display = 'block';
            document.getElementById("alert-nome").innerHTML = `Pessoa: ${result[0].person_name}`;
            document.getElementById("alert-cpf").innerHTML = `Cpf: ${result[0].person_cpf}`;
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
            document.getElementById("alert-cpf").innerHTML = ``;

        }
    }

    close = () => {
        document.getElementById("alerta").style.display = 'none';
        document.getElementById("confirmado").style.display = 'none';
        document.getElementById("negado").style.display = 'none';
    }

    render() {
        return (
            <div>
                <div id='alerta' className='alerta'>
                    <span id='negado' className='ion-ios-close-outline'></span>
                    <span id='confirmado' className='ion-checkmark-round'></span>
                    <p id='alert-nome'></p>
                    <p id='alert-cpf'></p>
                    <button id='editar' className='editar' >Editar</button>
                    <button id='delete' className='excluir' >Excluir</button>
                    <button onClick={this.close} id='fechar' className='fechar' >Fechar</button>

                </div>
                <form id="search-people" className="header_search_input">
                    <input name="q" type="number" className="form-control" placeholder="Pesquisar Cpf" />
                    <button onClick={this.inputPesquisa} className="ion-search" ></button>
                </form>
            </div>
        )
    }
}

export default Search
