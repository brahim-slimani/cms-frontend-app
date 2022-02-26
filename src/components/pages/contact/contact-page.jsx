import React from 'react';
import { WithLoadingComponent, Loader } from 'components/shared';
import contactService from "service/contact-service";
import { WrappedContactList } from 'components/pages/contact/contact-list';

export const ContactPage = () => {
    const [refresh, setRefresh] = React.useState();
    return (
        <div className='scroll-container position-relative' style={{ height: "inherit" }}>
            <ContactListHoc shouldRefresh={(val) => setRefresh(val)} refresh={refresh} />
        </div>
    );
}

const ContactListHoc = (props) => {
    const WithLoadingHoc = React.useMemo(() => WithLoadingComponent(WrappedContactList, () => contactService.getContacts(), <div style={{ position: "absolute", top: "50%", left: "45%" }}><Loader /></div>)(props), [props.refresh]);
    return <WithLoadingHoc />
}