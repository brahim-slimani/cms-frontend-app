import React from 'react';
import { Input, Dropdown, CustomButton } from "components/shared";
import { useFormik } from 'formik';
import * as Yup from "yup";
import utils from "utils";
import contactService from "service/contact-service";

export const CreateContact = (props) => {

    const [contactType, setContactType] = React.useState();
    const [loading, setLoading] = React.useState(false);

    const formik = useFormik({
        initialValues: {
            firstName: null,
            lastName: null,
            address: null,
            contactType: null,
            tvaNumber: null,
        },
        validationSchema: Yup.object({
            firstName: Yup.mixed().required(utils.CUSTOM_MESSAGES.REQUIRED_FIELD),
            lastName: Yup.mixed().required(utils.CUSTOM_MESSAGES.REQUIRED_FIELD),
            address: Yup.mixed().required(utils.CUSTOM_MESSAGES.REQUIRED_FIELD),
            contactType: Yup.mixed().required(utils.CUSTOM_MESSAGES.REQUIRED_FIELD),
            tvaNumber: contactType === utils.CONTACT_TYPES.Freelancer && Yup.mixed().required(utils.CUSTOM_MESSAGES.REQUIRED_FIELD),
        }),
        onSubmit: values => {
            handleSubmit(values);
        }
    });

    /**
     * contact form submission
     * @param {Object} contact contact data
     */
    const handleSubmit = (contact) => {
        setLoading(true);
        contactService.addContact(contact).then(response => {
            props.successCallback(response);
        }, error => {
            props.errorCallback(error);
        }).finally(() => setLoading(false));
    }

    return (
        <div style={{ width: "300px" }}>
            <form onSubmit={formik.handleSubmit}>
                <Input
                    id="firstName"
                    label="First name"
                    value={formik.values.firstName}
                    onChange={(e) => { formik.handleChange(e) }}
                    error={formik.touched.firstName && formik.errors.firstName}
                    helperText={formik.touched.firstName && formik.errors.firstName} />

                <Input
                    id="lastName"
                    label="Last name"
                    value={formik.values.lastName}
                    onChange={(e) => { formik.handleChange(e) }}
                    error={formik.touched.lastName && formik.errors.lastName}
                    helperText={formik.touched.lastName && formik.errors.lastName} />

                <Input
                    id="address"
                    label="Address"
                    //rows={2}
                    value={formik.values.address}
                    onChange={(e) => { formik.handleChange(e) }}
                    error={formik.touched.address && formik.errors.address}
                    helperText={formik.touched.address && formik.errors.address} />

                <Dropdown
                    id="contactType"
                    label="Contact Type"
                    items={Object.entries(utils.CONTACT_TYPES).map(([key, value]) => { return { name: key, value: value } })}
                    value={formik.values.contactType}
                    onChange={(e) => { formik.setValues({ ...formik.values, contactType: e.target.value }); setContactType(e.target.value) }}
                    helperText={formik.touched.contactType && formik.errors.contactType}
                />
                {
                    formik.values.contactType === utils.CONTACT_TYPES.Freelancer &&
                    <Input
                        id="tvaNumber"
                        label="Tva number"
                        value={formik.values.tvaNumber}
                        onChange={(e) => { formik.handleChange(e) }}
                        error={formik.touched.tvaNumber && formik.errors.tvaNumber}
                        helperText={formik.touched.tvaNumber && formik.errors.tvaNumber} />
                }
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