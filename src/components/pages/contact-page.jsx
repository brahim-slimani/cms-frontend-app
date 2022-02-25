import React from 'react';
import { DataTable, WithLoadingComponent, Loader } from 'components/shared';
import contactService from "service/contact-service";

export const ContactPage = () => {
    return (
        <div className='scroll-container position-relative' style={{ height: "inherit" }}>
            <ContactListHoc />
        </div>
    );
}

const WrappedContactList = (props) => {
    const { data } = props;
    return (
        <DataTable columns={Object.keys(data.pop()).filter(item => item !== "companies" && item !== "uuid")} data={data} />
    );
}

const ContactListHoc = () => {
    const WithLoadingHoc = WithLoadingComponent(WrappedContactList, () => contactService.getContacts(), <div style={{ position: "absolute", top: "50%", left: "45%" }}><Loader /></div>)()
    return <WithLoadingHoc />
}