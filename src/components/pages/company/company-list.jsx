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
                        setCompanyAction({ action: "edit", title: "Edit company" });
                        setTargetCompany(item);
                    }}
                    deleteCallback={() => {
                        popupRef.current.openPopup();
                        setCompanyAction({ action: "delete", title: "Delete company" });
                        setTargetCompany(item);
                    }}
                    assignCallback={() => {
                        popupRef.current.openPopup();
                        setCompanyAction({ action: "assign", title: "Company assignement" });
                        setTargetCompany(item);
                    }}
                    previewCallback={() => {
                        popupRef.current.openPopup();
                        setCompanyAction({ action: "preview", title: "Preview company" });
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
                setCompanyAction({ action: "create", title: "Create company" });
            }} label={<><i className='bi bi-plus-circle' />&nbsp;Add company</>} />
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
            case "create":
                return <CreateCompany
                    successCallback={successCallbackFn}
                    errorCallback={(message) => toastRef.current.showToast({ type: "error", message })}
                    cancelCallback={() => popupRef.current.closePopup()}
                />
            case "edit":
                return <EditCompany
                    company={targetCompany}
                    errorCallback={(message, type) => toastRef.current.showToast({ type: type ? type : "error", message })}
                    successCallback={successCallbackFn}
                    cancelCallback={() => popupRef.current.closePopup()}
                />
            case "delete":
                return <DeleteCompany
                    company={targetCompany}
                    errorCallback={(message, type) => toastRef.current.showToast({ type: type ? type : "error", message })}
                    successCallback={successCallbackFn}
                    cancelCallback={() => popupRef.current.closePopup()} />
            case "assign":
                return <CompanyAssignment
                    company={targetCompany}
                    errorCallback={(message, type) => toastRef.current.showToast({ type: type ? type : "error", message })}
                    successCallback={successCallbackFn}
                    cancelCallback={() => popupRef.current.closePopup()}
                />
            case "preview":
                return <CompanyDetail
                    company={targetCompany}
                    cancelCallback={() => popupRef.current.closePopup()}
                />
            default: return <></>;
        }
    }

    return (
        <>
            <DataTable header={jwtWorker.hasRole(utils.ROLES.Admin) ? <CreateCompanyBtn /> : "Company list"} columns={utils.COMPANY_LIST_COLUMNS} data={companies} />
            <Popup ref={popupRef} title={companyAction.title}>
                {popupChildren2beRendred()}
            </Popup>
            <ToastNotification ref={toastRef} />
        </>
    );
}