// Import necessary libraries and components
import React from "react";
import styled from "styled-components";
import { Container, Row, Col, Card, Button, Image } from "react-bootstrap";
import "bootstrap-icons/font/bootstrap-icons.css";
import Header from "../components/header"; // Replace with your reusable Header component
import Footer from "../components/footer"; // Replace with your reusable Footer component
import doctorImg from "../assets/doctors/doctor_2.jpg";
// Styled Components
const PageWrapper = styled.div`
  background-color: #1c1c1c; // Background color from your palette
  color: #ecf0f1; // Text color from your palette
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const HeroSection = styled.div`
  text-align: center;
  padding: 50px 20px;
  background-color: #2c3e50; // Secondary color
  color: #ecf0f1;
  display: flex;
  flex-direction: column;
  align-items: center;

  h1 {
    font-size: 3rem;
    font-weight: bold;
    margin-bottom: 20px;
    color: #1abc9c; // Primary color
  }

  p {
    font-size: 1.2rem;
    max-width: 600px;
  }

  img {
    margin-top: 30px;
    max-width: 100%;
    height: auto;
  }
`;

const SectionTitle = styled.h2`
  font-size: 2.5rem;
  margin-bottom: 30px;
  color: #1abc9c; // Primary color
  text-align: center;
`;

const GrantCard = styled(Card)`
  background-color: #1abc9c;
  border: none;
  color: #ecf0f1;
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-10px);
  }

  .card-title {
    font-size: 1.5rem;
    font-weight: bold;
  }

  .card-text {
    color: #1c1c1c; // Darker text color for contrast
  }

  .btn {
    background-color: #16a085; // Highlight color
    border: none;

    &:hover {
      background-color: #1abc9c;
    }
  }
`;

const GrantsSection = styled.div`
  padding: 40px 20px;
  flex-grow: 1;
  background-color: #1c1c1c;
`;

const TestimonialsSection = styled.div`
  padding: 50px 20px;
  background-color: #2c3e50;
  color: #ecf0f1;
`;

const TestimonialCard = styled(Card)`
  background-color: #1abc9c;
  border: none;
  color: #ecf0f1;
  margin-bottom: 20px;
  text-align: center;

  .card-body {
    font-style: italic;
  }

  .card-footer {
    font-weight: bold;
  }
`;

const FaqSection = styled.div`
  padding: 50px 20px;
  background-color: #1c1c1c;
  color: #ecf0f1;
`;

const FaqItem = styled.div`
  margin-bottom: 20px;

  h5 {
    font-size: 1.2rem;
    margin-bottom: 10px;
    color: #1abc9c;
  }

  p {
    font-size: 1rem;
    color: #ecf0f1;
  }
`;

const CovidGrantsPage = () => {
  return (
    <PageWrapper>
      <Header />

      <HeroSection>
        <h1>COVID-19 Grants</h1>
        <p>
          Providing financial assistance to those impacted by the pandemic.
          Discover opportunities to secure funding for healthcare, businesses,
          education, and more.
        </p>
        <Image src={doctorImg} alt="COVID-19 Assistance" />
      </HeroSection>

      <GrantsSection>
        <Container>
          <SectionTitle>Available Grants</SectionTitle>
          <Row>
            <Col md={4} className="mb-4">
              <GrantCard>
                <Card.Body>
                  <Card.Title>Healthcare Support</Card.Title>
                  <Card.Text>
                    Assistance for medical bills and healthcare expenses.
                  </Card.Text>
                  <Button href="/register" variant="primary">
                    <i className="bi bi-arrow-right-circle"></i> Apply Now
                  </Button>
                </Card.Body>
              </GrantCard>
            </Col>
            <Col md={4} className="mb-4">
              <GrantCard>
                <Card.Body>
                  <Card.Title>Small Business Relief</Card.Title>
                  <Card.Text>
                    Financial support for small businesses affected by COVID-19.
                  </Card.Text>
                  <Button href="/register" variant="primary">
                    <i className="bi bi-arrow-right-circle"></i> Apply Now
                  </Button>
                </Card.Body>
              </GrantCard>
            </Col>
            <Col md={4} className="mb-4">
              <GrantCard>
                <Card.Body>
                  <Card.Title>Educational Aid</Card.Title>
                  <Card.Text>
                    Grants for students to support online learning.
                  </Card.Text>
                  <Button href="/register" variant="primary">
                    <i className="bi bi-arrow-right-circle"></i> Apply Now
                  </Button>
                </Card.Body>
              </GrantCard>
            </Col>
          </Row>
        </Container>
      </GrantsSection>

      <TestimonialsSection>
        <Container>
          <SectionTitle>Testimonials</SectionTitle>
          <Row>
            <Col md={6}>
              <TestimonialCard>
                <Card.Body>
                  "The grant helped me pay my medical bills and recover from
                  COVID-19. I'm forever grateful."
                </Card.Body>
                <Card.Footer>- John Doe</Card.Footer>
              </TestimonialCard>
            </Col>
            <Col md={6}>
              <TestimonialCard>
                <Card.Body>
                  "My small business survived the pandemic thanks to the relief
                  fund. Highly recommend applying."
                </Card.Body>
                <Card.Footer>- Jane Smith</Card.Footer>
              </TestimonialCard>
            </Col>
          </Row>
        </Container>
      </TestimonialsSection>

      <FaqSection>
        <Container>
          <SectionTitle>Frequently Asked Questions</SectionTitle>
          <FaqItem>
            <h5>Who is eligible for the grants?</h5>
            <p>
              Anyone impacted by COVID-19, including individuals and small
              businesses, may apply.
            </p>
          </FaqItem>
          <FaqItem>
            <h5>How do I apply for a grant?</h5>
            <p>
              Click on the "Apply Now" button under the respective grant
              category and fill out the application form.
            </p>
          </FaqItem>
          <FaqItem>
            <h5>What is the processing time for applications?</h5>
            <p>
              Applications are typically processed within 2-4 weeks, depending
              on the volume received.
            </p>
          </FaqItem>
        </Container>
      </FaqSection>

      <Footer />
    </PageWrapper>
  );
};

export default CovidGrantsPage;
