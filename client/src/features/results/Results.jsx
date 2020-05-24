import React from "react";
import { useParams } from "react-router-dom";
import { Accordion, Button, Card } from "react-bootstrap";

const Results = () => {
  const { repo_name } = useParams();
  return (
    <>
      <h1>Results: {repo_name}</h1>
      <Accordion defaultActiveKey="0">
        <Card>
          <Card.Header className="d-flex align-items-center justify-content-between">
            <Accordion.Toggle as={Button} variant="link" eventKey="0">
              <h2>Test 1</h2>
            </Accordion.Toggle>
            <div className="h2 text-success">SUCCESS</div>
          </Card.Header>
          <Accordion.Collapse eventKey="0">
            <Card.Body>SRP passes</Card.Body>
          </Accordion.Collapse>
        </Card>
        <Card>
          <Card.Header className="d-flex align-items-center justify-content-between">
            <Accordion.Toggle as={Button} variant="link" eventKey="1">
              <h2>Test 2</h2>
            </Accordion.Toggle>
            <div className="h2 text-danger">FAILED</div>
          </Card.Header>
          <Accordion.Collapse eventKey="1">
            <Card.Body>Hello! I'm another body</Card.Body>
          </Accordion.Collapse>
        </Card>
        <Card>
          <Card.Header className="d-flex align-items-center justify-content-between">
            <Accordion.Toggle as={Button} variant="link" eventKey="2">
              <h2>Test 3</h2>
            </Accordion.Toggle>
            <div className="h2 text-success">SUCCESS</div>
          </Card.Header>
          <Accordion.Collapse eventKey="2">
            <Card.Body>Hello! I'm another body</Card.Body>
          </Accordion.Collapse>
        </Card>
        <Card>
          <Card.Header className="d-flex align-items-center justify-content-between">
            <Accordion.Toggle as={Button} variant="link" eventKey="3">
              <h2>Test 4</h2>
            </Accordion.Toggle>
            <div className="h2 text-danger">FAILED</div>
          </Card.Header>
          <Accordion.Collapse eventKey="3">
            <Card.Body>Hello! I'm another body</Card.Body>
          </Accordion.Collapse>
        </Card>
        <Card>
          <Card.Header className="d-flex align-items-center justify-content-between">
            <Accordion.Toggle as={Button} variant="link" eventKey="4">
              <h2>Test 5</h2>
            </Accordion.Toggle>
            <div className="h2 text-success">SUCCESS</div>
          </Card.Header>
          <Accordion.Collapse eventKey="4">
            <Card.Body>Hello! I'm another body</Card.Body>
          </Accordion.Collapse>
        </Card>
        <Card>
          <Card.Header className="d-flex align-items-center justify-content-between">
            <Accordion.Toggle as={Button} variant="link" eventKey="5">
              <h2>Test 6</h2>
            </Accordion.Toggle>
            <div className="h2 text-danger">FAILED</div>
          </Card.Header>
          <Accordion.Collapse eventKey="5">
            <Card.Body>Hello! I'm another body</Card.Body>
          </Accordion.Collapse>
        </Card>
        <Card>
          <Card.Header className="d-flex align-items-center justify-content-between">
            <Accordion.Toggle as={Button} variant="link" eventKey="6">
              <h2>Test 7</h2>
            </Accordion.Toggle>
            <div className="h2 text-success">SUCCESS</div>
          </Card.Header>
          <Accordion.Collapse eventKey="6">
            <Card.Body>Hello! I'm another body</Card.Body>
          </Accordion.Collapse>
        </Card>
        <Card>
          <Card.Header className="d-flex align-items-center justify-content-between">
            <Accordion.Toggle as={Button} variant="link" eventKey="7">
              <h2>Test 8</h2>
            </Accordion.Toggle>
            <div className="h2 text-danger">FAILED</div>
          </Card.Header>
          <Accordion.Collapse eventKey="7">
            <Card.Body>Hello! I'm another body</Card.Body>
          </Accordion.Collapse>
        </Card>
        <Card>
          <Card.Header className="d-flex align-items-center justify-content-between">
            <Accordion.Toggle as={Button} variant="link" eventKey="8">
              <h2>Test 9</h2>
            </Accordion.Toggle>
            <div className="h2 text-success">SUCCESS</div>
          </Card.Header>
          <Accordion.Collapse eventKey="8">
            <Card.Body>Hello! I'm another body</Card.Body>
          </Accordion.Collapse>
        </Card>
        <Card>
          <Card.Header className="d-flex align-items-center justify-content-between">
            <Accordion.Toggle as={Button} variant="link" eventKey="9">
              <h2>Test 10</h2>
            </Accordion.Toggle>
            <div className="h2 text-danger">FAILED</div>
          </Card.Header>
          <Accordion.Collapse eventKey="9">
            <Card.Body>Hello! I'm another body</Card.Body>
          </Accordion.Collapse>
        </Card>
      </Accordion>
    </>
  );
};

export default Results;
