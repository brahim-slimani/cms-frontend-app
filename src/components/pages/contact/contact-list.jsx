import React, { useRef } from 'react';
import { DataTable, CustomButton, Popup, ToastNotification, TableActionsTemplate } from 'components/shared';
import { CreateContact, EditContact, DeleteContact, ContactAssignment, ContactDetail } from 'components/pages';
import utils from 'utils';
import jwtWorker from 'utils/jwt-worker';

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
                <TableActionsTemplate
                    contact={item}
                    editCallback={() => {
                        popupRef.current.openPopup();
                        setContactAction({ action: CONTACT_ACTIONS.EDIT.key, title: CONTACT_ACTIONS.EDIT.title });
                        setTargetContact(item);
                    }}
                    deleteCallback={() => {
                        popupRef.current.openPopup();
                        setContactAction({ action: CONTACT_ACTIONS.DELETE.key, title: CONTACT_ACTIONS.DELETE.title });
                        setTargetContact(item);
                    }}
                    assignCallback={() => {
                        popupRef.current.openPopup();
                        setContactAction({ action: CONTACT_ACTIONS.ASSIGN.key, title: CONTACT_ACTIONS.ASSIGN.title });
                        setTargetContact(item);
                    }}
                    previewCallback={() => {
                        popupRef.current.openPopup();
                        setContactAction({ action: CONTACT_ACTIONS.PREVIEW.key, title: CONTACT_ACTIONS.PREVIEW.key });
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
                setContactAction({ action: CONTACT_ACTIONS.CREATE.key, title: CONTACT_ACTIONS.CREATE.title });
            }} label={utils.labelIcon("bi bi-plus-circle", "Add contact")} />
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
            case CONTACT_ACTIONS.CREATE.key:
                return <CreateContact
                    successCallback={successCallbackFn}
                    errorCallback={(message) => toastRef.current.showToast({ type: "error", message })}
                    cancelCallback={() => popupRef.current.closePopup()}
                />
            case CONTACT_ACTIONS.EDIT.key:
                return <EditContact
                    contact={targetContact}
                    errorCallback={(message, type) => toastRef.current.showToast({ type: type ? type : "error", message })}
                    successCallback={successCallbackFn}
                    cancelCallback={() => popupRef.current.closePopup()}
                />
            case CONTACT_ACTIONS.DELETE.key:
                return <DeleteContact
                    contact={targetContact}
                    errorCallback={(message, type) => toastRef.current.showToast({ type: type ? type : "error", message })}
                    successCallback={successCallbackFn}
                    cancelCallback={() => popupRef.current.closePopup()}
                />
            case CONTACT_ACTIONS.ASSIGN.key:
                return <ContactAssignment
                    contact={targetContact}
                    errorCallback={(message, type) => toastRef.current.showToast({ type: type ? type : "error", message })}
                    successCallback={successCallbackFn}
                    cancelCallback={() => popupRef.current.closePopup()}
                />
            case CONTACT_ACTIONS.PREVIEW.key:
                return <ContactDetail
                    contact={targetContact}
                    cancelCallback={() => popupRef.current.closePopup()}
                />
            default: return <></>;
        }
    }

    return (
        <>
            <DataTable
                header={jwtWorker.hasRole(utils.ROLES.Admin) ? <CreateContactBtn /> : "Contact list"}
                columns={CONTACT_LIST_COLUMNS}
                data={contacts} />
            <Popup ref={popupRef} title={contactAction.title}>
                {popupChildren2beRendred()}
            </Popup>
            <ToastNotification ref={toastRef} />
        </>
    );
}

const CONTACT_LIST_COLUMNS = [
    { label: "FIRST NAME", name: "firstName" },
    { label: "LAST NAME", name: "lastName" },
    { label: "CONTACT TYPE", name: "contactType" },
    { label: "CREATION DATE", name: "createdAt" },
    { label: "LAST UPDATE", name: "updatedAt" },
    { label: "ACTIONS", name: "actions" }
]

const CONTACT_ACTIONS = {
    CREATE: { key: "create", title: "Create contact" },
    EDIT: { key: "edit", title: "Edit contact" },
    DELETE: { key: "delete", title: "Delete contact" },
    ASSIGN: { key: "assign", title: "Contact assignement" },
    PREVIEW: { key: "preview", title: "Preview contact" }
}
