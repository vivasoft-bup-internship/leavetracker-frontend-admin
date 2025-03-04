// import node module libraries
import { Col, Row, Form, Card, Button, Image } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
// import widget as custom components
import { FormSelect, DropFiles } from '../../widgets';

// import hooks
import useMounted from '../../hooks/useMounted';
import { EmployeeResponse } from '../../data/Definition';
import { use, useEffect, useState } from 'react';
import { updateProfilePicture, updateEmployee } from '../../actions/employee/action';
import { savePhoto } from '../../actions/employee/action';


const ProfileSettings = ({ employee }) => {
  const hasMounted = useMounted();
  const employeeResponse: EmployeeResponse = employee as EmployeeResponse;
  const countryOptions = [
    { value: 'India', label: 'India' },
    { value: 'US', label: 'US' },
    { value: 'UK', label: 'UK' },
    { value: 'UAE', label: 'UAE' }
  ];
  const handleProfilePhotoChange = async (e: FormData) => {
    savePhoto(employeeResponse.employeeid.toString(), e);
    window.location.reload();
  }

  const handleUpdateEmployee = async (e: FormData) => {
    updateEmployee(employeeResponse.employeeid.toString(), e);
    window.location.reload();
  }

  return (
    <Row className="mb-8">
      <Col xl={3} lg={4} md={12} xs={12}>
        <div className="mb-4 mb-lg-0">
          <h4 className="mb-1">Profile Setting</h4>
          <p className="mb-0 fs-5 text-muted">Profile configuration settings </p>
        </div>
      </Col>
      <Col xl={9} lg={8} md={12} xs={12}>
        <Card>
          {/* card body */}
          <Card.Body>
            <div className=" mb-6">
              <h4 className="mb-1">General Settings</h4>
            </div>
            <Row className="align-items-center mb-8">
              <Col md={3} className="mb-3 mb-md-0">
                <h5 className="mb-0">Profile Photo</h5>
              </Col>
              <Col md={9}>
                <div className="d-flex align-items-center">
                  <div className="me-3">
                    <Image src={employeeResponse.profilephoto} className="rounded-circle avatar avatar-lg" alt="" />
                  </div>
                  <div>
                    <Form action={handleProfilePhotoChange}>
                      <Form.Control type="file" id="profilePhotoInput" name='profilePhoto'/>
                      <Button variant="outline-white" type="submit">Change</Button>
                    </Form>
                    {/* <Button variant="outline-white" className="me-2" onClick={() => document.getElementById('profilePhotoInput').click()}>Change </Button> */}
                    <Button variant="outline-white" type="submit">Remove </Button>
                  </div>
                </div>
              </Col>
            </Row>
            {/* col */}
            <Row className="mb-8">
              <Col md={3} className="mb-3 mb-md-0">
                {/* heading */}
                <h5 className="mb-0">Cover photo</h5>
              </Col>
              <Col md={9}>
                {/* dropzone input */}
                <div>
                  {hasMounted && <Form action="#" className="dropzone mb-3 py-10 border-dashed">
                    <DropFiles />
                  </Form>}
                  <Button variant="outline-white" type="submit">Change </Button>
                </div>
              </Col>
            </Row>
            <div>
              <div className="mb-6">
                <h4 className="mb-1">Basic information</h4>
              </div>
              {hasMounted &&
                <Form action={handleUpdateEmployee}>
                  <Row className="mb-3">
                    <Form.Label className="col-sm-4 col-form-label form-label" htmlFor="fullName">Full name</Form.Label>
                    <Col sm={8} className="mb-3 mb-lg-0">
                      <Form.Control type="text" placeholder="Full name" defaultValue={employeeResponse.name} id="name" name='name' required />
                    </Col>
                  </Row>
                  {/* row */}
                  <Row className="mb-3">
                    <Form.Label className="col-sm-4 col-form-label form-label" htmlFor="email">Email</Form.Label>
                    <Col md={8} xs={12}>
                      <Form.Control type="email" placeholder="Email" defaultValue={employeeResponse.email} id="email" name='email' required />
                    </Col>
                  </Row>
                  {/* row */}
                  <Row className="mb-3">
                    <Form.Label className="col-sm-4" htmlFor="phone">Phone <span className="text-muted">(Optional)</span></Form.Label>
                    <Col md={8} xs={12}>
                      <Form.Control type="text" defaultValue={employeeResponse.phone} placeholder="Enter Phone" id="phone" name='phone' />
                    </Col>
                  </Row>

                  <Row className="mb-3">
                    <Form.Label className="col-sm-4" htmlFor="bio">Bio</Form.Label>
                    <Col md={8} xs={12}>
                      <Form.Control type="text" defaultValue={employeeResponse.bio} placeholder="Enter Bio" id="bio" name='bio' required />
                    </Col>
                  </Row>

                  {/* Address Line One */}
                  <Row className="mb-3">
                    <Form.Label className="col-sm-4" htmlFor="address">Address</Form.Label>
                    <Col md={8} xs={12}>
                      <Form.Control type="text" defaultValue={employeeResponse.address} placeholder="Enter Address" id="address" name='address' required />
                    </Col>
                  </Row>

                  <Row className="mb-3">
                    <Form.Label className="col-sm-4" htmlFor="dob">Date Of Birth</Form.Label>
                    <Col md={8} xs={12}>
                      <Form.Control type="date" defaultValue={employeeResponse.dob} id="dob" name='dob' required />
                    </Col>
                  </Row>


                  {/* Zip code */}
                  <Row className="align-items-center">
                    <Col md={{ offset: 4, span: 8 }} xs={12} className="mt-4">
                      <Button variant="primary" type="submit">
                        Save Changes
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

export default ProfileSettings
function dispatch(arg0: Promise<void>) {
  throw new Error('Function not implemented.');
}
