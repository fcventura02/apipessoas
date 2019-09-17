import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

class TableRow extends Component {
  constructor (props){
    super(props);
    this.delete = this.delete.bind(this);
  }

  delete(){
    axios.delete('http://localhost:3001/api/del/'+ this.props.obj._id)
    .then(alert("Deletado"))
    .catch(err=>console.log(err));
  }

  render() {
    return (
        
        <tr>
          <td>
            {this.props.obj.person_name}
          </td>
          <td>
            {this.props.obj.person_cpf}
          </td>
          <td>
            <Link to={"/edit/"+this.props.obj._id} className="btn btn-primary">Edit</Link>
          </td>
          <td>
            <button onClick={this.delete} className="btn btn-danger">Delete</button>
          </td>
        </tr>
    );
  }
}

export default TableRow;