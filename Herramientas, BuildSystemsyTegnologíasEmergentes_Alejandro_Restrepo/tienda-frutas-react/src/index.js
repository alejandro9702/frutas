import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Home from './Home';
import Details from './Details';
import Catalogo from './Catalogo';
import Kart from './Kart';
import registerServiceWorker from './registerServiceWorker';
import {Router,Route,IndexRoute} from 'react-router';
import {browserHistory} from 'react-router'

ReactDOM.render(<Router history={browserHistory}>
<Route path="/" component={App}/>
<Route path="/home" component={Home}>
  <IndexRoute component={Catalogo}/>
  <Route path="/home/details" component={Details}/>
  <Route path="/home/kart" component={Kart}/>
</Route>
  </Router>,
  document.getElementById('root'));
registerServiceWorker();
