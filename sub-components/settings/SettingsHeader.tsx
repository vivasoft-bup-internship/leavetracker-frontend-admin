// import node module libraries
import Link from 'next/link';
import { ToastContainer, toast } from 'react-toastify';
import { Col, Row, Card, Button, Badge, Tab, Nav, Container, Image, Modal, Form, Alert } from 'react-bootstrap';
import { LeaveTypeField, Roles } from '../../data/Definition';
import { useState } from 'react';
import { createLeaveType, deleteLeaveType } from '../../actions/leave-request/action';
import { createRole, deleteRole } from '../../actions/employee/action';
import { useSession } from 'next-auth/react';

const SettingsHeader = ({ leavetypes, roles }) => {
    const { data: session } = useSession();
    function AddLeaveTypeModel(props) {
        if (session.is_admin === false) {
            return <></>
        }
        return (
            <Modal
                {...props}
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Add Leave Type
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form action={handleCreateLeaveType}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Leave Type</Form.Label>
                            <Form.Control type="text" id='name' name='name' placeholder="Enter Leave Type" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Max Days</Form.Label>
                            <Form.Control type="number" id='maxdays' name='maxdays' placeholder="Enter Max Days" />
                        </Form.Group>
                        <Button variant="outline-success" type="submit">
                            Submit
                        </Button>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant='danger' onClick={props.onHide}>Close</Button>
                </Modal.Footer>
            </Modal>
        );
    }
    function AddRoleModel(props) {
        if (session.is_admin === false) {
            return <></>
        }
        return (
            <Modal
                {...props}
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Add Role
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form action={handleCreateRole}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Role</Form.Label>
                            <Form.Control type="text" id='name' name='name' placeholder="Enter Role" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Permissions</Form.Label>
                            <Form.Control type="text" id='permission' name='permission' placeholder="Enter Permissions" />
                        </Form.Group>
                        <Button variant="outline-success" type="submit">
                            Submit
                        </Button>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant='danger' onClick={props.onHide}>Close</Button>
                </Modal.Footer>
            </Modal>
        );
    }
    const [ltmodalShow, setLtModalShow] = useState(false);
    const [rmodalShow, setRModalShow] = useState(false);

    async function handleDeleteRole(roleid: string) {
        try {
            await deleteRole(roleid);
            toast.success('Role deleted successfully');
            // wait for 2 seconds
            setTimeout(() => {
                window.location.reload();
            }
                , 1000);
        } catch (error) {
            toast.error('Failed to delete role');
        }
    }
    async function handleDeleteLeaveType(leavetypeid: string) {
        try {
            await deleteLeaveType(leavetypeid);
            toast.success('Leave Type deleted successfully');
            // wait for 2 seconds
            setTimeout(() => {
                window.location.reload();
            }
                , 1000);
        } catch (error) {
            toast.error('Failed to delete Leave Type');
        }
    }
    async function handleCreateLeaveType(formData: FormData) {
        try {
            await createLeaveType(formData);
            toast.success('Leave Type created successfully');
            // wait for 2 seconds
            setTimeout(() => {
                window.location.reload();
            }
                , 1000);
        } catch (error) {
            toast.error('Failed to create Leave Type');
        }
    }
    async function handleCreateRole(formData: FormData) {
        try {
            await createRole(formData);
            toast.success('Role created successfully');
            // wait for 2 seconds
            setTimeout(() => {
                window.location.reload();
            }
                , 1000);
        } catch (error) {
            toast.error('Failed to create Role');
        }
    }
    return (
        <Row className="align-items-center">
            <Col xl={12} lg={12} md={12} xs={12}>
                {/* Bg */}
                <div className="pt-20 rounded-top" style={{ background: 'url(/images/background/profile-cover.jpg) no-repeat', backgroundSize: 'cover' }}>
                </div>
                <div className="bg-white rounded-bottom smooth-shadow-sm ">
                    <div className="d-flex align-items-center justify-content-between pt-4 pb-6 px-4">
                        <div className="d-flex align-items-center">
                            {/* text */}
                            <div className="lh-1">
                                <h2 className="mb-0">Leave Management System Settings
                                    <Link href="#!" className="text-decoration-none" data-bs-toggle="tooltip" data-placement="top" title="" data-original-title="Beginner">
                                    </Link>
                                </h2>
                            </div>
                        </div>
                    </div>
                    <Tab.Container id="tab-container-1" defaultActiveKey="all">
                        <Card>
                            <Card.Header className="border-bottom-0 p-0 ">
                                <Nav className="nav-lb-tab">
                                    <Nav.Item>
                                        <Nav.Link eventKey="all" className="mb-sm-3 mb-md-0">
                                            Leave Type
                                        </Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link eventKey="approved" className="mb-sm-3 mb-md-0">
                                            Roles
                                        </Nav.Link>
                                    </Nav.Item>
                                </Nav>
                            </Card.Header>
                            <Card.Body className="p-0">
                                <Tab.Content>
                                    <Tab.Pane eventKey="all" className="pb-4 p-4">
                                        {leavetypes.map((item: LeaveTypeField, index) => {
                                            return (
                                                <div className="d-flex justify-content-between align-items-center mb-4">
                                                    <div className="d-flex align-items-center">
                                                        <div className="ms-3 ">
                                                            <h5 className="mb-1">{item.name}</h5>
                                                            <p className="text-muted mb-0 fs-5 text-muted">Max days : {item.maxdays}</p>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <Link href="#" onClick={async (e) => {e.preventDefault(); await handleDeleteLeaveType(item.leavetypeid.toString())}} className="text-muted text-primary-hover"><i className="fe fe-trash-2 fs-4"></i></Link>
                                                    </div>
                                                </div>
                                            )
                                        }
                                        )}
                                        <div className='d-flex justify-content-end'>
                                            <Button variant="primary" onClick={() => setLtModalShow(true)} disabled={!session.is_admin}>
                                                Add
                                            </Button>
                                            <AddLeaveTypeModel show={ltmodalShow} onHide={() => setLtModalShow(false)} />
                                        </div>

                                    </Tab.Pane>
                                    <Tab.Pane eventKey="approved" className="pb-4 p-4 react-code">
                                        {roles.map((item: Roles, index) => {
                                            return (
                                                <div className="d-flex justify-content-between align-items-center mb-4">
                                                    <div className="d-flex align-items-center">
                                                        <div className="ms-3 ">
                                                            <h5 className="mb-1">{item.name}</h5>
                                                            <p className="text-muted mb-0 fs-5 text-muted">Permissions : {item.permission}</p>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <Link href="#" onClick={async (e) => { e.preventDefault(); await handleDeleteRole(item.roleid.toString()); }} className="text-muted text-primary-hover"><i className="fe fe-trash-2 fs-4"></i></Link>
                                                    </div>
                                                </div>
                                            )
                                        }
                                        )}
                                        <div className='d-flex justify-content-end'>
                                            <Button variant="primary" onClick={() => setRModalShow(true)} disabled={!session.is_admin}>
                                                Add
                                            </Button>
                                            <AddRoleModel show={rmodalShow} onHide={() => setRModalShow(false)} />
                                        </div>
                                    </Tab.Pane>
                                </Tab.Content>
                            </Card.Body>
                        </Card>
                    </Tab.Container>
                </div>
            </Col>
            <ToastContainer />
        </Row>
    )
}

export default SettingsHeader