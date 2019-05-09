import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import DataSource from './data/datasource'
import './index.css'

import {
  Navbar, NavbarBrand, Nav, NavItem, NavLink, Button
} from 'reactstrap';

class Loading extends Component {
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
      <div className="jumbotron-fluid d-flex flex-row flex-wrap justify-content-center position-absolute w-100 h-100 align-items-center align-content-center">
        <div className="jumbotron d-flex flex-column justify-content-center align-items-center align-content-center" id="load">
        {/* <div className="p-3"/> */}
        <h3 align="center"><font color="white">Please Wait</font></h3>
        <img src="/zombie.gif" width="350"/>
        <div className="p-3"/>
        <div class="spinner-border text-danger"></div>
        {/* <div className="p-3"/> */}
        </div>
      </div>
    </div>
    )
  }
}

export default Loading
