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
  Navbar, NavbarBrand, Nav, NavItem, NavLink, Row, Col
} from 'reactstrap';

var data = new DataSource();

class App extends Component {
  constructor (props) {
    super(props)

    this.changeChart = this.changeChart.bind(this)

    this.state = {
      selectedChart: 'column',
      form: {
        max: 50,
        drm: 'denuvo',
        year: '2015',
        sortBy: 'y',
        asc: false
      },
    }
  }

  changeChart (e) {
    this.setState({selectedChart: e.target.value})
  }

  updateChart = () => {
    let temp = this.state.selectedChart;
    this.setState({selectedChart:''},() => {
      this.setState({selectedChart:temp});
    });
  }

  handleFormChange = (e) => {
    let { form } = this.state;
    const { name, value } = e.target;

    if (name === 'max') {
      form[name] = parseInt(value);
    } else {
      form[name] = value;
    }

    this.setState({form},()=>{
      this.updateChart();
    });
  }

  render () {
    // //contoh pengambilan data
    // if(data.ready !== this.state.ready) {
    //   // console.log(data.getSeries(20, {drm: "denuvo"}, "y", false))
    //   this.updateData();
    // } else {
    //   console.log("not ready")
    // }
    var { max, drm, year, sortBy, asc } = this.state.form;
    var dataSeries = data.ready ? data.getSeries(max, {drm}, sortBy, asc) : {};
    // console.log(dataSeries);
    // console.log(this.state);
    
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
        { this.state.selectedChart === 'column' ? (<Column data={dataSeries.series ? dataSeries.series[0].data : []}></Column>) : null}
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
              <label htmlFor="max">
                Data to Show
              </label><br/>
              <select name="max" value={this.state.form.max} onChange={this.handleFormChange}>
                <option value={10} >10</option>
                <option value={20} >20</option>
                <option value={50} >50</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="drm">
                DRM
              </label><br/>
              <select name="drm" value={this.state.form.drm} onChange={this.handleFormChange}>
                <option value="denuvo" >Denuvo</option>
                <option value="steam" >Steam</option>
              </select>
            </div>

            <div className="form-group">
              <label >
                Year
              </label><br/>
              <Row>
                <Col sm={6}>
                  <label>
                    <input name="year" checked={this.state.form.year === '2015'} value="2015" type="checkbox" onChange={this.handleFormChange}/> 2015
                  </label>
                </Col>
                <Col sm={6}>
                  <label>
                    <input name="year" checked={this.state.form.year === '2016'} value="2016" type="checkbox" onChange={this.handleFormChange}/> 2016
                  </label>
                </Col>
              </Row>
              <Row>
                <Col sm={6}>
                  <label>
                    <input name="year" checked={this.state.form.year === '2017'} value="2017" type="checkbox" onChange={this.handleFormChange}/> 2017
                  </label>
                </Col>
                <Col sm={6}>
                  <label>
                    <input name="year" checked={this.state.form.year === '2018'} value="2018" type="checkbox" onChange={this.handleFormChange}/> 2018
                  </label>
                </Col>
              </Row>
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
