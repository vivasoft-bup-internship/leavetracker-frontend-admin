"use client";
// import node module libraries
import { Col, Row, Form, Card, Button, Image } from 'react-bootstrap';

// import widget as custom components
import { FormSelect, DropFiles } from '../../widgets';

// import hooks
import useMounted from '../../hooks/useMounted';
import React from 'react';
import { Employee, LeaveTypeField } from '../../data/Definition';
import { createLeaveRequest } from '../../actions/leave-request/action';
import { useSession } from 'next-auth/react';

const CreateLeaveRequest = ({ employee, leaveTypes }) => {
  const { data: session } = useSession();
  console.log(session);
  const hasMounted = useMounted();
  const employeeOptions = employee.map((emp: Employee) => ({
    value: emp.employeeid,
    label: emp.name,
  }));

  const leaveTypeOptions = leaveTypes.map((leaveType: LeaveTypeField) => ({
    value: leaveType.leavetypeid,
    label: leaveType.name,
  }));

  return (
    <Row className="mb-8">
      <Col xl={3} lg={4} md={12} xs={12}>
        <div className="mb-4 mb-lg-0">
          <h4 className="mb-1">Create Leave Request</h4>
          <p className="mb-0 fs-5 text-muted">Submit a new leave request </p>
        </div>
      </Col>
      <Col xl={9} lg={8} md={12} xs={12}>
        <Card>
          {/* card body */}
          <Card.Body>
            {/* col */}
            <div>
              <div className="mb-6">
                <h4 className="mb-1">Leave Request information</h4>
              </div>
              {hasMounted &&
                <Form action={createLeaveRequest}>
                  {/* EMployee name */}
                  <Row className="mb-3">
                    {session.is_admin ? (
                      <Form.Label className="col-sm-4" htmlFor="employee">Employee Name</Form.Label>
                    ) : (
                      <Form.Label className="col-sm-4" htmlFor="employee">Employee ID</Form.Label>
                    )
                    }

                    <Col md={8} xs={12}>
                      {session.is_admin ? (
                        <Form.Select as={FormSelect} placeholder="Select Employee" id="employee" name='employeeid'>
                          {employeeOptions.map((option, index) => (
                            <option key={index} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </Form.Select>
                      ) : (
                        <Form.Control type="text" id="employee" name='employeeid' value={session.employeeid} readOnly />
                      )}
                    </Col>
                  </Row>
                  {/* Leave Type */}
                  <Row className="mb-3">
                    <Form.Label className="col-sm-4" htmlFor="leavetype">Leave Type</Form.Label>
                    <Col md={8} xs={12}>
                      <Form.Select as={FormSelect} placeholder="Select Leave Type" id="leavetype" name='leavetype'>
                        {leaveTypeOptions.map((option, index) => (
                          <option key={index} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </Form.Select>
                    </Col>
                  </Row>


                  <Row className="mb-3">
                    <Form.Label className="col-sm-4 col-form-label form-label" htmlFor="startdate">Start Date</Form.Label>
                    <Col sm={4} className="mb-3 mb-lg-0">
                      <Form.Control type="date" id="startdate" name='startdate' required />
                    </Col>
                  </Row>

                  <Row className="mb-3">
                    <Form.Label className="col-sm-4 col-form-label form-label" htmlFor="enddate">End Date</Form.Label>
                    <Col sm={4} className="mb-3 mb-lg-0">
                      <Form.Control type="date" id="enddate" name='enddate' required />
                    </Col>
                  </Row>


                  {/* Zip code */}
                  <Row className="align-items-center">

                    <Col md={{ offset: 4, span: 8 }} xs={12} className="mt-4">
                      <Button variant="primary" type="submit">
                        Submit Request
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

export default CreateLeaveRequest;