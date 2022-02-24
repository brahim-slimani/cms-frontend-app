import React from 'react';
import image_preview from "assets/images/flat_preview_remote.svg";
import { Input, CheckBox, CustomButton } from "components/shared";
import { Footer } from "components/layout";

export const Login = () => {
    return (
        <div className="vh-100">
            <div className="container-fluid h-custom">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    {/* left side with flat img  */}
                    <div className="col-md-9 col-lg-6 col-xl-5">
                        <img src={image_preview} className="img-fluid" alt="img" />
                    </div>
                    {/* right side login form */}
                    <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1 px-4">
                        <h3 className="fw-normal mb-0 me-3">Sign in</h3>
                        <div className="divider d-flex align-items-center my-2" />
                        <small>Welcome to the login page, please sign in to continue</small>
                        <form>
                            <Input id="username" label="Username" className="mb-" />
                            <Input id="password" label="Password" type="password" className="mt-" />
                            <CheckBox label="Remember me" />
                            <CustomButton label="Sign in" />
                        </form>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}