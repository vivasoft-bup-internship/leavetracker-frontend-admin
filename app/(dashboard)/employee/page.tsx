'use client'
// import node module libraries
import { Fragment, useEffect, useState } from "react";
import Link from 'next/link';
import { Container, Col, Row } from 'react-bootstrap';

// import widget/custom components
import { StatRightTopIcon } from "../../../widgets"
import { getAllStats, getLeaveRequests } from "../../../data/leave-request/data";
import ViewAllEmployee from "../../../sub-components/employee/viewall";
import { getEmployees } from "../../../data/employee/data";


const Employees = () => {
    const [employees, setEmployees] = useState([])
    const [allstats, setAllStats] = useState([])
    useEffect(() => {
        // call getEmployees function from data/leave-request/data.tsx
        getEmployees().then((employees) => {
            setEmployees(employees);
        });
        getAllStats().then((allstats) => {
            setAllStats(allstats);
        });
    }, []);
    return (
        <Fragment>
            <div className="bg-primary pt-10 pb-21"></div>
            <Container fluid className="mt-n22 px-6">
                <Row>
                    <Col lg={12} md={12} xs={12}>
                        {/* Page header */}
                        <div>
                            <div className="d-flex justify-content-between align-items-center">
                                <div className="mb-2 mb-lg-0">
                                    <h3 className="mb-0  text-white">Employees</h3>
                                </div>
                                <div>
                                    <Link href="/employee/create" className="btn btn-white">Create New Employee</Link>
                                </div>
                            </div>
                        </div>
                    </Col>
                    {allstats.map((item, index) => {
                        return (
                            <Col xl={3} lg={6} md={12} xs={12} className="mt-6" key={index}>
                                <StatRightTopIcon info={item} />
                            </Col>
                        )
                    })}
                </Row>

                {/* Active Projects  */}
                <ViewAllEmployee employees={employees} />
            </Container>
        </Fragment>
    )
}
export default Employees;
