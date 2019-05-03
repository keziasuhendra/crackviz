import React, { Component } from 'react'
import Area from './chart-types/Area'
import Bar from './chart-types/Bar'
import Column from './chart-types/Column'
import Line from './chart-types/Line'
import Donut from './chart-types/Donut'
import RadialBar from './chart-types/RadialBar'
import ChartUpdate from './ChartUpdate'
import {
  Navbar, NavbarBrand, Nav, NavItem, NavLink
} from 'reactstrap';

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
        <br/><br/>
        {/* <select id="lang" value={this.state.selectedChart} onChange={this.changeChart}>
          <option value="line" >Line</option>
          <option value="area" >Area</option>
          <option value="bar" >Bar</option>
          <option value="column" >Column</option>
          <option value="radialbar" >RadialBar</option>
          <option value="donut" >Donut</option>
          <option value="updateExample" >Chart Update Example</option>
        </select> */}

        <div className="d-flex flex-wrap justify-content-center position-absolute w-100 h-100 align-items-center align-content-center">
          { this.state.selectedChart === 'area' ? (<Area></Area>) : null}
          { this.state.selectedChart === 'bar' ? (<Bar></Bar>) : null}
          { this.state.selectedChart === 'line' ? (<Line></Line>) : null}
          { this.state.selectedChart === 'column' ? (<Column></Column>) : null}
          { this.state.selectedChart === 'radialbar' ? (<RadialBar></RadialBar>) : null}
          { this.state.selectedChart === 'donut' ? (<Donut></Donut>) : null}
          { this.state.selectedChart === 'updateExample' ? (<ChartUpdate></ChartUpdate>) : null}
        </div>
      </div>
    )
  }
}

export default App
