import React from 'react';
import { Chip, DialogContentText } from '@mui/material';
import utils from "utils";
import contactService from "service/contact-service";
import { WithLoadingComponent, Loader, Dropdown, CustomButton } from "components/shared";

export const CompanyAssignment = (props) => {

    const { company } = props;
    const [contact, setContact] = React.useState();
    const [loading, setLoading] = React.useState(false);

    /**
     * handle assignement submission
     */
    const handleSubmit = () => {
        if (!contact) {
            props.errorCallback(utils.CUSTOM_MESSAGES.NO_ITEM_SELECTED, "error");
            return
        }
        if (company.contacts.filter(x => x.uuid === contact).length > 0) {
            props.errorCallback(utils.CUSTOM_MESSAGES.ALREADY_ASSIGNED, "info");
            return
        }
        setLoading(true);
        contactService.assignContact2company(contact, company.uuid).then(response => {
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
                Assign contact to the company {<Chip label={`${company.tvaNumber}`} />}
            </DialogContentText>

            <ContactListHoc selectCallback={(contact) => setContact(contact)} />

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

const WrappedContactList = (props) => {
    const { data } = props;
    const [selectedContact, setSelectedContact] = React.useState();

    return <div className="my-3">
        <Dropdown
            id="contact-dropdown"
            label="Contact"
            items={data.map(item => { return { name: `${item.firstName} ${item.lastName}`, value: item.uuid } })}
            value={selectedContact}
            onChange={(e) => { setSelectedContact(e.target.value); props.selectCallback(e.target.value); }}
        />
    </div>
}

const ContactListHoc = (props) => {
    const WithLoadingHoc = React.useMemo(() => WithLoadingComponent(WrappedContactList, () => contactService.getContacts(), <div className="my-3" style={{ marginLeft: "45%" }}> <Loader size={30} /> </div>)(props), []);
    return <WithLoadingHoc />
}