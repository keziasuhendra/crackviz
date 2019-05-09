import React, { Component } from 'react'
// import ReactPaginate from 'react-paginate';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';

import Column from './chart-types/Column'
import DataSource from './data/datasource'
import { Redirect } from 'react-router-dom'

import './app.css'
import './index.css'
import Loading from './Loading';


import {
  Navbar, NavbarBrand, Nav, NavItem, NavLink, FormGroup, Label, Input, UncontrolledTooltip
} from 'reactstrap';

var data = new DataSource();
var timer;

class App extends Component {

  dataSeries
  dataArray

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
      return <Redirect to='/'/>
    }
  }

  renderRedirectAbout = () => {
    if (this.state.redirectToAbout) {
      return <Redirect to='/about'/>
    }
  }

  constructor (props) {
    super(props)

    this.changeChart = this.changeChart.bind(this)

    this.state = {
      selectedChart: 'column',
      form: {
        max: 30,
        drm: 'denuvo',
        year: 0,
        sortBy: 'y',
        asc: false
      },
      averageDay: 0,
      pageCount: 0,
      dataCount: -1,
      currentPage: 0,
      pagesRange: [],
      isLoading: true
    }

  }

  componentDidMount() {
    timer = setInterval(() => {
      this.loadNewData();
    }, 1000);
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
    } else if (name === 'asc') {
      if (value === 'asc') {
        form[name] = true;
      } else {
        form[name] = false;
      }
    } else if (name === 'year') {
      if (form[name] === parseInt(value)) {
        form[name] = 2018
      } else {
        form[name] = parseInt(value)
      }
    } 
    else {
      form[name] = value;
    }


    this.setState({form},()=>{
      this.loadNewData();

      this.updateChart();
    });
  }

  handlePageClick = (i) => {
    let selected = i;

    this.setState({ currentPage: selected }, () => {
      this.updateChart();
    });
  };

  handlePaginationRange = (direction, first=false, last=false) => {
    let min = 0;
    let max = 4;

    if (first) {
      // do nothing
    } else if (last) {
      min = 5 * Math.floor(this.state.pageCount/5);
      max = this.state.pageCount - 1;
    } else {
      min = direction === 'next' ? this.state.pagesRange[0]+5 : this.state.pagesRange[0]-5;
      max = min + 4;
    }

    if (max > this.state.pageCount-1) {
      max = this.state.pageCount-1;
    }
    
    let pagesRange = [...Array(max-min+1)];
    pagesRange = pagesRange.map((val,i) => i+min);
    console.log(pagesRange);

    this.setState({
      pagesRange
    },() => {
      this.handlePageClick(!last?min:max);
    })
  }

  loadNewData () {
    var { max, drm, year, sortBy, asc } = this.state.form;
    this.dataSeries = data.ready ? data.getSeries({drm, year}, sortBy, asc, this.state) : {};
    this.dataArray = this.dataSeries.series ? this.dataSeries.series[0].data : [];
    var currentPage = 0
    var pageCount = Math.ceil(this.dataArray.length / this.state.form.max)
    var pagesRange = [...Array(pageCount>=5?5:pageCount)];
    pagesRange = pagesRange.map((val,key) => key);

    var i = 0
    var sum = 0
    for (;i < this.dataArray.length; i ++) {
      sum = sum + this.dataArray[i]["y"]
    }
    var averageDay = sum / this.dataArray.length
    var dataCount = this.dataArray.length

    this.setState({currentPage,pageCount,pagesRange,averageDay,dataCount},() => {
      if (data.ready && this.state.isLoading) {
        clearInterval(timer);
        this.setState({isLoading: false});
      } 
    });
  }

  render () {
    // if (this.dataSeries == undefined) {
    //   this.loadNewData( )
    // }

    // var dataSeries = this.dataSeries
    var dataSeries = this.dataArray ? this.dataArray.slice (this.state.form.max * (this.state.currentPage), this.state.form.max * (this.state.currentPage + 1)) : [];

    var { currentPage, pageCount, pagesRange } = this.state;

    if (this.state.isLoading) {
      return(<Loading/>);
    }
    return (
      <div className="app">
      <Navbar color="dark" light expand="md">
        <NavbarBrand onClick={this.setRedirect}>
        {this.renderRedirect()}
          <font color="white">
          CrackViz Dashboard
          </font>
        </NavbarBrand>
        <Nav className="ml-auto" navbar>
          <NavItem className="d-flex align-items-center">
            <NavLink className="font-weight-bold" onClick={this.setRedirect}>
            {this.renderRedirect()}
              <font color="white">
              Home
              </font>
            </NavLink>
          </NavItem>
          <NavItem className="d-flex align-items-center">
          <NavLink className="font-weight-bold" onClick={this.setRedirectAbout}>
          {this.renderRedirectAbout()}
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
          {/* { this.state.selectedChart === 'column' ? (<Column data = {dataSeries.series? dataSeries.series[0].data : []}></Column>) : null} */}
          { this.state.selectedChart === 'column' ? (<Column data = {dataSeries}></Column>) : null}
          </div>
          <div className="p-2"/>
          <div className="d-flex flex-column justify-content-center align-items-center align-content-center card">
            <div className="d-flex flex-row justify-content-space-between align-content-left card-body">
              <div className="form-group d-flex flex-column justify-content-space-between align-content-left">
                <label htmlFor="lang">
                  Sort by
                </label><div class="p-1"/>
                <select id="lang" name="sortBy" onChange={this.handleFormChange}>
                  <option value="y" >Time to Crack</option>
                  <option value="releaseDateMilis" >Release Date</option>
                  <option value="x" >Title</option>
                </select>
              </div>

              <div class="p-2"/>
              <div className="d-flex flex-column justify-content-left align-items-left align-content-left">
              <div class="p-2"/>
               <div> 
                <FormGroup check>
                  <Label check>
                    <Input type="checkbox" name="asc" value="asc" checked={this.state.form.asc === true} onChange={this.handleFormChange}/>{' '}
                    Asc
                  </Label>
                </FormGroup>
              </div>
              <div class="p-1"/>
              <div>
                <FormGroup check>
                  <Label check>
                    <Input type="checkbox" name="asc" value="desc" checked={this.state.form.asc === false} onChange={this.handleFormChange}/>{' '}
                    Desc
                  </Label>
                </FormGroup>
              </div>
              </div>
            </div>

            <div className="d-flex flex-row justify-content-space-between align-content-space-between">
              <div className="form-group">
                <label htmlFor="max">
                  Data to Show
                </label><div class="p-1"/>
                <select name="max" value={this.state.form.max} onChange={this.handleFormChange}>
                  <option value={10} >10</option>
                  <option value={20} >20</option>
                  <option value={30} >30</option>
                </select>
              </div>

              <div className="p-2"/>

              <div className="form-group">
                <label htmlFor="drm">
                  DRM <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/7f/Replacement_character.svg/220px-Replacement_character.svg.png" width="15" height="15" id="drm"/>
                </label>
                <UncontrolledTooltip placement="bottom" text="left" target="drm">
                Digital rights management (DRM) is a systematic approach to copyright protection for digital media. 
                The purpose of DRM is to prevent unauthorized redistribution of digital media and restrict the ways consumers can copy content they've purchased.
                </UncontrolledTooltip>
                <div class="p-1"/>
                <select name="drm" value={this.state.form.drm} onChange={this.handleFormChange}>
                  <option value="denuvo" >Denuvo</option>
                  <option value="steam" >Steam</option>
                  {/* <option value="uplay" >Uplay</option>
                  <option value="epicgames" >Epic Games</option> */}
                  <option value="origin" > Origin</option>
                </select>
              </div>

              </div>
              <div class="p-2"/>
              <div class="slidecontainer d-flex flex-column justify-content-space-between align-content-space-between">
                <div className="d-flex flex-row justify-content-space-between align-content-space-between">
                  <p>2015</p> <span className="p-2"/> <p>2016</p> <span className="p-2"/> <p>2017</p> <span className="p-2"/> <p>2018</p>
                </div>
                <input type="range" min="2015" max="2018" step="1" className="slider" name="year" value={this.state.form.year} onChange={this.handleFormChange} disabled={this.state.form.year === 0}/>
                <div> 
                <div className="p-2"/>
                <FormGroup check>
                  <Label check>
                    <Input type="checkbox" name="year" value="0" checked={this.state.form.year === 0} onChange={this.handleFormChange}/>{' '}
                    All Year (2015-2018)
                  </Label>
                </FormGroup>
                <div class="p-2"/>
              </div>
              </div>

              <hr width="200"/>
                
                <div className="card-body">
                <h3 className="card-title" align="center">Average Time</h3>
                {
                  this.state.dataCount > 0 ?
                  <h1 className="card-text" align="center">{Math.round(this.state.averageDay * 100)/100} Day(s)</h1>
                  : <h1 className="card-text" align="center">No Data</h1>
                }
                
                </div>
                <div className="card-body">
                <h5 className="card-title" align="center">Games protected by:</h5>
                {this.state.form.drm === 'denuvo'? <center><a href="https://en.wikipedia.org/wiki/Denuvo" target="_blank"><img src="/denuvo.png" alt="Denuvo Logo" width="150" id="logo"/></a></center> : null}
                {this.state.form.drm === 'steam'? <center><a href="https://en.wikipedia.org/wiki/Steam_(software)" target="_blank"><img src="/steam.png" alt="Steam Logo" width="200" id="logo"/></a></center> : null}
                {/* {this.state.form.drm === 'uplay'? <center><a href="https://en.wikipedia.org/wiki/Uplay" target="_blank"><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/61/Uplay-logo.webp/610px-Uplay-logo.webp.png" alt="Cinque Terre" width="150"/></a></center> : null}
                {this.state.form.drm === 'epicgames'? <center><a href="https://en.wikipedia.org/wiki/Epic_Games" target="_blank"><img src="https://cdn.wccftech.com/wp-content/uploads/2018/12/epic_games_logo_white.jpg" alt="Cinque Terre" width="200"/></a></center> : null} */}
                {this.state.form.drm === 'origin'? <center><a href="https://en.wikipedia.org/wiki/Origin_(digital_distribution_software)" target="_blank"><img src="/origin.png" alt="Origin Logo" width="200" id="logo"/></a></center> : null}
                <UncontrolledTooltip placement="top" text="left" target="logo">
                Click for more info.
                </UncontrolledTooltip>
            </div>

            {/* <link href="index.css" rel="stylesheet"></link>
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
            /> */}
            {
            pageCount > 0 && <div className="p-3">
              <Pagination aria-label="Page navigation example">
                <PaginationItem disabled={currentPage<=0}>
                    <PaginationLink first onClick={() => this.handlePaginationRange('previous',true,false)} />
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink previous disabled={pagesRange[0]<=0} onClick={() => this.handlePaginationRange('previous')}/>
                  </PaginationItem>
                  {pagesRange.map((page, i) => 
                    <PaginationItem active={page === currentPage} key={i}>
                      <PaginationLink onClick={() => this.handlePageClick(page)}>
                        {page + 1}
                      </PaginationLink>
                    </PaginationItem>
                  )}
                  <PaginationItem>
                    <PaginationLink next disabled={pagesRange[pagesRange.length-1]>=pageCount-1} onClick={() => this.handlePaginationRange('next')}/>
                  </PaginationItem>
                  <PaginationItem disabled={currentPage>=pageCount-1}>
                    <PaginationLink last onClick={() => this.handlePaginationRange('next',false,true)} />
                  </PaginationItem>
                </Pagination>
            </div>
            }
          </div>
        </div>
      </div>
      
    </div>
    )
  }
}

export default App

