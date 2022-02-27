import React from 'react';
import { Input, CustomButton } from "components/shared";
import { useFormik } from 'formik';
import * as Yup from "yup";
import utils from "utils";
import companyService from "service/company-service";

export const CreateCompany = (props) => {

    const [loading, setLoading] = React.useState(false);

    const formik = useFormik({
        initialValues: {
            tvaNumber: null,
            address: null,
        },
        validationSchema: Yup.object({
            tvaNumber: Yup.mixed().required(utils.CUSTOM_MESSAGES.REQUIRED_FIELD),
            address: Yup.mixed().required(utils.CUSTOM_MESSAGES.REQUIRED_FIELD)
        }),
        onSubmit: values => {
            handleSubmit(values);
        }
    });

    /**
     * company form submission
     * @param {Object} payload company data
     */
    const handleSubmit = (payload) => {
        setLoading(true);
        companyService.addCompany(payload).then(response => {
            props.successCallback(response);
        }, error => {
            props.errorCallback(error);
        }).finally(() => setLoading(false));
    }

    return (
        <div style={{ width: "300px" }}>
            <form onSubmit={formik.handleSubmit}>
                <Input
                    id="tvaNumber"
                    label="Tva number *"
                    value={formik.values.tvaNumber}
                    onChange={(e) => { formik.handleChange(e) }}
                    error={formik.touched.tvaNumber && formik.errors.tvaNumber}
                    helperText={formik.touched.tvaNumber && formik.errors.tvaNumber} />
                <Input
                    id="address"
                    label="Address *"
                    //rows={2}
                    value={formik.values.address}
                    onChange={(e) => { formik.handleChange(e) }}
                    error={formik.touched.address && formik.errors.address}
                    helperText={formik.touched.address && formik.errors.address} />

                <div className='mt-3'>
                    <CustomButton
                        type="submit"
                        label={utils.labelTemplate(utils.labelIcon("bi bi-check-circle", "submit"), loading, "Processing...")}
                        className="my-2" />
                    <CustomButton
                        label={utils.labelIcon("bi bi-x-circle", "Cancel")}
                        onClick={props.cancelCallback}
                        variant="outlined"
                        color="error" />
                </div>
            </form>
        </div>
    );
}