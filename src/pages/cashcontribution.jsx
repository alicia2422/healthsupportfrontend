import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import styled from 'styled-components';
import { FaHandsHelping } from 'react-icons/fa';
import { BsPiggyBank, BsCurrencyExchange } from 'react-icons/bs';
import Header from '../components/header';
import Footer from '../components/footer';
import  {useNavigate} from "react-router-dom"
const MainWrapper = styled.div`
  padding: 60px 0;
  background-color: #f5f5f5; // Customize the background as needed
`;

const CardWrapper = styled(Card)`
  margin-bottom: 30px;
  border: none;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

const IconWrapper = styled.div`
  font-size: 36px;
  color: #1abc9c;
  margin-bottom: 15px;
`;

const ButtonWrapper = styled(Button)`
  background-color: #1abc9c;
  border: none;
  &:hover {
    background-color: blueviolet;
  }
`;

const CashContributionPage = () => {
    const navigate= useNavigate()
  return (<>
  <Header/>
    <MainWrapper>
      <Container>
        <Row>
          <Col md={6} lg={4}>
            <CardWrapper>
              <Card.Body>
                <IconWrapper>
                  <FaHandsHelping />
                </IconWrapper>
                <Card.Title>Group Contributions</Card.Title>
                <Card.Text>
                  Join hands with others to save for common goals. Perfect for communities and associations.
                </Card.Text>
                <ButtonWrapper href="/">Learn more</ButtonWrapper>
              </Card.Body>
            </CardWrapper>
          </Col>
          <Col md={6} lg={4}>
            <CardWrapper>
              <Card.Body>
                <IconWrapper>
                  <BsPiggyBank />
                </IconWrapper>
                <Card.Title>Personal Savings</Card.Title>
                <Card.Text>
                  Save towards your goals effortlessly with our personal savings plans.
                </Card.Text>
                <ButtonWrapper href="/register">Start Saving</ButtonWrapper>
              </Card.Body>
            </CardWrapper>
          </Col>
          <Col md={6} lg={4}>
            <CardWrapper>
              <Card.Body>
                <IconWrapper>
                  <BsCurrencyExchange />
                </IconWrapper>
                <Card.Title>Cash Withdrawals</Card.Title>
                <Card.Text>
                  Seamlessly withdraw your contributions when you need them.
                </Card.Text>
                <ButtonWrapper onClick={()=>{
                    const proceed=window.confirm("You must have an account to countinue, create account?")
                    if(proceed){
                        navigate("/register")
                    }
                }}>Withdraw Now</ButtonWrapper>
              </Card.Body>
            </CardWrapper>
          </Col>
        </Row>
      </Container>
    </MainWrapper>
    <Footer/>
  </>
  );
};

export default CashContributionPage;
