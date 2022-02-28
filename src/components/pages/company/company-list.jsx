import React, { useRef } from 'react';
import { DataTable, CustomButton, Popup, ToastNotification, TableActionsTemplate } from 'components/shared';
import { CreateCompany, EditCompany, DeleteCompany, CompanyAssignment, CompanyDetail } from 'components/pages';
import utils from 'utils';
import jwtWorker from 'utils/jwt-worker';

export const WrappedCompanyList = (props) => {
    const { data } = props;
    const [companies, setCompanies] = React.useState();
    const toastRef = useRef(null);
    const popupRef = useRef(null);
    const [companyAction, setCompanyAction] = React.useState({ action: null, title: null });
    const [targetCompany, setTargetCompany] = React.useState();

    React.useState(() => {
        setCompanies(data.map(item => {
            let obj = { ...item }; obj["actions"] =
                <TableActionsTemplate
                    contact={item}
                    editCallback={() => {
                        popupRef.current.openPopup();
                        setCompanyAction({ action: COMPANY_ACTIONS.EDIT.key, title: COMPANY_ACTIONS.EDIT.title });
                        setTargetCompany(item);
                    }}
                    deleteCallback={() => {
                        popupRef.current.openPopup();
                        setCompanyAction({ action: COMPANY_ACTIONS.DELETE.key, title: COMPANY_ACTIONS.DELETE.title });
                        setTargetCompany(item);
                    }}
                    assignCallback={() => {
                        popupRef.current.openPopup();
                        setCompanyAction({ action: COMPANY_ACTIONS.ASSIGN.key, title: COMPANY_ACTIONS.ASSIGN.title });
                        setTargetCompany(item);
                    }}
                    previewCallback={() => {
                        popupRef.current.openPopup();
                        setCompanyAction({ action: COMPANY_ACTIONS.PREVIEW.key, title: COMPANY_ACTIONS.PREVIEW.title });
                        setTargetCompany(item);
                    }}
                />;
            return obj;
        }))
    }, []);

    const CreateCompanyBtn = () => {
        return <div className='col-md-4'>
            <CustomButton onClick={(e) => {
                popupRef.current.openPopup();
                setCompanyAction({ action: COMPANY_ACTIONS.CREATE.key, title: COMPANY_ACTIONS.CREATE.title });
            }} label={utils.labelIcon("bi bi-check-circle", "Add company")} />
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
        switch (companyAction.action) {
            case COMPANY_ACTIONS.CREATE.key:
                return <CreateCompany
                    successCallback={successCallbackFn}
                    errorCallback={(message) => toastRef.current.showToast({ type: "error", message })}
                    cancelCallback={() => popupRef.current.closePopup()}
                />
            case COMPANY_ACTIONS.EDIT.key:
                return <EditCompany
                    company={targetCompany}
                    errorCallback={(message, type) => toastRef.current.showToast({ type: type ? type : "error", message })}
                    successCallback={successCallbackFn}
                    cancelCallback={() => popupRef.current.closePopup()}
                />
            case COMPANY_ACTIONS.DELETE.key:
                return <DeleteCompany
                    company={targetCompany}
                    errorCallback={(message, type) => toastRef.current.showToast({ type: type ? type : "error", message })}
                    successCallback={successCallbackFn}
                    cancelCallback={() => popupRef.current.closePopup()}
                />
            case COMPANY_ACTIONS.ASSIGN.key:
                return <CompanyAssignment
                    company={targetCompany}
                    errorCallback={(message, type) => toastRef.current.showToast({ type: type ? type : "error", message })}
                    successCallback={successCallbackFn}
                    cancelCallback={() => popupRef.current.closePopup()}
                />
            case COMPANY_ACTIONS.PREVIEW.key:
                return <CompanyDetail
                    company={targetCompany}
                    cancelCallback={() => popupRef.current.closePopup()}
                />
            default: return <></>;
        }
    }

    return (
        <>
            <DataTable
                header={jwtWorker.hasRole(utils.ROLES.Admin) ? <CreateCompanyBtn /> : "Company list"}
                columns={COMPANY_LIST_COLUMNS}
                data={companies} />
            <Popup ref={popupRef} title={companyAction.title}>
                {popupChildren2beRendred()}
            </Popup>
            <ToastNotification ref={toastRef} />
        </>
    );
}


const COMPANY_LIST_COLUMNS = [
    { label: "COMPANY TVA NUMBER", name: "tvaNumber" },
    { label: "ADDRESS", name: "address" },
    { label: "CREATION DATE", name: "createdAt" },
    { label: "LAST UPDATE", name: "updatedAt" },
    { label: "ACTIONS", name: "actions" }
]

const COMPANY_ACTIONS = {
    CREATE: { key: "create", title: "Create company" },
    EDIT: { key: "edit", title: "Edit company" },
    DELETE: { key: "delete", title: "Delete company" },
    ASSIGN: { key: "assign", title: "Company assignement" },
    PREVIEW: { key: "preview", title: "Preview company" }
}