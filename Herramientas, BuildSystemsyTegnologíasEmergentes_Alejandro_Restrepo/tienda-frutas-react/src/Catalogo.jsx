import React from 'react';
import * as request from 'superagent';
import './Catalogo.css';
import Home from './Home.jsx';

class Catalogo extends React.Component {

  constructor(){
  super()
  this.state={Productos:[{}]}
  this.kart=JSON.parse(sessionStorage.getItem('kart'))
  if(this.kart==null){
  this.kart=[]
  }
  this.handleChange = this.handleChange.bind(this)
  this.addToKart= this.addToKart.bind(this)
  }
  render() {
    return (

    <div className=" catalogo-container ">

              <div className="row">
                    <div className="col l6">
                      <h5>Catálogo de Productos</h5>
                    </div>
                    <div className="col l3 offset-l3 search">
                      <label htmlFor="search-input" >¿Quá estás buscando?</label>
                      <input type="text" name="search-input"  id="searchInput" placeholder="Buscar" value={this.state.value} onChange={this.handleChange}/ >

                    </div>
              </div>
              <div className="divider"></div>

      <div className=" row">
        <div className="col l12">
        {this.state.Productos.map((prod, i) =>

                              <div className="card col l3" >
                                  <div className="card-image">
                                    <img className="col l12" src={'image/'+prod.nombre+'.jpg'} alt="imagen"/>
                                  </div>
                                  <div className="col l12 card-content">
                                    <h5>{prod.nombre}</h5>
                                    <p >Precio: CLP{prod.precio}</p>
                                    <p>Disponibles: {prod.disponible}</p>
                                  </div>
                                  <div className="col l12 card-action">
                                    <a  className="btn col l5"type="button" name={prod.nombre}  onClick={this.verDetallesProducto} >Ver mas</a>
                                    <a className="btn col l5"type="button" name={prod.nombre}   onClick={this.addToKart}  >Añadir</a>
                                    <input id={'cant'+prod.nombre} type="number" className="col l4 cantidad"  max={prod.disponible} min="1"/>

                                  </div>
                              </div>
        )}

          </div>
      </div>
  </div>
    );
}

componentWillMount(){

request
.get(' https://tienda-alimentos.firebaseio.com/.json')
.end((err,res)=>{
this.setState(res.body)

}

)}

handleChange(e){
var criterio=(document.getElementById('searchInput').value)
request
.get(' https://tienda-alimentos.firebaseio.com/.json')
.end((err,res)=>{
let usuarios=res.body.Usuarios
let productos=[]
for (let prod of res.body.Productos){
if(prod.nombre.includes(criterio)){
  productos.push(prod)

}

}

  var estado={"Usuarios":usuarios,"Productos": productos}
  this.setState(estado)

}

)

}



verDetallesProducto(e){

var nombre=e.target.name
request
.get(' https://tienda-alimentos.firebaseio.com/.json')
.end((err,res)=>{
for (let prod of res.body.Productos){
if(prod.nombre===nombre){
sessionStorage.setItem("prodDetails",JSON.stringify(prod))

window.location.replace('./home/details')
break
}

}

  })


}

addToKart(e){
var nombre=e.target.name
var cantidad=document.getElementById('cant'+nombre).value
if(cantidad==""||cantidad=="0"){
  alert("Debe elegir una cantidad mayor que 0")
}
else{
for (let prod of this.state.Productos) {
if(prod.nombre==nombre){
let subtotal=prod.precio*cantidad;

let p=JSON.parse(`{"nombre":"${prod.nombre}","subtotal":"${subtotal}","cantidad":"${cantidad}"}`)
this.kart.push(p)
  sessionStorage.setItem('kart', JSON.stringify(this.kart))
var h=new Home()
h.updateNotification()
return
}
}
}



}



}

export default Catalogo;
