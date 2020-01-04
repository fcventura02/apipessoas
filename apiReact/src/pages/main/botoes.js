import React, { Component } from 'react'

export class Botoes extends Component {
    
    prevPage = () => {
        const { page } = this.props.obj;
        if (page === 1) return;
        const pageNumber = page - 1;
        this.props.loadPerson(pageNumber);
    }
    nextPage = () => {
        const { page, personInfo } = this.props.obj;
        if (page === personInfo.pages) return;
        const pageNumber = page + 1;
        this.props.loadPerson(pageNumber);
    }


    render() {
        const { page, personInfo } = this.props.obj;
        return (
            <div className="actions">
            <button disabled={page === 1} onClick={this.prevPage}>Anterior</button>
            <button disabled={page === personInfo.pages} onClick={this.nextPage}>Próximo</button>
        </div>
        )
    }
}

export default Botoes
