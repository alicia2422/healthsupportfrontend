import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import Footer from "../components/footer";

import { selectIsLogged, selectUserDetails } from "../state/slices/userSlice";
import { useSelector } from "react-redux";
import {
  Container,
  Navbar,
  Nav,
  Dropdown,
  Card,
  Row,
  Col,
  Button,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { HighLight } from "./login";
import "./styles.css";
import responsive from "../responsive";
import fetchData from "../fetchData";
import { developmentApiEntryPoint } from "./register";
import { use } from "react";
export const logOut=(nav)=>{
window.localStorage.removeItem("support_token");
nav("/")
}
const ContentCon = styled.div`
  margin-top: 100px;
  ${responsive("tablet", { margint_top: "50px" })};
`;

const Dashboard = () => {
  const navigate = useNavigate()
  const [stats,setStats]= useState({})
  console.log(stats)
  const userIsLogged= useSelector(selectIsLogged);
  const userDetails=useSelector(selectUserDetails);
  useEffect(()=>{
    const token=localStorage.getItem("support_token")
    if(!token||!userIsLogged){
      navigate("/");
    }
    else{
      fetchData(
        `${developmentApiEntryPoint}/users/getstats`,
        (data)=>{
          setStats(data.result)
        },
        (message)=>{
          console.log(message)
          alert("An error occured")
          navigate("/")
        },
        "POST",
        {},
        token

      )
    }
    
  },[])
  console.log(userDetails)
  return (
    <Container fluid>
      {/* Navbar Start */}
      <Navbar expand="lg" bg="light" fixed="top" className="px-0">
        <Container>
          <Navbar.Brand href="/" className="d-flex align-items-center">
            <h2 className="display-5  m-0">
              Health<HighLight>Support</HighLight>
            </h2>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarCollapse" />
          <Navbar.Collapse id="navbarCollapse">
            <Nav className="ms-auto">
              <Nav.Link href="/home">Home</Nav.Link>
              <Nav.Link href="/home#about">About</Nav.Link>
              <Nav.Link href="/home#services">Services</Nav.Link>
              <Dropdown>
                <Dropdown.Toggle as={Nav.Link} id="dropdown-actions">
                  Actions
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item href="/invest">Invest</Dropdown.Item>
                  <Dropdown.Item href="/withdraw">Withdraw</Dropdown.Item>
                  <Dropdown.Item onClick={()=>{logOut(navigate)}}>
                    Logout
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
              <Nav.Link href="/home#contact">Contact</Nav.Link>
            </Nav>
            <Nav className="d-none d-lg-flex ms-3">
              <Nav.Link
                href=""
                className="btn btn-light btn-sm-square rounded-circle"
              >
                <i className="fab fa-facebook-f text-primary"></i>
              </Nav.Link>
              <Nav.Link
                href=""
                className="btn btn-light btn-sm-square rounded-circle ms-2"
              >
                <i className="fab fa-twitter text-primary"></i>
              </Nav.Link>
              <Nav.Link
                href=""
                className="btn btn-light btn-sm-square rounded-circle ms-2"
              >
                <i className="fab fa-linkedin-in text-primary"></i>
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      {/* Navbar End */}

      <hr
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.4)",
          position: "relative",
          top: "100px",
        }}
      />

      {/* Account Details Section */}
      <Container className="cardContent">
        <ContentCon>
          <h2 className="text-center mb-4">Account Details</h2>
          <Row>
            {[
              {
                title: "Balance",
                id: "balance",
                value: userDetails.balance.toFixed(2),
                percentage: "45%",
              },
              {
                title: "Last Deposit",
                id: "lastDeposit",
                value: userDetails.lastDeposit||0,
                percentage: "45%",
              },
              {
                title: "Active Deposits",
                id: "activedeposit",
                value: userDetails.activeDeposit.length,
                percentage: "45%",
              },
              {
                title: "Total Earnings",
                id: "earnings",
                value: userDetails.earnings.toFixed(2),
                percentage: "55%",
              },
              {
                title: "Referral Bonus",
                id: "ref",
                value: userDetails.referrallBonus||0,
                percentage: "7%",
              },
              {
                title: "Last Withdrawal",
                id: "lastWithdrawal",
                value:userDetails.lastWithdrawal||0 ,
                percentage: "7%",
              },
              {
                title: "Pending Withdrawal",
                id: "pendingWithdrawal",
                value: userDetails.pendingWithdrawal||0,
                percentage: "7%",
              },
            ].map((card, index) => (
              <Col xl={4} key={index} className="mb-4">
                <Card className="card-default">
                  <Card.Header>
                    <h2>{card.title}</h2>
                  </Card.Header>
                  <Card.Body>
                    <div className="bg-primary d-flex justify-content-between flex-wrap p-5 text-white align-items-lg-end">
                      <div className="d-flex flex-column">
                        <span className="h3 text-white" id={card.id}>
                          {card.title==="Active Deposits"?card.value:`$${card.value}`}
                        </span>
                      </div>
                      <div>
                        <span>{card.percentage}</span>
                        <i className="mdi mdi-arrow-up-bold"></i>
                      </div>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </ContentCon>
      </Container>

      {/* Total Stats Section */}
      <Container className="cardContent cardContent2">
        <h2 className="text-center mb-4">Total Stats</h2>
        <Row>
          {[
            {
              title: "Total Deposits",
              id: "totalDeposit",
              value: stats.totalDeposit||0,
              color: "bg-success",
            },
            {
              title: "Total Withdrawals",
              id: "totalWithdrawal",
              value: stats.totalWithrawal||0,
              color: "bg-success",
            },
          ].map((card, index) => (
            <Col xl={4} key={index} className="mb-4">
              <Card className="card-default">
                <Card.Header>
                  <h2 className="text-center">{card.title}</h2>
                </Card.Header>
                <Card.Body>
                  <div
                    className={`${card.color} d-flex justify-content-between flex-wrap p-5 text-white align-items-lg-end`}
                  >
                    <div className="d-flex flex-column">
                      <span className="h3 text-white" id={card.id}>
                        ${card.value}
                      </span>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
      <Footer style={{ width: "100vw" }} />
    </Container>
  );
};

export default Dashboard;
