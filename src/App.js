import React,{Component} from 'react';
import {Container, Row, Col} from 'reactstrap'
import './App.css';
import "bootstrap/dist/css/bootstrap.css"
import {CSVLink} from "react-csv";

class App extends Component {

  //Inicializacao
  constructor(props){
    super(props);
    this.state={
      title: 'Aplicacao CRUD Simples para Prova de Conceito',
      act: 0,
      index: '',
      datas: []
    }
  }


  componentDidMount(){
    this.refs.name.focus();
  }

  // Adiciona elemento no array
  fSubmit = (e) => {
    e.preventDefault();
    console.log('try');

    let datas = this.state.datas;
    let name = this.refs.name.value;
    let address = this.refs.address.value;

      if( this.state.act === 0 ){ //Novo registro
          let data = {
            name,address
          }
          datas.push(data);
      }else{                      //Atualiza registro
          let index = this.state.index;
          datas[index].name = name;
          datas[index].address = address;
      }


     this.setState({
      datas: datas,
      act: 0
    });

    this.refs.myForm.reset();
    this.refs.name.focus();
  }

//Remove elemento
fRemove = (i) => {
  let datas = this.state.datas;
  datas.splice(i,1);

  this.setState({
    datas: datas
  })

  this.refs.myForm.reset();
  this.refs.name.focus();

}

//Edita registro
fEdit = (i) => {
  //Local
  let data = this.state.datas[i];

  this.refs.name.value = data.name;
  this.refs.address.value = data.address;

  this.setState({
    act:1,
    index: i
  })
}

  render(){

    //Globais
    let datas = this.state.datas;

  return (
    <Container div className="App">
      <h2>{this.state.title}</h2>
      <form ref="myForm" className="myForm">
          <input type="text" ref="name" placeholder= "Nome" className="formField"/>
          <input type="text" ref="address" placeholder= "Endereco" className="formField"/>
          <button onClick={(e) => this.fSubmit(e)} className="myButton"> submit </button>
      </form>

      <br></br>
      
      <Row>
        <Col>
        { datas.map((data,i) =>
          <li key={i} className= "myList">
            {i+1}.{data.name},{data.address}
            <button onClick={() => this.fRemove(i)} className="myListButton"> remover </button>
            <button onClick={() => this.fEdit(i)} className="myListButton"> editar </button>
          </li>
        )
        }
        </Col>
      </Row>
        
      <br></br>

      <Row>
          <Col>
            <CSVLink
              filename={"db.csv"}
              color="primary"
              style={{float: "left", marginRight: "10px"}}
              className="btn btn-primary"
              data = {this.state.datas}>
              Download CSV
            </CSVLink>
          </Col>
        </Row>

      </Container>
  );
  }
}

export default App;
