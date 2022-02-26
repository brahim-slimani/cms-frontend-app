import React, { useRef } from 'react';
import { DataTable, CustomButton, Popup, ToastNotification, IconBtn } from 'components/shared';
import { CreateContact, EditContact, DeleteContact, ContactAssignment, ContactDetail } from 'components/pages';
import utils from 'utils';

export const WrappedContactList = (props) => {
    const { data } = props;
    const [contacts, setContacts] = React.useState();
    const toastRef = useRef(null);
    const popupRef = useRef(null);
    const [contactAction, setContactAction] = React.useState({ action: null, title: null });
    const [targetContact, setTargetContact] = React.useState();

    React.useState(() => {
        setContacts(data.map(item => {
            let obj = { ...item }; obj["actions"] =
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
                    assignCallback={() => {
                        popupRef.current.openPopup();
                        setContactAction({ action: "assign", title: "Contact assignement" });
                        setTargetContact(item);
                    }}
                    previewCallback={() => {
                        popupRef.current.openPopup();
                        setContactAction({ action: "preview", title: "Preview contact" });
                        setTargetContact(item);
                    }}
                />;
            return obj;
        }))
    }, []);

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
                    successCallback={successCallbackFn}
                    cancelCallback={() => popupRef.current.closePopup()}
                />
            case "delete":
                return <DeleteContact
                    contact={targetContact}
                    errorCallback={(message, type) => toastRef.current.showToast({ type: type ? type : "error", message })}
                    successCallback={successCallbackFn}
                    cancelCallback={() => popupRef.current.closePopup()} />
            case "assign":
                return <ContactAssignment
                    contact={targetContact}
                    errorCallback={(message, type) => toastRef.current.showToast({ type: type ? type : "error", message })}
                    successCallback={successCallbackFn}
                    cancelCallback={() => popupRef.current.closePopup()}
                />
            case "preview":
                return <ContactDetail
                    contact={targetContact}
                    cancelCallback={() => popupRef.current.closePopup()}
                />
            default: return <></>;
        }
    }

    return (
        <>
            <DataTable header={<CreateContactBtn />} columns={utils.CONTACT_LIST_COLUMNS} data={contacts} />
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
            title="Preview contact"
            icon="bi bi-eye-fill"
            color="success"
            onClick={props.previewCallback} />
        <IconBtn
            title="Assign to company"
            icon="bi bi-gear-wide-connected"
            color="primary"
            onClick={props.assignCallback} />
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
