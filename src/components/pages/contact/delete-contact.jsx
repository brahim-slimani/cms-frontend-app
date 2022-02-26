import React from 'react';
import { CustomButton } from 'components/shared';
import { DialogContentText } from '@mui/material';
import utils from "utils";
import contactService from "service/contact-service";

export const DeleteContact = (props) => {
    const { contact } = props;
    const [loading, setLoading] = React.useState(false);

    /**
     * handle delete submission
     */
    const handleSubmit = () => {
        setLoading(true);
        contactService.deleteContact(contact.uuid).then(response => {
            props.successCallback(response);
        }, error => {
            props.errorCallback(error);
        }).finally(() => setLoading(false));
    }

    return (
        <div>
            <DialogContentText>
                {utils.CUSTOM_MESSAGES.DELETE_CONTACT_CONRIMATION}
            </DialogContentText>
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