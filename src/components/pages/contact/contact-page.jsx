import React from 'react';
import { WithLoadingComponent } from 'components/shared';
import contactService from "service/contact-service";
import { WrappedContactList } from 'components/pages/contact/contact-list';
import utils from "utils";

export const ContactPage = () => {
    const [refresh, setRefresh] = React.useState();
    return <ContactListHoc shouldRefresh={(val) => setRefresh(val)} refresh={refresh} />
}

const ContactListHoc = (props) => {
    const WithLoadingHoc = React.useMemo(() => WithLoadingComponent(WrappedContactList, () => contactService.getContacts(), utils.WrappedLoader({ sm: false }))(props), [props.refresh]);
    return <WithLoadingHoc />
}