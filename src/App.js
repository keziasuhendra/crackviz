import React, { Component } from 'react'
import Area from './chart-types/Area'
import Bar from './chart-types/Bar'
import Column from './chart-types/Column'
import Line from './chart-types/Line'
import Donut from './chart-types/Donut'
import RadialBar from './chart-types/RadialBar'
import ChartUpdate from './ChartUpdate'
import DataSource from './data/datasource'
import { Redirect } from 'react-router-dom'

import ReactPaginate from 'react-paginate';

import './app.css'
import './index.css'


import {
  Navbar, NavbarBrand, Nav, NavItem, NavLink, Row, Col
} from 'reactstrap';

var data = new DataSource();

class App extends Component {

  dataSeries
  dataArray

  state = {
    redirect: false
  }
  setRedirect = () => {
    this.setState({
      redirect: true
    })
  }
  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to='/'/>
    }
  }

  constructor (props) {
    super(props)

    this.changeChart = this.changeChart.bind(this)

    this.state = {
      selectedChart: 'column',
      form: {
        max: 50,
        drm: 'denuvo',
        year: 2015,
        sortBy: 'y',
        asc: false
      },
      pageCount: 0,
      currentPage: 0
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

    this.loadNewData()

    this.setState({form},()=>{
      this.updateChart();
    });
  }

  handlePageClick = data => {
    let selected = data.selected;

    this.setState({ currentPage: selected }, () => {
      this.updateChart();
    });
  };

  loadNewData () {
    var { max, drm, year, sortBy, asc } = this.state.form;
    this.dataSeries = data.ready ? data.getSeries({drm, year}, sortBy, asc, this.state) : {};
    this.dataArray = this.dataSeries.series[0].data
    this.state.currentPage = 0
    this.state.pageCount = (this.dataArray.length / this.state.form.max)
  }

  render () {
    // //contoh pengambilan data
    // if(data.ready !== this.state.ready) {
    //   // console.log(data.getSeries(20, {drm: "denuvo"}, "y", false))
    //   this.updateData();
    // } else {
    //   console.log("not ready")
    // }
    if (this.dataSeries == undefined) {
      this.loadNewData( )
    }

    var dataSeries = this.dataSeries
    dataSeries.series[0].data = this.dataArray.slice (this.state.form.max * (this.state.currentPage), this.state.form.max * (this.state.currentPage + 1))

    
    return (
      <div className="app">
      <Navbar color="dark" light expand="md">
      {this.renderRedirect()}
        <NavbarBrand href="/">
          <font color="white">
          CrackViz Dashboard
          </font>
        </NavbarBrand>
        <Nav className="ml-auto" navbar>
          <NavItem className="d-flex align-items-center">
            <NavLink className="font-weight-bold" onClick={this.setRedirect}>
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
      <div className="container-fluid" id="app-bg">
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
            <div className="d-flex flex-column justify-content-space-between align-content-center card-body">
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

            <div className="d-flex flex-row justify-content-space-between align-content-space-between">
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

              <div className="p-2"/>
              <div className="p-2"/>

              <div className="form-group">
                <label htmlFor="drm">
                  DRM
                </label><br/>
                <select name="drm" value={this.state.form.drm} onChange={this.handleFormChange}>
                  <option value="denuvo" >Denuvo</option>
                  <option value="steam" >Steam</option>
                </select>
              </div>

              </div>
              <div class="slidecontainer d-flex flex-column justify-content-space-between align-content-space-between card-body">
                <p align="center">2015 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 2016 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 2017 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 2018</p>
                <input  type="range" min="0" max="3" step="1" class="slider"/>
              </div>

              <hr width="200"/>
                
                <div className="card-body">
                <h3 className="card-title" align="center">Average Time</h3>
                <h1 className="card-text" align="center">20 Day(s)</h1>
                </div>
                <div className="card-body">
                <h5 className="card-title" align="center">Games protected by:</h5>
                <center><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/Denuvo_vector_logo.svg/1200px-Denuvo_vector_logo.svg.png" alt="Cinque Terre" width="150"/></center>
            </div>

            {/* <div className="form-group">
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
            </div> */}

            <link href="index.css" rel="stylesheet"></link>
            <ReactPaginate
              previousLabel={'previous'}
              nextLabel={'next'}
              breakLabel={'...'}
              breakClassName={'break-me'}
              pageCount={this.state.pageCount}
              marginPagesDisplayed={2}
              pageRangeDisplayed={5}
              initialPage={this.state.currentPage}
              onPageChange={this.handlePageClick}
              containerClassName={'pagination'}
              subContainerClassName={'pages pagination'}
              activeClassName={'active'}
            />
              {/* <hr/>
              <h3 className="card-title" align="center">Average Time</h3>
              <h1 className="card-text" align="center">20 Day(s)</h1>
              <br/>
              <h5 className="card-text" align="center">Games protected by:</h5>
              <center><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/Denuvo_vector_logo.svg/1200px-Denuvo_vector_logo.svg.png" alt="Cinque Terre" width="150"/></center> */}
          </div>
        </div>
      </div>
      
    </div>
    )
  }
}

export default App

