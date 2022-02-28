import React from 'react';
import { Alert, AlertTitle, Chip } from "@mui/material"
import utils from "utils";
import { CustomButton } from "components/shared";

export const CompanyDetail = (props) => {
    const { company } = props;
    return (
        <div>
            <Alert severity="info">
                <AlertTitle>Company detail</AlertTitle>
                <div>
                    <FieldTemplate label="UUID" value={company.uuid} />
                    <FieldTemplate label="ADDRESS" value={company.address} />
                    <FieldTemplate label="TVA NUMBER" value={company.tvaNumber} />
                    <FieldTemplate label="CREATION DATE" value={company.createdAt} />
                    <FieldTemplate label="LAST UPDATE" value={company.updatedAt} />
                </div>
            </Alert>
            <div className='my-2'>
                <AlertTitle>Contacts</AlertTitle>
                {company.contacts.length ? <div className="grid-3x100">
                    {company.contacts.map(item => <Chip icon={<i className='bi bi-person-fill' />} className="me-2 mb-2" label={`${item.firstName} ${item.lastName}`} />)}
                </div> : utils.NoItemsTemplate("No contacts has been assigned yet!")}
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