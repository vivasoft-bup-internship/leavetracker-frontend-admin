// import node module libraries
import Link from 'next/link';
import { ProgressBar, Col, Row, Card, Table, Image } from 'react-bootstrap';

// import required data files
import { LeaveRequestResponse, StatusIndicator } from '../../data/Definition';
const ViewAllLR = ({ leaveRequests }) => {
    return (
        <Row className="mt-6">
            <Col md={12} xs={12}>
                <Card>
                    <Card.Header className="bg-white  py-4">
                        <h4 className="mb-0">Leave Requests</h4>
                    </Card.Header>
                    <Table responsive className="text-nowrap mb-0">
                        <thead className="table-light">
                            <tr>
                                <th>Employee Name</th>
                                <th>Total Days</th>
                                <th>Status</th>
                                <th>Leave Type</th>
                                <th>Start Date</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {leaveRequests.map((item: LeaveRequestResponse, index) => {
                                return (
                                    <tr key={index}>
                                        <td className="align-middle">
                                            <div className="d-flex align-items-center">
                                                {/* <div>
                                                    <div className={`icon-shape icon-md border p-4 rounded-1 ${item.brandLogoBg}`}>
                                                        <Image src={item.brandLogo} alt="" />
                                                    </div>
                                                </div> */}
                                                <div className="ms-3 lh-1">
                                                    <h5 className="mb-1">
                                                        <Link href={`/leave-request/${item.leaverequestid}/view`} className="text-inherit">{item.employeename}</Link>
                                                    </h5>
                                                </div>
                                            </div>
                                        </td>
                                        {/* ${item.priorityBadgeBg} */}
                                        <td className="align-middle">{item.totaldays}</td>
                                        <td className="align-middle"><StatusIndicator status={item.status} /></td>
                                        <td className="align-middle">{item.leavetypename}</td>
                                        <td className="align-middle text-dark">{new Date(item.startdate).toLocaleDateString()}</td>
                                        <td className="align-middle">
                                            <div>
                                                {/* icons */}
                                                <Link href="" className="text-muted text-primary-hover me-3"><i className="fe fe-edit-3 fs-4"></i></Link>
                                                <Link href="#" className="text-muted text-primary-hover me-3"><i className="fe fe-delete fs-4"></i></Link>
                                                <Link href="#" className="text-muted text-primary-hover"><i className="fe fe-trash-2 fs-4"></i></Link>
                                            </div>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </Table>
                    <Card.Footer className="bg-white text-center">
                        <Link href="#" className="link-primary">View All Leave Requests</Link>
                    </Card.Footer>
                </Card>
            </Col>
        </Row>
    )
}

export default ViewAllLR