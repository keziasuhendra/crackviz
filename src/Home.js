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
      return <Redirect to='/app'/>
    }
  }

  render () {

    var dataSeries = data.ready? data.getSeries(50, {drm: "denuvo"}, "y", false) : []
    
    return (
      <div className="home">
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
      <div className="container-fluid d-flex flex-row flex-wrap justify-content-left position-absolute h-100 align-items-center align-content-center" id="body-bg">
        <div className="p-2"/><div className="p-2"/><div className="p-2"/><div className="p-2"/>
        <div className="jumbotron" id="jumbo">
          {this.renderRedirect()}
          <h1 align="center"><font color="white">Welcome to<br/>CrackViz Dashboard!</font></h1>
          <br/>
          <p align="center"><font color="white">Do you want to know about the time needed<br/>for a game to be cracked?</font></p>
          <br/>
          <center><Button color="danger" onClick={this.setRedirect}>Find Out Here!</Button></center>
        </div>
      </div>
    </div>
    )
  }
}

export default Home
