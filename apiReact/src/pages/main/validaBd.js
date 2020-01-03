import React, { Component } from 'react'

export class ValidaBd extends Component {

    BdVazio = () => {
        const total = this.props.obj
        console.log(total === undefined)
        if (total === 0) {
            return (<h5>
                Seu banco de dados está vazio, por favor vá em create e alimente seu
                Banco de dados. Ele esta com fome!
                </h5>)
        }
        if (total === undefined)
            return (<h5> Banco de dados não esta conectado!</h5>)
    }

    render() {
        return (
                <div className="bd-vazio">
                    {this.BdVazio()}
                </div>
        )
    }
}

export default ValidaBd
