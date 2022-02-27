import React from 'react';
import image_preview from "assets/svg/flat_preview_remote.svg";
import { Input, CheckBox, CustomButton } from "components/shared";
import { Footer } from "components/layout";
import { useFormik } from 'formik';
import * as Yup from "yup";
import jwtWorker from "utils/jwt-worker";
import userService from "service/user-service";
import { Alert } from '@mui/material';
import Utils from "utils";
import { useHistory } from 'react-router';

export const LoginPage = () => {

    const [data, setData] = React.useState({ loading: false, error: null, token: null });
    const history = useHistory();

    const formik = useFormik({
        initialValues: {
            username: null,
            password: null
        },
        validationSchema: Yup.object({
            username: Yup.mixed().required('Username field is required!'),
            password: Yup.mixed().required('Password field is required!')
        }),
        onSubmit: values => {
            submitLoginForm(values);
        }
    });

    /**
     * Login form submission
     * @param {Object} credentials user credentials
     */
    const submitLoginForm = (credentials) => {
        setData({ loading: true });
        userService.login(credentials).then(response => {
            Promise.resolve(jwtWorker.setTokenInStorage(response.data)).then(() => {
                history.push("/home");
            });
        }, error => {
            setData({ ...data, loading: false, error });
        });
    }

    return (
        <div className="vh-100">
            <div className="container-fluid h-custom">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    {/* left side with flat img  */}
                    <div className="col-md-9 col-lg-6 col-xl-5">
                        <img src={image_preview} className="img-fluid" alt="img" />
                    </div>
                    {/* right side login form */}
                    <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1 p-4 card shadow">
                        <h3 className="fw-normal mb-0 me-3 text-center">Sign in</h3>
                        <div className="divider d-flex align-items-center my-2" />
                        <small>Welcome to the login page, please sign in to continue</small>
                        <form onSubmit={formik.handleSubmit}>
                            <Input
                                id="username"
                                label="Username"
                                value={formik.values.username}
                                onChange={(e) => { formik.handleChange(e) }}
                                error={formik.touched.username && formik.errors.username}
                                helperText={formik.touched.username && formik.errors.username}
                            />
                            <Input
                                id="password"
                                label="Password"
                                type="password"
                                value={formik.values.password}
                                onChange={(e) => { formik.handleChange(e) }}
                                error={formik.touched.password && formik.errors.password}
                                helperText={formik.touched.password && formik.errors.password}
                            />
                            <CheckBox label="Remember me" />
                            <CustomButton type="submit" label={Utils.labelTemplate(Utils.labelIcon("bi bi-check-circle", "Submit"), data.loading, "Logging in...")} className="my-2" />
                        </form>
                        {/* Alert callback response */}
                        {data.error && <Alert severity="error">{data.error}</Alert>}
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}