// import node module libraries
import React from "react";
import Link from 'next/link';
import { Card, Table, Dropdown, Image } from 'react-bootstrap';
import { MoreVertical } from 'react-feather';
import { EmployeeResponse } from "../../data/Definition";

const ViewAllEmployee = ({ employees }) => {

    return (
        <Card className="h-100">
            <Card.Header className="bg-white py-4">
                <h4 className="mb-0">Teams </h4>
            </Card.Header>
            <Table responsive className="text-nowrap">
                <thead className="table-light">
                    <tr>
                        <th>Name</th>
                        <th>Role Name</th>
                        <th>Manager Name</th>
                        <th>Availability</th>
                    </tr>
                </thead>
                <tbody>
                    {employees.map((item: EmployeeResponse, index) => {
                        console.log(item.onleave)
                        return (
                            <tr key={index}>
                                <td className="align-middle">
                                    <div className="d-flex align-items-center">
                                        {/* <div>
                                            <Image src={item.} alt="" className="avatar-md avatar rounded-circle" />
                                        </div> */}
                                        <div className="ms-3 lh-1">
                                            <h5 className=" mb-1">{item.name}</h5>
                                            <p className="mb-0">{item.username}</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="align-middle">{item.rolename}</td>
                                <td className="align-middle">{item.managername}</td>
                                <td className="align-middle">
                                    {item.onleave ? (
                                        <span className="badge bg-danger">On Leave</span>
                                    ) : (
                                        <span className="badge bg-success">Available</span>
                                    )}
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </Table>
        </Card>
    )
}

export default ViewAllEmployee