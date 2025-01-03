import React from "react";
import { Container, Row, Col, Card, ListGroup } from "react-bootstrap";

// The AboutPage component is a functional component that displays information
// about the "MyFresh" platform. It is purely presentational and does not interact
// with Redux state, local state, or any external APIs.

function AboutPage() {
  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        {/* Center the content on the page */}
        <Col xs={12} md={10}>
          <Card className="shadow-lg p-4">
            <Card.Body>
              {/* Main heading for the page */}
              <h1 className="mb-4">About MyFresh</h1>
              {/* Paragraph describing the MyFresh platform */}
              <p>
                Welcome to MyFresh, your go-to online marketplace for the
                freshest and healthiest organic produce in Fargo, North Dakota.
                We are passionate about connecting local farmers with
                health-conscious consumers, ensuring you have access to
                high-quality fruits and vegetables grown sustainably and
                responsibly.
              </p>
              <p>
                MyFresh was created with a simple mission: to support local
                agriculture while making fresh, organic produce easily
                accessible to everyone. Our platform empowers local farmers to
                sell their products directly to you, without the middleman. This
                not only ensures freshness but also helps farmers receive a fair
                price for their hard work.
              </p>

              {/* Subsection highlighting the platform's benefits */}
              <h3 className="mt-4">Why Choose MyFresh?</h3>
              <ListGroup className="mb-4">
                {/* Each item highlights a unique benefit of the platform */}
                <ListGroup.Item>
                  <h4>Farm-to-Table:</h4> We prioritize freshness by partnering
                  directly with local farmers, meaning your produce is harvested
                  and delivered quickly.
                </ListGroup.Item>
                <ListGroup.Item>
                  <h4>Sustainability:</h4> Our commitment to the environment is
                  reflected in how we source, package, and deliver every order,
                  minimizing waste and promoting eco-friendly practices.
                </ListGroup.Item>
                <ListGroup.Item>
                  <h4>Community-Driven:</h4> By shopping with MyFresh, you
                  support local farmers and contribute to a healthier community.
                </ListGroup.Item>
                <ListGroup.Item>
                  <h4>Convenience:</h4> With our easy-to-use platform, you can
                  browse, order, and have your fresh produce delivered right to
                  your door.
                </ListGroup.Item>
              </ListGroup>

              {/* Section introducing the founder */}
              <h3>Meet Our Founder: Papa Dienou Faye</h3>
              <p>
                Dienou Faye, the founder of MyFresh, has a passion for both
                technology and healthy living. With over a decade of experience
                in business development and digital marketing, Papa combined his
                skills to create a platform that brings people and their food
                sources closer together. Based in Fargo, Papa is committed to
                fostering local agriculture and building a healthier future, one
                fresh product at a time.
              </p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default AboutPage;

// Comments Summary:
// - The component uses Bootstrap for layout and styling.
// - It includes static content about the MyFresh platform, its mission, and its founder.
// - The design emphasizes readability and a clean layout using React-Bootstrap components.
// - No dynamic content or interactions are present, making it a purely presentational component.
