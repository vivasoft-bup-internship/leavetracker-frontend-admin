"use client";
import { Fragment, useEffect, useState } from "react";
import { getLeaveRequest } from "../../../../../data/leave-request/data";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-bootstrap-icons";
import ViewLRById from "../../../../../sub-components/leave-request/viewbyid";
import { StatRightTopIcon } from "../../../../../widgets";

const LeaveRequestById = (props: { params: { id: string } }) => {
    const [id, setId] = useState<string>(props.params.id);
    const [leaverequest, setLeaveRequest] = useState([]);
    useEffect(() => {
        if (id) {
            getLeaveRequest(id).then((leaverequest) => {
                setLeaveRequest(leaverequest);
            });
        }
    }, [id]);
    return (
        <Fragment>
            <div className="bg-primary pt-10 pb-21"></div>
            <Container fluid className="mt-n22 px-6">
                <Row>
                    <ViewLRById leaveRequest={leaverequest} />
                </Row>
            </Container>
        </Fragment>
    )
}
export default LeaveRequestById