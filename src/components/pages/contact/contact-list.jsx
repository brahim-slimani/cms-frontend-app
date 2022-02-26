import React, { useRef } from 'react';
import { DataTable, CustomButton, Popup, ToastNotification, IconBtn } from 'components/shared';
import { CreateContact, EditContact } from 'components/pages';
import utils from 'utils';

export const WrappedContactList = (props) => {
    const [data, setData] = React.useState(props.data.map(item => {
        let obj = { ...item }; obj["action"] =
            <ContactListActions
                contact={item}
                editCallback={() => {
                    popupRef.current.openPopup();
                    setContactAction({ action: "edit", title: "Edit contact" });
                    setTargetContact(item);
                }}
                deleteCallback={() => {
                    popupRef.current.openPopup();
                    setContactAction({ action: "delete", title: "Delete contact" });
                    setTargetContact(item);
                }}
            />;
        return obj;
    }));
    const columns = Object.keys(data[0]).filter(item => item !== "companies" && item !== "uuid");
    const toastRef = useRef(null);
    const popupRef = useRef(null);
    const [contactAction, setContactAction] = React.useState({ action: null, title: null });
    const [targetContact, setTargetContact] = React.useState();

    const CreateContactBtn = () => {
        return <div className='col-md-4'>
            <CustomButton onClick={(e) => {
                popupRef.current.openPopup();
                setContactAction({ action: "create", title: "Create contact" });
            }} label={<><i className='bi bi-plus-circle' />&nbsp;Add contact</>} />
        </div>
    }

    const successCallbackFn = () => {
        toastRef.current.showToast({ type: "success", message: utils.CUSTOM_MESSAGES.OPERATION_SUCCESS });
        popupRef.current.closePopup();
        setTimeout(() => {
            props.shouldRefresh(new Date().getTime());
        }, 1000);
    }

    const popupChildren2beRendred = () => {
        switch (contactAction.action) {
            case "create":
                return <CreateContact
                    successCallback={successCallbackFn}
                    errorCallback={(message) => toastRef.current.showToast({ type: "error", message })}
                    cancelCallback={() => popupRef.current.closePopup()}
                />
            case "edit":
                return <EditContact
                    contact={targetContact}
                    errorCallback={(message, type) => toastRef.current.showToast({ type: type ? type : "error", message })}
                    successEditCallback={successCallbackFn}
                    cancelCallback={() => popupRef.current.closePopup()}
                />
            default: return "Hello!";
        }
    }


    return (
        <>
            <DataTable header={<CreateContactBtn />} columns={columns} data={data} />
            <Popup ref={popupRef} title={contactAction.title}>
                {popupChildren2beRendred()}
            </Popup>
            <ToastNotification ref={toastRef} />
        </>
    );
}


const ContactListActions = (props) => {
    return <div className='d-flex'>
        <IconBtn
            title="Assign to company"
            icon="bi bi-gear-wide-connected"
            color="primary" />
        <IconBtn
            title="Edit"
            icon="bi bi-pencil-fill"
            color="secondary"
            onClick={props.editCallback} />
        <IconBtn
            title="Delete"
            icon="bi bi-trash"
            color="error"
            onClick={props.deleteCallback} />
    </div>
}
