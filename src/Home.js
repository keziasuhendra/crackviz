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
  
  setRedirectAbout = () => {
    this.setState({
      redirectToAbout: true
    })
  }

  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to='/app'/>
    }
  }

  renderRedirectAbout = () => {
    if (this.state.redirectToAbout) {
      return <Redirect to='/about'/>
    }
  }

  render () {

    var dataSeries = data.ready? data.getSeries(50, {drm: "denuvo"}, "y", false) : []
    
    return (
      <div className="home">
      <Navbar color="dark" light expand="md">
      {this.renderRedirectAbout()}
        <NavbarBrand onClick={this.setRedirect}>
        <img src="/icon.png" className="rounded" width="70" height="55"/>
          <font color="white">
          CrackViz Dashboard
          </font>
        </NavbarBrand>
        <Nav className="ml-auto" navbar>
          <NavItem className="d-flex align-items-center">
            <NavLink className="font-weight-bold">
            <img src="/home.png" width="40" height="40"/>
              <font color="white">
              Home
              </font>
            </NavLink>
          </NavItem>
          <div className="p-2"/>
          <NavItem className="d-flex align-items-center">
          <NavLink className="font-weight-bold" onClick={this.setRedirectAbout}>
          <img src="/about.png" width="40" height="40"/>
            <font color="white">
              About
            </font>
          </NavLink>
          <div className="p-2"/>
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
