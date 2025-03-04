'use client'
// import node module libraries
import { Fragment, useEffect, useState } from "react";
import Link from 'next/link';
import { Container, Col, Row } from 'react-bootstrap';
import { useSession } from "next-auth/react";

// import widget/custom components
import { StatRightTopIcon } from "../../../widgets"
import { getAllStats, getAllStatsByEmployeeID, getLeaveRequests, getLRByEmployeeID } from "../../../data/leave-request/data";

// import sub components
import {
    ActiveProjects, Teams,
    TasksPerformance
} from "../../../sub-components";

// import required data files
import ProjectsStatsData from "../../../data/dashboard/ProjectsStatsData";
import ViewAllLR from "../../../sub-components/leave-request/viewall";

const LeaveRequests = () => {
    const { data: session, status } = useSession();
    const [leaverequests, setLeaveRequests] = useState([])
    const [allstats, setAllStats] = useState([])
    useEffect(() => {
        if (status === 'authenticated') {
            // call getEmployees function from data/leave-request/data.tsx
            if (session.is_admin === true) {
                getLeaveRequests().then((leaverequests) => {
                    setLeaveRequests(leaverequests);
                });
                getAllStats().then((allstats) => {
                    setAllStats(allstats);
                });
            }

            if (session.is_admin === false) {
                getLRByEmployeeID(session.employeeid.toString()).then((leaverequests) => {
                    setLeaveRequests(leaverequests);
                });
                getAllStatsByEmployeeID(session.employeeid.toString()).then((allstats) => {
                    setAllStats(allstats);
                });
            }
        }
    }, [status]);
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
                                    <h3 className="mb-0  text-white">Leave Requests</h3>
                                </div>
                                <div>
                                    <Link href="/leave-request/create" className="btn btn-white">Create New Leave Request</Link>
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
                <ViewAllLR leaveRequests={leaverequests} />
            </Container>
        </Fragment>
    )
}
export default LeaveRequests;
