import React, { Component } from 'react';
import { Route, BrowserRouter, NavLink, Link} from 'react-router-dom'
import './App.css';
import Individual from './Individual'

class App extends Component {

  render() {
    return (
      <BrowserRouter>
        <div>
          <h2>SW demo</h2>
          <ul>
            <li><NavLink to="/1v1"> 1v1课 </NavLink> </li>
            <li><NavLink to="/open"> 公开课 </NavLink> </li>
          </ul>
          <div className="content">
            <Route exact path="/1v1" component={Individual} />
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;


