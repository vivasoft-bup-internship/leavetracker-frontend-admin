"use client";
// import node module libraries
import Link from 'next/link';
import { useEffect, useState } from 'react'
import { Row, Col, Card, Image, Modal, Button, Form, Badge } from 'react-bootstrap';
import { LeaveRequestResponse, StatusIndicator } from '../../data/Definition';
import { approveLeaveRequest, createLeaveRequest, deleteLeaveRequest, rejectLeaveRequest } from '../../actions/leave-request/action';
import { useRouter } from 'next/navigation';
import useMounted from '../../hooks/useMounted';
import { useSession } from 'next-auth/react';

const ViewLRById = ({ leaveRequest }) => {
    const router = useRouter();
    const hasMounted = useMounted();
    const { data: session } = useSession();
    const [modalShow, setModalShow] = useState(false);
    const handleApproveLeave = async () => {
        const response = await approveLeaveRequest(leaveRequest.leaverequestid.toString());
        window.location.reload();
    };
    const handleRejectLeave = async () => {
        const response = await rejectLeaveRequest(leaveRequest.leaverequestid.toString());
        window.location.reload();
    };
    const handleDeleteLeave = async () => {
        const response = await deleteLeaveRequest(leaveRequest.leaverequestid.toString());
        router.push('/leave-request');
    };
    const leaveRequestResponse: LeaveRequestResponse = leaveRequest as LeaveRequestResponse;

    return (
        <Col xs={12} className="mb-6">
            <Card>
                {/* card header  */}
                <Card.Header className="p-4 bg-white">
                    <h4 className="mb-0">Leave Request Overview</h4>
                </Card.Header>
                {/* card body  */}
                <Card.Body>
                    <Row className="row">
                        <Col xl={8} lg={6} md={12} xs={12}>
                            <div className="mb-2">
                                <p className="text-muted mb-0">{leaveRequestResponse.leavetypename} Leave</p>
                                <h3 className="mt-2 mb-3 fw-bold">{leaveRequestResponse.employeename}</h3>
                                <p>Sick leave due to extreme cold and fever </p>
                                <p>
                                    <i className="fe fe-info fs-4 me-2 text-muted icon-xs"></i>
                                    <span className="mr-2">From </span>
                                    <span className="text-primary">{new Date(leaveRequestResponse.startdate).toLocaleDateString()}</span>
                                    <span className="mx-1">to</span>
                                    <span className="text-primary">{new Date(leaveRequestResponse.enddate).toLocaleDateString()}</span>
                                </p>
                            </div>
                        </Col>
                        <Col xl={4} lg={6} md={12} xs={12}>
                            <div>
                                <small className="text-muted">
                                    Status
                                </small>
                                <h1 className="fw-bold text-primary"><StatusIndicator status={leaveRequestResponse.status} /></h1>
                                <Link href="#" className="mb-3 text-muted text-primary-hover d-block">Learn more about our leave policy</Link>
                                {session?.is_admin && (
                                    leaveRequestResponse.status === "approved" ? (
                                        hasMounted &&
                                        <Link href="#" className="btn btn-outline-danger d-grid" onClick={handleRejectLeave}>
                                            Cancel Leave
                                        </Link>
                                    ) : (
                                        <Link href="#" className="btn btn-outline-success d-grid" onClick={handleApproveLeave}>
                                            Approve Leave
                                        </Link>
                                    )
                                )}
                            </div>
                        </Col>
                    </Row>
                </Card.Body>
                {/* card footer  */}
                <Card.Footer className="bg-white">
                    <div className="d-md-flex justify-content-between align-items-center">
                        <div className="mb-3 mb-lg-0 text-center text-sm-start">
                            {leaveRequestResponse.status === "approved" ? (
                                <h5 className="text-uppercase mb-0">Approved By</h5>
                            ) : leaveRequestResponse.status === "rejected" ? (
                                <h5 className="text-uppercase mb-0">Rejected By</h5>
                            ) : (
                                <h5 className="text-uppercase mb-0">Submitted To</h5>
                            )}
                            <div className="mt-2">
                                <span className="fw-bold">{leaveRequestResponse.approvedbyname}</span>
                            </div>
                        </div>
                        {session?.is_admin && (
                            <div className="text-center text-md-start">
                                <Link href="#" className="link-danger" onClick={handleDeleteLeave}>Remove</Link>
                                <Link href="#" className="btn btn-outline-white ms-2">Change Card</Link>
                            </div>
                        )}
                    </div>
                </Card.Footer>
            </Card>
        </Col>
    )
}

export default ViewLRById