"use client";
import { Fragment, useEffect, useState } from "react";
import { getEmployeeById } from "../../../../../data/employee/data";
import ProfileSettings from "../../../../../sub-components/employee/update";
import { Container, Row } from "react-bootstrap";
import { PageHeading } from "../../../../../widgets";


const UpdateEmployee = (props: { params: { id: string } }) => {
    const [id, setId] = useState<string>(props.params.id);
    const [employee, setEmployee] = useState([]);
    useEffect(() => {
        if (id) {
            console.log(id);
            getEmployeeById(id).then((employee) => {
                setEmployee(employee);
            });
        }
    }, [id]);

    return (
        <Container fluid className="p-6">

            {/* Page Heading */}
            <PageHeading heading="General" />
            < ProfileSettings employee={employee} />;
        </Container>
    )


}

export default UpdateEmployee
