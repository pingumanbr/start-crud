import React,{Component} from "react";
import './App.css';
import {CSVLink} from "react-csv"

class App extends Component {

  //Inicializacao
  constructor(props){
    super(props);
   
    this.state={
      title: 'Aplicacao CRUD Simples para Prova de Conceito',
      act: 0,
      index: 0,

      datas: []
    }
  }


  componentDidMount(){
    this.refs.name.focus();
    //getContacts();
  }

  // Adiciona elemento no array
  fSubmit = (e) => {
    e.preventDefault();
 
    let datas = this.state.datas;
    let name = this.refs.name.value;
    let address = this.refs.address.value;
    let index = this.state.index; 

      if( this.state.act === 0 ){ //Novo registro

          let data = {
            name,address
          }
          datas.push(data);

	        //Salva no DB
          this.createContacts( name, address );
      
	  
      }else{                      //Atualiza registro

          let index = this.state.index; 

          if( index === 0){
            datas[index].name = name;
            datas[index].address = address;
          }else{
            datas[index-1].name = name;
            datas[index-1].address = address;  
          }
 
          // Salva no DB
          if( index === 0 ){
             this.updateContacts( 1, name, address );
          }else{
            this.updateContacts( index, name, address );           
          }
  
      }

      this.setState({
        datas: datas,
        act: 0,
        index: index
      })        
  

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

  let index = i + 1;

 // elimina do DB
 this.deleteContacts( index );
}

//Edita registro
fEdit = (i) => {
  //Local
  let data = this.state.datas[i];

  this.refs.name.value = data.name;
  this.refs.address.value = data.address;

  let index = i + 1;
  this.setState({
    act:1,
    index: index
  })

  
}

  render(){

    //Globais
    let datas = this.state.datas;

  return (
    <div className="App">
      <h2>{this.state.title}</h2>
      <form ref="myForm" className="myForm">
          <input type="text" ref="name" placeholder= "Nome" className="formField"/>
          <input type="text" ref="address" placeholder= "Endereco" className="formField"/>
          <button onClick={(e) => this.fSubmit(e)} className="myButton"> submit </button>

          <CSVLink
              filename={"ibge.csv"}
              color="primary"
              style={{float: "left", marginRight:"10px"}}
              className="btn btn.primary"
              data = { this.state.datas}>
              Download CSV
          </CSVLink>
      </form>
      <pre>
        { datas.map((data,i) =>
          <li key={i} className= "myList">
            {i+1}.{data.name},{data.address}
            <button onClick={() => this.fRemove(i)} className="myListButton"> remover </button>
            <button onClick={() => this.fEdit(i)} className="myListButton"> editar </button>
          </li>
        )
        }
      </pre>
    </div>
  );
  }

  ///////////////////////////////////////////////////////
  // Database access

createContacts = async ( name, address ) => {

  let url = `http://localhost:5000/contacts/${name}-${address}`;
  
      return await fetch(url, {method: "POST"})
                    .then ( res => res.json() )
                     .catch( err => console.log(err));
     
  };
  
  
  deleteContacts = async ( id ) => {
   
    try{
      await fetch(`http://localhost:5000/contacts/${id}`, {method: "DELETE"}).then(function(response){
        return response.json();
      });        
      
    }catch(err){
        console.error(err.message);
    }
  };
  
  updateContacts = async ( id, name, address ) => {
   
      try{
        await fetch(`http://localhost:5000/contacts/${id}/${name}-${address}`, {method: "PUT"}).then(function(response){
        return response.json();
      });        
        
      }catch(err){
          console.error(err.message);
      }
  };
  
   getContacts =  async () => {
    try{
      const response = await fetch("http://localhost:5000/contacts", {method: "GET"});
      const jsonData = await  response.json();
      console.log(JSON.stringify( jsonData ));
      return jsonData;
    }catch(err){
        console.error(err.message);
    } 
  }
  
}

export default App;
