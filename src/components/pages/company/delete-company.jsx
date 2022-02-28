import React from 'react';
import { CustomButton } from 'components/shared';
import { DialogContentText } from '@mui/material';
import utils from "utils";
import companyService from "service/company-service";

export const DeleteCompany = (props) => {
    const { company } = props;
    const [loading, setLoading] = React.useState(false);

    /**
     * Handle delete submission
     */
    const handleSubmit = () => {
        setLoading(true);
        companyService.deleteCompany(company.uuid).then(response => {
            props.successCallback(response);
        }, error => {
            props.errorCallback(error);
        }).finally(() => setLoading(false));
    }

    return (
        <div>
            <DialogContentText>
                {utils.CUSTOM_MESSAGES.DELETE_COMPANY_CONRIMATION}
            </DialogContentText>
            <div className='mt-3'>
                <CustomButton
                    label={utils.labelTemplate(utils.labelIcon("bi bi-check-circle", "submit"), loading, "Processing...")}
                    className="my-2"
                    onClick={handleSubmit}
                />
                <CustomButton
                    label={utils.labelIcon("bi bi-x-circle", "Cancel")}
                    onClick={props.cancelCallback}
                    variant="outlined"
                    color="error"
                />
            </div>
        </div>
    );
}