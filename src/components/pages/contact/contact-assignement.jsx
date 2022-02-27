import React from 'react';
import { Chip, DialogContentText } from '@mui/material';
import utils from "utils";
import companyService from "service/company-service";
import contactService from "service/contact-service";
import { WithLoadingComponent, Loader, Dropdown, CustomButton } from "components/shared";

export const ContactAssignment = (props) => {

    const { contact } = props;
    const [company, setCompany] = React.useState();
    const [loading, setLoading] = React.useState(false);

    /**
     * handle assignement submission
     */
    const handleSubmit = () => {
        if (!company) {
            props.errorCallback(utils.CUSTOM_MESSAGES.NO_ITEM_SELECTED, "error");
            return
        }
        if (contact.companies.filter(x => x.uuid === company).length > 0) {
            props.errorCallback(utils.CUSTOM_MESSAGES.ALREADY_ASSIGNED, "info");
            return
        }
        setLoading(true);
        contactService.assignContact2company(contact.uuid, company).then(response => {
            props.successCallback(response);
        }, error => {
            props.errorCallback(error);
        }).finally(() => {
            setLoading(false);
        });
    }

    return (
        <div>
            <DialogContentText>
                Assign the contact {<Chip icon={<i className='bi bi-emoji-smile' />} label={`${contact.firstName} ${contact.lastName}`} />} into a specific company
            </DialogContentText>

            <CompanyListHoc selectCallback={(company) => setCompany(company)} />

            <div className='mt-3'>
                <CustomButton
                    label={utils.labelTemplate(utils.labelIcon("bi bi-check-circle", "submit"), loading, "Processing...")}
                    className="my-2"
                    onClick={handleSubmit} />
                <CustomButton
                    label={utils.labelIcon("bi bi-x-circle", "Cancel")}
                    onClick={props.cancelCallback}
                    variant="outlined"
                    color="error" />
            </div>
        </div>
    );
}

const WrappedComapyList = (props) => {
    const { data } = props;
    const [selectedCompany, setSelectedCompany] = React.useState();

    return <div className="my-3">
        <Dropdown
            id="company-dropdown"
            label="Company"
            items={data.map(item => { return { name: `${item.address} — Tva number (${item.tvaNumber})`, value: item.uuid } })}
            value={selectedCompany}
            onChange={(e) => { setSelectedCompany(e.target.value); props.selectCallback(e.target.value); }}
        />
    </div>
}

const CompanyListHoc = (props) => {
    const WithLoadingHoc = React.useMemo(() => WithLoadingComponent(WrappedComapyList, () => companyService.getCompanies(), <div className="my-3" style={{ marginLeft: "45%" }}> <Loader size={30} /> </div>)(props), []);
    return <WithLoadingHoc />
}