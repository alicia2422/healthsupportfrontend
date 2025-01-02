import React from "react";
import { Navbar, Nav, NavDropdown, Button, Table, Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles.css";
import { HighLight } from "./login";
import Footer from "../components/footer";
import NavButtons from "../components/adminnavbuttons";
import {selectAppStats} from "../state/slices/appSlice"
import {useSelector} from "react-redux"
import  {EmptyTable} from "./pendingdeposits"

const ApprovedDeposits = () => {
  const appStats= useSelector(selectAppStats)
  console.log(appStats.allInvestments)
  
   const approvedDeposits= appStats.allInvestments.filter(x=>(x.status==="approved")||(x.status==="active"))
   
  return (
    <div className="container-fluid">
      {/* Top Bar */}
      <div className="container-fluid  px-0">
        <div className="top-bar row gx-0 align-items-center d-none d-lg-flex">
          <div className="col-lg-6 px-5 text-start">
            <small>
              <i className="fa fa-map-marker-alt text-primary me-2"></i>123
              Street, New York, USA
            </small>
            <small className="ms-4">
              <i className="fa fa-clock text-primary me-2"></i>9.00 am - 9.00 pm
            </small>
          </div>
          <div className="col-lg-6 px-5 text-end">
            <small>
              <i className="fa fa-envelope text-primary me-2"></i>
              medicalhealthassets@gmail.com
            </small>
          </div>
        </div>

        {/* Navbar */}
        <Navbar expand="lg" className="py-lg-0 px-lg-5">
          <Navbar.Brand href="/home">
            <h3 style={{ color: "rgb(0,0,0,0.5)" }} className="display-5 m-0">
              Health<HighLight>Support</HighLight>
            </h3>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarCollapse" />
          <Navbar.Collapse id="navbarCollapse">
            <Nav className="ms-auto">
              <Nav.Link href="/home" className="active">
                Home
              </Nav.Link>
              <Nav.Link href="/home#about">About</Nav.Link>
              <Nav.Link href="/home#services">Services</Nav.Link>
              <NavDropdown title="Actions" id="actions-dropdown">
                <NavDropdown.Item href="/invest">Invest</NavDropdown.Item>
                <NavDropdown.Item href="/withdraw">Withdraw</NavDropdown.Item>
                <Button
                  variant="primary"
                  className="dropdown-item text-white"
                  onClick={() => console.log("Logout")}
                >
                  Logout
                </Button>
              </NavDropdown>
              <Nav.Link href="/home#contact">Contact</Nav.Link>
            </Nav>
            <div className="d-none d-lg-flex ms-2">
              <Button
                variant="light"
                className="btn-sm-square rounded-circle ms-3"
              >
                <small className="fab fa-facebook-f text-primary"></small>
              </Button>
              <Button
                variant="light"
                className="btn-sm-square rounded-circle ms-3"
              >
                <small className="fab fa-twitter text-primary"></small>
              </Button>
              <Button
                variant="light"
                className="btn-sm-square rounded-circle ms-3"
              >
                <small className="fab fa-linkedin-in text-primary"></small>
              </Button>
            </div>
          </Navbar.Collapse>
        </Navbar>
        <hr
          style={{
            backgroundColor: "rgba(0,0,0,0.4)",
            position: "relative",
            top: "10px",
          }}
        />
      </div>

      {/* Quick Links */}

      <div style={{ marginTop: "50px" }}>
        <p className="h4 text-center mb-4 links-text">Quick links:</p>

        <NavButtons />
      </div>

      {/* User Table */}
      <Card className="mt-4 mb-4">
        <Card.Header>
          <h3 className="text-center grayish">Approved Deposits</h3>
        </Card.Header>
       {approvedDeposits.length>0?( <Card.Body>
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Amount</th>
                <th>Coin</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {approvedDeposits.map(x=>{
                return(
                  <tr>
                  <td><img style={{width:"50px", height:"50px",borderRadius:"50%", objectFit:"cover"}} src={x.userId.idImg}/></td>
                  <td>{x.userId.name}</td>
                  <td>{x.amount}</td>
                  <td>{x.coin}</td>
                  <td>{x.status}</td>
                </tr>
                )
              })}
              
              
            </tbody>
          </Table>
        </Card.Body>):(<EmptyTable/>)}
      </Card>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default ApprovedDeposits;
