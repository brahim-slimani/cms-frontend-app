import React from 'react';
import { Alert, AlertTitle } from "@mui/material"
import utils from "utils";
import { CustomButton } from "components/shared";

export const ContactDetail = (props) => {
    const { contact } = props;
    return (
        <div>
            <Alert severity="info">
                <AlertTitle>Contact detail</AlertTitle>
                <div className=''>
                    <FieldTemplate label="UUID" value={contact.uuid} />
                    <FieldTemplate label="FIRST NAME" value={contact.firstName} />
                    <FieldTemplate label="LAST NAME" value={contact.lastName} />
                    <FieldTemplate label="ADDRESS" value={contact.address} />
                    <FieldTemplate label="TYPE" value={contact.contactType} />
                    <FieldTemplate label="TVA NUMBER" value={contact.tvaNumber} />
                    <FieldTemplate label="CREATION DATE" value={contact.createdAt} />
                    <FieldTemplate label="LAST UPDATE" value={contact.updatedAt} />
                </div>
            </Alert>
            <div className='my-2'>
                <AlertTitle>Companies</AlertTitle>
                {contact.companies.length ? <div className="grid-2x100">
                    {contact.companies.map(item => <CompanyTemplate company={item} />)}
                </div> : utils.NoItemsTemplate("No companies has been assigned yet!")}
            </div>
            <div className='col-md-5 mx-auto'>
                <CustomButton label={utils.labelIcon("bi bi-x-circle", "Dismiss")} onClick={() => { props.cancelCallback() }} />
            </div>
        </div>
    );
}

const FieldTemplate = (props) => {
    return (
        props.value &&
        <li className='d-flex' style={{ width: "400px" }}>
            <div style={{ fontWeight: 'bold', width: "120px" }}>
                <small> {props.label}</small>
            </div>
            <small>{props.value} </small>
        </li>
    );
}

const CompanyTemplate = (props) => {
    const { company } = props;
    return <div className="card shadow-sm m-1" title={company.uuid}>
        <div className="card-body p-3 d-flex">
            <span class="me-2">
                <i class="bi bi-building" style={{ fontSize: "22px" }}></i>
            </span>
            <div className="ml-2 mr-3">
                <span style={{ whiteSpace: "nowrap" }}>{`Company TVA Number ${company.tvaNumber}`}</span><br />
                <small style={{ position: "absolute", bottom: "6px" }}>{company.address}</small>
            </div>
        </div>
    </div>
}