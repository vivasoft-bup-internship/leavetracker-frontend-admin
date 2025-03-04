"use client";
// import node module libraries
import { Col, Row, Form, Card, Button, Image } from 'react-bootstrap';

// import widget as custom components
import { FormSelect, DropFiles } from '../../widgets';

// import hooks
import useMounted from '../../hooks/useMounted';
import React from 'react';
import { useRouter } from 'next/navigation';
import { Employee, Roles } from '../../data/Definition';
import { createEmployee } from '../../actions/employee/action';

const CreateEmployee = ({ managers, roles }) => {
  const hasMounted = useMounted();
  console.log(managers);
  const managerOptions = managers.map((mang: Employee) => ({
    value: mang.employeeid,
    label: mang.name,
  }));

  const roleOptions = roles.map((role: Roles) => ({
    value: role.roleid,
    label: role.name,
  }));

  return (
    <Row className="mb-8">
      <Col xl={3} lg={4} md={12} xs={12}>
        <div className="mb-4 mb-lg-0">
          <h4 className="mb-1">Create Employee</h4>
          <p className="mb-0 fs-5 text-muted">Create a new employee profile </p>
        </div>
      </Col>
      <Col xl={9} lg={8} md={12} xs={12}>
        <Card>
          {/* card body */}
          <Card.Body>
            {/* col */}
            <div>
              <div className="mb-6">
                <h4 className="mb-1">Employee information</h4>
              </div>
              {hasMounted &&
                <Form action={createEmployee}>
                  {/* EMployee name */}
                  <Row className="mb-3">
                    <Form.Label className="col-sm-4" htmlFor="name">Full Name</Form.Label>
                    <Col md={8} xs={12}>
                      <Form.Control type="text" placeholder="Enter Full Name" id="name" name='name' required />
                    </Col>
                  </Row>
                  {/* Username */}
                  <Row className="mb-3">
                    <Form.Label className="col-sm-4" htmlFor="username">Username</Form.Label>
                    <Col md={8} xs={12}>
                      <Form.Control type="text" placeholder="Enter Username" id="username" name='username' required />
                    </Col>
                  </Row>
                  {/* ManagerId */}
                  <Row className="mb-3">
                    <Form.Label className="col-sm-4" htmlFor="managerid">Manager Name</Form.Label>
                    <Col md={8} xs={12}>
                      <Form.Select as={FormSelect} placeholder="Select Manager" id="managerid" name='managerid'>
                        {managerOptions.map((option, index) => (
                          <option key={index} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </Form.Select>
                    </Col>
                  </Row>
                  {/* Role Type */}
                  <Row className="mb-3">
                    <Form.Label className="col-sm-4" htmlFor="roleid">Role</Form.Label>
                    <Col md={8} xs={12}>
                      <Form.Select as={FormSelect} placeholder="Select Role" id="roleid" name='roleid'>
                        {roleOptions.map((option, index) => (
                          <option key={index} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </Form.Select>
                    </Col>
                  </Row>


                  <Row className="mb-3">
                    <Form.Label className="col-sm-4" htmlFor="password">Password</Form.Label>
                    <Col md={8} xs={12}>
                      <Form.Control type="password" placeholder="Enter Password" id="password" name='password' required />
                    </Col>
                  </Row>

                  <Row className="align-items-center">

                    <Col md={{ offset: 4, span: 8 }} xs={12} className="mt-4">
                      <Button variant="primary" type="submit">
                        Create Profile
                      </Button>
                    </Col>
                  </Row>
                </Form>
              }
            </div>
          </Card.Body>
        </Card>

      </Col>
    </Row>
  )
}

export default CreateEmployee;