import React ,{useState} from "react";
import { Navbar, Nav, NavDropdown, Button, Table, Card,Image} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles.css";
import { HighLight } from "./login";
import {selectAppStats} from "../state/slices/appSlice"
import Footer from "../components/footer";
import NavButtons from "../components/adminnavbuttons";
import { useSelector } from "react-redux";
import fetchData from "../fetchData";
import { useNavigate } from "react-router-dom";
import ButtonSpinner from "../components/buttonspinner";
import { developmentApiEntryPoint } from "./register";
import { CiTrash,CiMail } from "react-icons/ci";
import { IoPersonRemove, IoPersonAdd } from "react-icons/io5";
import styled from "styled-components";
const StyledButton=styled(Button)`
margin-left:4px;
`


const AllUsers = () => {
  const appStats=useSelector(selectAppStats)
  const [loading, setLoading]= useState(false)
  const navigate= useNavigate()

  const promoteUser=(id,name,isAdmin)=>{
    if(isAdmin){
      alert(`${name} is already an admin`)
    }
    else{
      const proceed= window.confirm(`are you sure you want to make ${name} an admin?`)
      if(proceed){
        setLoading(true)
        fetchData(
          `${developmentApiEntryPoint}/users/promoteUser/${id}`,
          (data)=>{
            alert("successful")
            navigate("/")
          },
          (message)=>{
            alert(message)
            navigate("/")
          }, "POST",
          {},
          localStorage.getItem("support_token")
          )
      }
      
    }
  }

  const demoteUser=(id,name,isAdmin)=>{
    if(!isAdmin){
      alert(`${name} is already a regular user`)
    }
    else{
      const proceed= window.confirm(`are you sure you want to make ${name} a regular user?`)
      if(proceed){
        setLoading(true)
        fetchData(
          `${developmentApiEntryPoint}/users/demoteUser/${id}`,
          (data)=>{
            alert("successful")
            navigate("/")
          },
          (message)=>{
            alert(message)
            navigate("/")
          }, "POST",
          {},
          localStorage.getItem("support_token")
          )
      }
      
    }
  }


  const deleteUser=(id,name)=>{
    const canProceed= window.confirm(`Are you sure you want to  permanently delete  ${name} as a user` )
    if(canProceed){
      fetchData(
        `${developmentApiEntryPoint}/users/delete/${id}`,
        (data)=>{
          alert("Successful")
          navigate("/")
        },
        (message)=>{
            alert(message)
            navigate("/")
        },"POST",
        {},
        localStorage.getItem("support_token")
      )
    }
  }

  const {allUsers}=appStats
  console.log(allUsers)

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
      <Card className="mt-4">
        <Card.Header>
          <h3 className="text-center grayish">User List</h3>
        </Card.Header>
        <Card.Body>
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>id</th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {allUsers.map(user=>{
                return(
                  <tr>
                  <td>{user.idImg?<Image width={30} style={{objectFit:"cover", borderRadius:"50%"}} height={30} src={user.idImg}/>:"unavailable"}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.isAdmin?"Admin":"client"}</td>
                  <td>Active</td>
                  <td>
                  <StyledButton variant="outline-success" disabled={loading} onClick={()=>{promoteUser(user._id ,user.name,user.isAdmin)}} size="sm"><IoPersonAdd/>{loading&&<ButtonSpinner/>}</StyledButton>
                  <StyledButton variant="outline-secondary" onClick={()=>{demoteUser(user._id ,user.name,user.isAdmin)}} disabled={loading} ><IoPersonRemove/> {loading&&<ButtonSpinner/>}</StyledButton>
                  <StyledButton href={`/admin/sendmessage?id=${user._id}`} variant="outline-info" ><CiMail/></StyledButton>
                  <StyledButton onClick={()=>{deleteUser(user._id,user.name)}} variant="outline-danger" ><CiTrash/>{loading&&<ButtonSpinner/>}</StyledButton>

                  </td>
                </tr>
                )
              })}
             
              
            </tbody>
          </Table>
        </Card.Body>
      </Card>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default AllUsers;
