import React, { useRef } from 'react';
import { DataTable, WithLoadingComponent, Loader, CustomButton, Popup, ToastNotification } from 'components/shared';
import contactService from "service/contact-service";
import { CreateContact } from 'components/pages/contact/create-contact';
import utils from 'utils';

export const ContactPage = () => {

    return (
        <div className='scroll-container position-relative' style={{ height: "inherit" }}>
            <ContactListHoc />
        </div>
    );
}

const WrappedContactList = (props) => {
    const [data, setData] = React.useState(props.data);
    const columns = Object.keys(data[0]).filter(item => item !== "companies" && item !== "uuid");
    const toastRef = useRef(null);
    const popupRef = useRef(null);

    const CreateContactBtn = () => {
        return <div className='col-md-4'>
            <CustomButton onClick={(e) => {
                popupRef.current.openPopup();
            }} label={<><i className='bi bi-plus-circle' />&nbsp;Add contact</>} />
        </div>
    }

    const successCallbackFn = (response) => {
        toastRef.current.showToast({ type: "success", message: utils.CUSTOM_MESSAGES.OPERATION_SUCCESS });
        popupRef.current.closePopup();
        setData([...data, response.data]);
    }

    return (
        <>
            <DataTable header={<CreateContactBtn />} columns={columns} data={data} />
            <Popup ref={popupRef} title="Create contact">
                <CreateContact
                    errorCallback={(message) => toastRef.current.showToast({ type: "error", message })}
                    successCallback={successCallbackFn}
                    cancelCallback={() => popupRef.current.closePopup()}
                />
            </Popup>
            <ToastNotification ref={toastRef} />
        </>
    );
}

const ContactListHoc = (props) => {
    const WithLoadingHoc = WithLoadingComponent(WrappedContactList, () => contactService.getContacts(), <div style={{ position: "absolute", top: "50%", left: "45%" }}><Loader /></div>)(props);
    return <WithLoadingHoc />
}