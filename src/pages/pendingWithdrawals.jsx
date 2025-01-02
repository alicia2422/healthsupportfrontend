import React from "react";
import { Navbar, Nav, NavDropdown, Button, Table, Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles.css";
import { HighLight } from "./login";
import Footer from "../components/footer";
import NavButtons from "../components/adminnavbuttons";
import { BiTrash } from "react-icons/bi";
import { BsCheck } from "react-icons/bs";
import { useSelector } from "react-redux";
import {selectAppStats} from "../state/slices/appSlice"
import fetchData from "../fetchData";
import { developmentApiEntryPoint } from "./register";
import { useNavigate } from "react-router-dom";
const token= localStorage.getItem("support_token")

const PendingWithdrawals = () => {
  const appStats= useSelector(selectAppStats)
  const navigate=useNavigate()
  const pendingWithdrawals= appStats.allWithdrawals.filter(x=>x.status==="pending")
  console.log(pendingWithdrawals)
  const approveWithdrawal=(id,name,amount)=>{
    const canProceed=window.confirm(`Are you sure you want to approve the withdrawal of ${amount} by ${name}`)
  if(canProceed){
    fetchData(
      `${developmentApiEntryPoint}/admin/approvewithdrawal/${id}`,
      (data)=>{
        alert("Approved✔")
        navigate("/admin")
      },
      (message)=>{
        alert(message)
      },
      "POST",
      {},
    token
    )
  }
  }

  const deleteWithdrawal=(id,name,amount)=>{
    const canProceed=window.confirm(`Are you sure you want to delete the withdrawal of ${amount} by ${name}`)
  if(canProceed){
    fetchData(
      `${developmentApiEntryPoint}/admin/declinewithdrawal/${id}`,
      (data)=>{
        alert("🚮 deleted")
        navigate("/admin")
      },
      (message)=>{
        alert(message)
      },
      "POST",
      {},
    token
    )
  }
  }
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
              info@healthsupport.com
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
          <h3 className="text-center grayish">Pending Withdrawal</h3>
        </Card.Header>
        <Card.Body>
          {pendingWithdrawals.length>0?(<Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>Name</th>
                <th>Amount</th>
                <th>Wallet ID</th>
                <th>Coin</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {pendingWithdrawals.map(withdrawal=>{
                return(
                  <tr>
                <td>{withdrawal.userId.name}</td>
                <td>{withdrawal.amount}</td>
                <td>{withdrawal.wallet.walletId}</td>
                <td>{withdrawal.wallet.coin}</td>
                <td>
                  <Button variant="outline-danger mx-4">
                    <BiTrash onClick={()=>{deleteWithdrawal(withdrawal._id, withdrawal.userId.name,withdrawal.amount)}} />
                  </Button>
                  <Button onClick={()=>{approveWithdrawal(withdrawal._id, withdrawal.userId.name,withdrawal.amount)}} variant="outline-info">
                    <BsCheck />
                  </Button>
                </td>
              </tr>
                )
              })}
              
          
            </tbody>
          </Table>):<p className="text-center">Nothing to display</p>}
        </Card.Body>
      </Card>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default PendingWithdrawals;
