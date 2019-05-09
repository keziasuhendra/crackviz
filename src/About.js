import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import DataSource from './data/datasource'
import './index.css'

import {
  Navbar, NavbarBrand, Nav, NavItem, NavLink, Button
} from 'reactstrap';

var data = new DataSource();

class Home extends Component {
  state = {
    redirect: false,
    redirectToAbout: false
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

  render () {

    var dataSeries = data.ready? data.getSeries(50, {drm: "denuvo"}, "y", false) : []
    
    return (
      <div className="home">
      <Navbar color="dark" light expand="md">
      {this.renderRedirect()}
        <NavbarBrand onClick={this.setRedirect}>
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
      <div className="jumbotron-fluid d-flex flex-column flex-wrap justify-content-center position-absolute w-100 h-100 align-items-center align-content-center">
      
        <h1 align="center"><font color="white">Meet Our CrackViz Team!</font></h1>
        <div className="p-4"/>
        <div className="d-flex flex-row flex-wrap justify-content-center align-items-center align-content-center" id="body-bg">
          <div className="jumbotron" id="jumbo">
            <center><img src="/muth.jpg" className="rounded-circle" width="250" height="300"/></center>
            <br/>
            <h2 align="center"><font color="white">13515059</font></h2>
            <h3 align="center"><font color="white">Muthmainnah</font></h3>
          </div>

          <div className="p-5"/>
          <div className="jumbotron" id="jumbo">
            <center><img src="/kesu.jpg" className="rounded-circle" width="250" height="300"/></center>
            <br/>
            <h2 align="center"><font color="white">13515063</font></h2>
            <h3 align="center"><font color="white">Kezia Suhendra</font></h3>
          </div>

          <div className="p-5"/>
          <div className="jumbotron" id="jumbo">
            <center><img src="/david.jpg" className="rounded-circle" width="250" height="300"/></center>
            <br/>
            <h2 align="center"><font color="white">13515131</font></h2>
            <h3 align="center"><font color="white">David Theosaksomo</font></h3>
          </div>
        </div>
        <footer>
          <div className="d-flex flex-row justify-content-center align-items-center align-content-center">
            <p align="center"><font color="white">Copyright &copy; CrackViz 2019</font></p>
          </div>
        </footer>
      </div>
    </div>
    )
  }
}

export default Home
