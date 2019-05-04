import React, { Component } from 'react'
import Area from './chart-types/Area'
import Bar from './chart-types/Bar'
import Column from './chart-types/Column'
import Line from './chart-types/Line'
import Donut from './chart-types/Donut'
import RadialBar from './chart-types/RadialBar'
import ChartUpdate from './ChartUpdate'
import DataSource from './data/data'

import {
  Navbar, NavbarBrand, Nav, NavItem, NavLink
} from 'reactstrap';

var data = new DataSource();

class App extends Component {
  constructor (props) {
    super(props)

    this.changeChart = this.changeChart.bind(this)

    this.state = {
      selectedChart: 'column'
    }

    
  }

  changeChart (e) {
    this.setState({selectedChart: e.target.value})
  }

  render () {
    console.log(data.getAll())

    return (
      <div className="app">
      <Navbar color="dark" light expand="md">
        <NavbarBrand href="/">
          <font color="white">
          CrackViz Dashboard
          </font>
        </NavbarBrand>
        <Nav className="ml-auto" navbar>
          <NavItem className="d-flex align-items-center">
            <NavLink className="font-weight-bold" href="/">
              <font color="white">
              Home
              </font>
            </NavLink>
          </NavItem>
          <NavItem className="d-flex align-items-center">
          <NavLink className="font-weight-bold" href="/">
            <font color="white">
              About
            </font>
          </NavLink>
          </NavItem>
        </Nav>
      </Navbar>
      <div className="container-fluid">
        <div className="d-inline-flex flex-wrap justify-content-center position-absolute w-100 h-100 align-items-center align-content-center ">
          <div>
          { this.state.selectedChart === 'area' ? (<Area></Area>) : null}
          { this.state.selectedChart === 'bar' ? (<Bar></Bar>) : null}
          { this.state.selectedChart === 'line' ? (<Line></Line>) : null}
          { this.state.selectedChart === 'column' ? (<Column></Column>) : null}
          { this.state.selectedChart === 'radialbar' ? (<RadialBar></RadialBar>) : null}
          { this.state.selectedChart === 'donut' ? (<Donut></Donut>) : null}
          { this.state.selectedChart === 'updateExample' ? (<ChartUpdate></ChartUpdate>) : null}
          </div>
          <div className="d-flex-column card">
            <div className="card-body">
              <div className="form-group">
                <label htmlFor="lang">
                  Sort by
                </label><br/>
                <select id="lang" value={this.state.selectedChart} onChange={this.changeChart}>
                  <option value="line" >Line</option>
                  <option value="area" >Area</option>
                  <option value="bar" >Bar</option>
                  <option value="column" >Column</option>
                  <option value="radialbar" >RadialBar</option>
                  <option value="donut" >Donut</option>
                  <option value="updateExample" >Chart Update Example</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="lang">
                  Data to Show
                </label><br/>
                <select id="lang">
                  <option value="50" >50</option>
                  <option value="100" >100</option>
                  <option value="all" >All</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="lang">
                  DRM
                </label><br/>
                <select id="lang">
                  <option value="denuvo" >Denuvo</option>
                  <option value="steam" >Steam</option>
                </select>
              </div>
                
                <hr/>
                <h3 className="card-title" align="center">Average Time</h3>
                <h1 className="card-text" align="center">20 Day(s)</h1>
                <br/>
                <h5 className="card-text" align="center">Games protected by:</h5>
                <center><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/Denuvo_vector_logo.svg/1200px-Denuvo_vector_logo.svg.png" alt="Cinque Terre" width="150"/></center>
            </div>
          </div>
        </div>
      </div>
    </div>
    )
  }
}

export default App
