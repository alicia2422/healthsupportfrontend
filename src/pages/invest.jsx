import React, { useEffect, useState } from "react";
import {
  Navbar,
  Nav,
  NavDropdown,
  Container,
  Button,
  Row,
  Col,
  Card,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./styles.css";
import styled from "styled-components";
import usdt from "../assets/coin-icons/usdt.svg";
import btc from "../assets/coin-icons/btc.png";
import eth from "../assets/coin-icons/ethereum.png";
import doge from "../assets/coin-icons/dogecoin.svg";
import Footer from "../components/footer";
import { HighLight } from "./login";
import fetchData from "../fetchData";
import ErrorModal from "../components/errorsModal";
import { developmentApiEntryPoint } from "./register";
import { useNavigate } from "react-router-dom";
import ButtonSpinner from "../components/buttonspinner";
const coins = [usdt, eth, btc, doge];
const CoinsCon = styled.div`
  width: 80vw;
  margin: 20px auto;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
`;
const CoinImg = styled.div`
  border: ${(props) => (props.active ? "1px solid blue" : "none")};
  width: 70px;
  object-fit: cover;
  border-radius: 50%;
`;
const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;
const Input = styled.input`
  width: 300px;
  height: 35px;
  display: block;
  margin: 20px auto;
`;
const PlansAndCoins = () => {
  const token=localStorage.getItem("support_token")
  const navigate= useNavigate()

  const [currentPlan, setCurrentPlan] = useState({});
  const [currentCoin, setCurrentCoin] = useState("");
  const [fetchedCoins,setFetchedCoins]= useState([])
  const [inputErrors, setInputErrors]= useState([])
  const [loading,setLoading]= useState(false)
  const plansMatch = (a, b) => JSON.stringify(a) === JSON.stringify(b);
  const [explanation, setExplanation] = useState("");
  const [invalidAmount, setInvalidamount] = useState(false);
  const [currentAmount, setCurrentAmount]=useState(0)
  console.log(fetchedCoins)
  useEffect(()=>{
    if(!token){
      navigate("/")
    }else{
      fetchData(
        `${developmentApiEntryPoint}/users/getcoins`,
        (data)=>{
          setFetchedCoins(data.result)
          
        },(message)=>{
          alert(message)
          navigate("/")
        }
      )
    }
  },[])
  const invest=()=>{
    const errors=[]
    if(!currentCoin){
      errors.push('Please select a coin copy the address by clicking the "Copy Wallet ID" button,  make payment to the address and click Invest')
    }
    if(!currentPlan){
      errors.push("Please select a plan  to continue")

    }
    if(invalidAmount){
      errors.push(`Amount Selected is too ${explanation} for the selected plan`)
    }
    if(!currentAmount){
      errors.push("Please input an amunt to continue")
    }
    setInputErrors(errors)
    if(errors.length===0){
      setLoading(true)
      fetchData(
        `${developmentApiEntryPoint}/requests/invest`,
        (data)=>{
          alert("Request sent successfully")
          navigate("/")
        },
        (message)=>{
          alert("an error occured while trying to process request")
          navigate("/invest")
        },
        "POST",
        {plan:currentPlan.id, coin:currentCoin.name, amount:currentAmount},
        token

      )
    }
  }


  const plans=[
    {
      id: "starter",
      title: "Starter Plan",
      roi: 15,
      min: 50,
      max: 499,
      duration: 24,
      reinvestment: "Reinvestment Not Supported",
    },
    {
      id: "premium",
      title: "Premium Plan",
      roi: 40,
      min: 1000,
      max: 4999,
      duration: 48,
      reinvestment: "Reinvestment Supported",
    },
    {
      id: "ultimate",
      title: "Ultimate Plan",
      roi: 65,
      min: 10000,
      max: 49999,
      duration: 72,
      reinvestment: "Reinvestment Supported",
    },
    {
      id: "standard",
      title: "Standard Plan",
      roi: 25,
      min: 500,
      max: 999,
      duration: 48,
      reinvestment: "Reinvestment Supported",
    },
    {
      id: "exclusive",
      title: "Exclusive Plan",
      roi: 50,
      min: 5000,
      max: 9999,
      duration: 72,
      reinvestment: "Reinvestment Supported",
    },
    {
      id: "corporate",
      title: "Corporate Plan",
      roi: 80,
      min: 50000,
      max: "Unlimited USD",
      duration: 72,
      reinvestment: "Reinvestment Supported",
    },
  ]

  const coins=[
    {
      id: "btcadd",
      img: btc,
      name: "bitcoin",
      address: fetchedCoins.bitcoin||"loading ...",
    },
    {
      id: "USDTadd",
      img: usdt,
      name: "usdt",
      address: fetchedCoins.usdt||"loading ...",
    },
    {
      id: "ethereumadd",
      img: eth,
      name: "ethereum",
      address: fetchedCoins.bitcoin||"loading ...",
    },
  ]

  return (
    <div>
      {/* Navbar Start */}
      <div className="bg-white fixed-top">
        <div className="d-none d-lg-flex justify-content-between align-items-center px-5 py-2">
          <small>
            <i className="fa fa-map-marker-alt text-primary me-2" />
            123 Street, New York, USA
          </small>
          <small>
            <i className="fa fa-clock text-primary me-2" />
            9.00 am - 9.00 pm
          </small>
          <small>
            <i className="fa fa-envelope text-primary me-2" />
            info@Healthsupport.com
          </small>
        </div>
        <Navbar expand="lg" className="px-5">
          <Navbar.Brand href="/home">
            <h2 className="d-inline ">
              Health<HighLight>Support</HighLight>
            </h2>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbar-collapse" />
          <Navbar.Collapse id="navbar-collapse">
            <Nav className="ms-auto">
              <Nav.Link href="/home">Home</Nav.Link>
              <Nav.Link href="/home#about">About</Nav.Link>
              <Nav.Link href="/home#services">Services</Nav.Link>
              <NavDropdown title="Actions">
                <NavDropdown.Item href="/invest">Invest</NavDropdown.Item>
                <NavDropdown.Item href="/withdraw">Withdraw</NavDropdown.Item>
                <NavDropdown.Item>
                  <Button
                    variant="primary"
                    onClick={() => console.log("Logout")}
                  >
                    Logout
                  </Button>
                </NavDropdown.Item>
              </NavDropdown>
              <Nav.Link href="/home#contact">Contact</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
      <ErrorModal errors={inputErrors}/>
      {/* Navbar End */}

      {/* Plans Start */}
      <Container className="text-center  my-5" style={{ marginTop: "60px" }}>
        <h1 className="mb-5">Select Plan</h1>
        <Row className="gy-4">
          {plans.map((plan) => (
            <Col
              onClick={() => {
                setCurrentPlan(plan);
              }}
              key={plan.id}
              md={4}
            >
              <Card
                className="h-100"
                style={{
                  border: plansMatch(plan, currentPlan)
                    ? "3px solid green"
                    : "1px solid rgb(0,0,0,0.1)",
                }}
              >
                <Card.Body>
                  <Card.Title className="text-white bg-dark py-2">
                    {plan.title}
                  </Card.Title>
                  <Card.Text className="mb-2">{plan.roi}% ROI</Card.Text>
                  <Card.Text className="mb-2">
                    Min Deposit: {plan.min} USD
                  </Card.Text>
                  <Card.Text className="mb-2">
                    Max Deposit: {plan.max} USD
                  </Card.Text>
                  <Card.Text className="mb-2">
                    {plan.duration} hrs plan
                  </Card.Text>
                  <Card.Text className="mb-2">{plan.reinvestment}</Card.Text>
                  <Button variant="primary">Invest Now</Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
      {/* Plans End */}
      <CoinsCon>
        {coins.map((coin) => {
          return <CoinImg src={coin} />;
        })}
      </CoinsCon>
      {/* Coins Select Start */}
      <Container className="text-center my-5">
        <h1>Select Coin</h1>
        <Row className="gy-4 justify-content-center">
          {coins.map((coin) => (
            <Col
              onClick={() => {
                setCurrentCoin(coin);
              }}
              key={coin.id}
              md={4}
              className="text-center"
            >
              <img
                width={100}
                src={coin.img}
                alt={coin.name}
                className="selected-coin-img"
                style={{
                  border: plansMatch(coin, currentCoin)
                    ? "2px solid blue"
                    : "none",
                  borderRadius: "50%",
                  objectFit: "cover",
                }}
              />
            </Col>
          ))}
        </Row>
        <Row className="my-5">
          <h4>
            {currentCoin.name} Wallet Address:{" "}
            <br/>
            <span>{currentCoin.address}</span>
          </h4>
          <Button
            variant="primary"
            style={{ width: "200px", margin: "20px auto" }}
            onClick={() => navigator.clipboard.writeText(currentCoin.address)}
          >
            Copy Wallet ID
          </Button>
        </Row>
        <InputContainer>
          <h2>Amount</h2>
          <Input
            type="number"
            placeholder="input amount to invest"
            onChange={(e) => {
              const inputAmount = e.target.value;
               setCurrentAmount(e.target.value)
              setInvalidamount(
                !currentPlan.min ||
                  inputAmount < currentPlan.min ||
                  inputAmount > currentPlan.max
              );
              setExplanation(
                !currentPlan.min
                  ? "none"
                  : inputAmount > currentPlan.max
                  ? "high"
                  : "low"
              );
            }}
          />
          {invalidAmount && (
            <p className="text-danger" style={{ fontWeight: "bold" }}>
              {explanation === "none"
                ? "Please select a plan to continue"
                : `Amount is too ${explanation} for selected plan`}
            </p>
          )}
          <Button
            style={{ width: "250px", margin: "20px auto", display: "block" }}
            disabled={invalidAmount||loading}
            variant="primary"
            onClick={invest}

          >
            Invest {loading&&<ButtonSpinner/>}
          </Button>
        </InputContainer>
      </Container>
      {/* Coins Select End */}
      <Footer />
    </div>
  );
};

export default PlansAndCoins;
