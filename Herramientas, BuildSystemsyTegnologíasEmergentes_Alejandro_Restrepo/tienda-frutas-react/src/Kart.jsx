import React from 'react';
import * as request from 'superagent';
import './Kart.css';


 class Kart extends React.Component {
 constructor(){
 super()
 this.state={Productos:[]}
 this.carrito=JSON.parse(sessionStorage.getItem('kart'))
 if(this.carrito==null){
 this.carrito=[]
 this.total=0
 }
 this.cancelarCompra= this.cancelarCompra.bind(this)
 this.pagarCompra= this.pagarCompra.bind(this)
 }
  render() {
    return (
    <div className=" details-container ">
    <h4>Carrito de Compras</h4>
    <div className="divider"></div>
      <div className="row">
        <div className="col l12">
          <div className="col l6">
            <table>
              <tbody>
              {this.carrito.map((kart, i) =>

              <tr >
                <td>
                  <div className="row">
                    <div className="col l4">
                      <img className="col l10"src={'/image/'+kart.nombre+'.jpg'} alt=""/>

                    </div>
                    <div className="col l5">
                      <p><strong>{kart.nombre}</strong></p>
                      <p><strong>Unidades: {kart.cantidad}</strong></p>
                    </div>
                  </div>
                  <p><strong>Subtotal: CLP{kart.subtotal}</strong></p>
                </td>


              </tr>
              )}



              </tbody>
            </table>


          </div>
          <div className="col l6">
            <h5>Total: CLP{this.total}</h5>
            <div className="row">
                <a onClick={this.cancelarCompra} className="btn">Cancelar</a>
                <a onClick={this.pagarCompra} className="btn">Pagar</a>

            </div>
          </div>
        </div>
        </div>

    </div>

    );
  }
  componentWillMount(){
  this.total=0;
  for (let item of this.carrito){
  this.total+=parseInt(item.subtotal)
  }
  }

  componentDidMount(){
  request
  .get(' https://tienda-alimentos.firebaseio.com/.json')
  .end((err,res)=>{
  this.setState(res.body)

  }

  )
  }

  cancelarCompra(){
  sessionStorage.setItem('kart',null)
  window.location.replace('../home')
  }
  pagarCompra(){

  for (let car of this.carrito) {
    for (let producto of this.state.Productos) {
      if(car.nombre==producto.nombre){
       producto.disponible-=parseInt(car.cantidad)
         break;

      }
    }

  }
  request
  .put(' https://tienda-alimentos.firebaseio.com/.json',this.state)
  .end((err,res)=>{
  
  sessionStorage.setItem('kart',null)
  window.location.replace('../home')
  }

  )

  }
}

export default Kart;
