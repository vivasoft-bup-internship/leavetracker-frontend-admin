'use client'
// import node module libraries
import { Container } from 'react-bootstrap';

// import widget as custom components
import { PageHeading } from '../../../../widgets'

import { useState, useEffect } from 'react';
import { getLeaveTypes } from '../../../../data/leave-request/data';

// import sub components
import { DeleteAccount, CreateLeaveRequest } from '../../../../sub-components'
import React from 'react';
import { Employee, LeaveTypeField } from '../../../../data/Definition';
import { getEmployees } from '../../../../data/employee/data';
import { useSession } from 'next-auth/react';

const Page = () => {
  const { data: session, status } = useSession();
  const [employee, setEmployee] = useState([])
  const [leaveType, setLeaveTypes] = useState([])
  useEffect(() => {
    if (status === 'authenticated') {
      // call getEmployees function from data/leave-request/data.tsx
      getEmployees().then((employees) => {
        setEmployee(employees);
      });
      getLeaveTypes().then((leaveTypes) => {
        setLeaveTypes(leaveTypes);
      });
    }
  }, [status]);

  if (status === 'loading') {
    return <div>Loading...</div>;
  }
  // bind the employee in the Employee object
  // const employees: Employee[] = employee;
  // const leaveTypes: LeaveTypeField[] = leaveType;
  return (
    <Container fluid className="p-6">

      {/* Page Heading */}
      <PageHeading heading="Leave Request" />

      <CreateLeaveRequest employee={employee} leaveTypes={leaveType} />

    </Container>
  )
}

export default Page