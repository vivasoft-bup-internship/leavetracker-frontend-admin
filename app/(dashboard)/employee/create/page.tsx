'use client'
// import node module libraries
import { Container } from 'react-bootstrap';

// import widget as custom components
import { PageHeading } from '../../../../widgets'

import { useState, useEffect } from 'react';
import { getLeaveTypes } from '../../../../data/leave-request/data';

// import sub components
import React from 'react';
import { getManagers, getRoles } from '../../../../data/employee/data';
import CreateEmployee from '../../../../sub-components/employee/create';

const Page = () => {
  const [managers, setManagers] = useState([])
  const [roles, setRoles] = useState([])
  useEffect(() => {
    // call getEmployees function from data/leave-request/data.tsx
    getRoles().then((roles) => {
      setRoles(roles);
    });
    getManagers().then((managers) => {
      setManagers(managers);
    });
  }, []);
  // bind the employee in the Employee object
  // const employees: Employee[] = employee;
  // const leaveTypes: LeaveTypeField[] = leaveType;
  return (
    <Container fluid className="p-6">

      {/* Page Heading */}
      <PageHeading heading="Employees" />

      <CreateEmployee managers={managers} roles={roles} />

    </Container>
  )
}

export default Page