import React from 'react';

import './Details.css';


class Details extends React.Component {
constructor(){
super()
this.state={}

}
  render() {
    return (
    <div className=" details-container ">
    <h4>{this.state.nombre}</h4>
    <div className="divider"></div>
      <div className="row">
        <div className="col l12">
          <div className="col l6">
            <img className="col l12 responsive-img"src={"/image/"+this.state.nombre+".jpg"} alt=""/>
          </div>
          <div className="col l6">
            <p>Precio:CLP{this.state.precio}</p>
            <p>Cantidad Disponible:{this.state.disponible}</p>
          </div>
        </div>
        </div>
    <a href="../home" className="btn">Atras</a>
    </div>


    );
  }


componentWillMount(){

this.setState(JSON.parse((sessionStorage.getItem("prodDetails"))))


}

}

export default Details;
