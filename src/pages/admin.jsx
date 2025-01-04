// AdminPage.js
import React, { useEffect,useState} from "react";
import Footer from "../components/footer";
import {
  Container,
  Navbar,
  Nav,
  NavDropdown,
  Row,
  Col,
  Card,
  Button,
} from "react-bootstrap";
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaEnvelope,
  FaMapMarkerAlt,
  FaClock,
} from "react-icons/fa";
import NavButtons from "../components/adminnavbuttons";
import { HighLight } from "./login";
import fetchData from "../fetchData";
import { developmentApiEntryPoint } from "./register";
import { useDispatch, useSelector } from "react-redux";
import { selectAppStats, setAppStats } from "../state/slices/appSlice";


const AdminPage = () => {
  const dispatch= useDispatch()
  const  appStats= useSelector(selectAppStats)
  const [temporaryAppStats, setTemporaryStats]=useState({allUsers:[],allInvestments:[],allWithdrawals:[],})
  const [hasFetched,setHasFetched]= useState(false)

  
  console.log({appStats})
  useEffect(()=>{
    fetchData(
      `${developmentApiEntryPoint}/admin/getstats`,
      (data)=>{
        dispatch(setAppStats(data.result))
        setTemporaryStats(data.result)
        setHasFetched(true)
      },
      (message)=>{
        alert("an error occured")
        window.location.reload()
      }
    )
  },[])
  const {allUsers,allInvestments,allWithdrawals}=temporaryAppStats
const pendingRequests=[...allInvestments.filter(x=>x.status==="pending"),...allWithdrawals.filter(x=>x.status==="pending")]
  const stats = [
    { title: "Total Users", value:hasFetched? allUsers.length:"Fetching" },
    { title: "Total Investments", value:hasFetched?allInvestments.length:"Fetching" },
    { title: "Pending Requests", value:hasFetched?pendingRequests.length:"Fetching" },
  ];

  return (
    <Container fluid className="p-0">
      {/* Top Bar */}
      <div className="d-none d-lg-flex align-items-center justify-content-between px-5 py-2 bg-light">
        <div>
          <small>
            <FaMapMarkerAlt className="text-primary me-2" />
            123 Street, New York, USA
          </small>
          <small className="ms-4">
            <FaClock className="text-primary me-2" />
            9.00 am - 9.00 pm
          </small>
        </div>
        <div>
          <small>
            <FaEnvelope className="text-primary me-2" />
            medicalhealthassets@gmail.com
          </small>
        </div>
      </div>

      {/* Navbar */}
      <Navbar expand="lg" bg="light" variant="light" className="py-3 px-lg-5">
        <Navbar.Brand href="/" className="d-flex align-items-center">
          <h1 className="display-5  mb-0">
            Health<HighLight>Support</HighLight>
          </h1>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link href="/home" active>
              Home
            </Nav.Link>
            <Nav.Link href="/home#about">About</Nav.Link>
            <Nav.Link href="/home#service">Services</Nav.Link>
            <NavDropdown title="Actions" id="nav-dropdown">
              <NavDropdown.Item href="/invest">Invest</NavDropdown.Item>
              <NavDropdown.Item href="/withdraw">Withdraw</NavDropdown.Item>
              <NavDropdown.Item
                className="text-danger"
                onClick={() => alert("Logging out")}
              >
                Logout
              </NavDropdown.Item>
            </NavDropdown>
            <Nav.Link href="/home#contact">Contact</Nav.Link>
          </Nav>
          <div className="d-none d-lg-flex ms-3">
            <Button variant="light" className="rounded-circle btn-sm mx-1">
              <FaFacebookF className="text-primary" />
            </Button>
            <Button variant="light" className="rounded-circle btn-sm mx-1">
              <FaTwitter className="text-primary" />
            </Button>
            <Button variant="light" className="rounded-circle btn-sm mx-1">
              <FaLinkedinIn className="text-primary" />
            </Button>
          </div>
        </Navbar.Collapse>
      </Navbar>

      {/* Content */}
      <Container className="my-5">
        <h4 className="text-center mb-4">Quick Links:</h4>
        <NavButtons />

        <Row className="cardContent mt-5">
          {stats.map((stat) => {
            return (
              <Col xl={4}>
                <Card>
                  <Card.Header className="text-center">
                    {stat.title}
                  </Card.Header>
                  <Card.Body className="bg-success text-white d-flex justify-content-between align-items-center p-4">
                    <div>
                      <h3 id="totalUsers">{stat.value}</h3>
                    </div>
                    <div>
                      <span>7%</span>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}

          {/* Repeat similar card structure for other stats */}
        </Row>
        
      </Container>
      <Footer />
    </Container>
  );
};
export default AdminPage;
