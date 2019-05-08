import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Home from './Home';
import Loading from './Loading';
import registerServiceWorker from './registerServiceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import $ from 'jquery';
import Popper from 'popper.js';

ReactDOM.render(
<Router>
    <div>
    <Route exact path='/' component={Home} />
    <Route path='/app' component={App} />
    <Route path='/loading' component={Loading} />
    </div>
</Router>, document.getElementById('root'));
registerServiceWorker();
