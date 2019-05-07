import React, { Component } from 'react'
import Area from './chart-types/Area'
import Bar from './chart-types/Bar'
import Column from './chart-types/Column'
import Line from './chart-types/Line'
import Donut from './chart-types/Donut'
import RadialBar from './chart-types/RadialBar'
import ChartUpdate from './ChartUpdate'
import DataSource from './data/datasource'

import {
  Navbar, NavbarBrand, Nav, NavItem, NavLink
} from 'reactstrap';

var data = new DataSource();

class App extends Component {
  constructor (props) {
    super(props)

    this.changeChart = this.changeChart.bind(this)

    this.state = {
      selectedChart: 'bar'
    }

  }

  changeChart (e) {
    this.setState({selectedChart: e.target.value})
  }

  render () {
    //contoh pengambilan data
    // if(data.ready === true) {
    //   data.getSeries(0, {}, "y", false)
    //   console.log(data.getSeries(0, {}, "y", false))
    // } else {
    //   console.log("not ready")
    // }

    var dataSeries = data.ready? data.getSeries(50, {drm: "denuvo"}, "y", false) : []
    
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
        <div className="d-flex flex-row flex-wrap justify-content-center position-absolute w-100 h-100 align-items-center align-content-center ">
          <div>
          { this.state.selectedChart === 'area' ? (<Area></Area>) : null}
          { this.state.selectedChart === 'bar' ? (<Bar></Bar>) : null}
          { this.state.selectedChart === 'line' ? (<Line></Line>) : null}
          { this.state.selectedChart === 'column' ? (<Column data = {dataSeries.series? dataSeries.series[0].data : []}></Column>) : null}
          { this.state.selectedChart === 'radialbar' ? (<RadialBar></RadialBar>) : null}
          { this.state.selectedChart === 'donut' ? (<Donut></Donut>) : null}
          { this.state.selectedChart === 'updateExample' ? (<ChartUpdate></ChartUpdate>) : null}
          </div>
          <div class="p-2"/>
          <div className="d-flex flex-column justify-content-center align-items-center align-content-center card">
            <div className="d-flex flex-column justify-content-space-between align-content-space-between card-body">
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
              </div>

            <div className="d-flex flex-row justify-content-space-between align-content-space-between card-body">
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

              <div className="p-2"/>

              <div className="form-group">
                <label htmlFor="lang">
                  DRM
                </label><br/>
                <select id="lang">
                  <option value="denuvo" >Denuvo</option>
                  <option value="steam" >Steam</option>
                </select>
              </div>

              </div>
              <div class="slidecontainer d-flex flex-column justify-content-space-between align-content-space-between card-body">
                <p align="center">2015 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 2016 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 2017 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 2018</p>
                <input  type="range" min="0" max="3" step="1" class="slider"/>
              </div>
                
                <div className="card-body">
                <h3 className="card-title" align="center">Average Time</h3>
                <h1 className="card-text" align="center">20 Day(s)</h1>
                </div>
                <div className="card-body">
                <h5 className="card-title" align="center">Games protected by:</h5>
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
