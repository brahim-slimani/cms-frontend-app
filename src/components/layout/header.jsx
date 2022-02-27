import React, { useRef } from 'react';
import logo from "assets/svg/logo.svg";
import logoLight from "assets/svg/logo-light.svg";
import { CustomButton, Popup } from 'components/shared';
import utils from "utils";
import { DialogContentText } from '@mui/material';
import { Logout } from "components/pages";

export const Header = () => {
    const logoutPopupRef = useRef();
    return (
        <nav class="navbar navbar-expand-lg navbar-light bg-ligh pt-2 shadow-sm" style={{ background: "#156fde", color: "white" }}>
            <div class="container-fluid">
                <BurgerButton />
                <div class="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
                    <ul class="right-nav navbar-nav ml-auto nav">
                        <div className='nav'>
                            <CustomButton
                                size="small"
                                variant="text"
                                sx={{ color: "white" }}
                                onClick={() => logoutPopupRef.current.openPopup()}
                                label={utils.labelIcon("bi bi-box-arrow-right", "Logout")} />
                            <Popup ref={logoutPopupRef} title="Logout confirmation">
                                <DialogContentText>
                                    {utils.CUSTOM_MESSAGES.LOGOUT_CONFIRMATION}
                                </DialogContentText>
                                <Logout cancelCallback={()=>logoutPopupRef.current.closePopup()} />
                            </Popup>
                        </div>
                    </ul>
                </div>
            </div>
        </nav >
    );
}

const BurgerButton = () => {
    const getTargetElement = (id) => {
        return document.querySelector(`#${id}`);
    }
    const toggleAction = () => {
        const hamberBtn = getTargetElement("ham");
        const sidebar = getTargetElement("sidebar");
        const siderHead = getTargetElement("sider-head");
        const siderLogo = getTargetElement("sider-logo");
        const profileDetail = getTargetElement("profile-detail");
        const profileAvatar = getTargetElement("profile-avatar");
        hamberBtn.classList.toggle("active");
        sidebar.classList.toggle("active");
        if (sidebar.classList.contains("active")) {
            siderHead.style.display = "none";
            profileDetail.style.display = "none"
            profileAvatar.style.marginInline = "auto";
            siderLogo.src = logoLight;
        } else {
            siderHead.style.display = "block";
            profileDetail.style.display = "block";
            profileAvatar.style.marginInline = 0;
            siderLogo.src = logo;
        }
    }
    return <div style={{ width: "40px" }}>
        <svg class="ham hamRotate" id="ham" viewBox="0 0 120 100" width="inherit" onClick={toggleAction}>
            <path class="line top" d="m 30,33 h 40 c 0,0 9.044436,-0.654587 9.044436,-8.508902 0,-7.854315 -8.024349,-11.958003 -14.89975,-10.85914 -6.875401,1.098863 -13.637059,4.171617 -13.637059,16.368042 v 40" />
            <path class="line middle" d="m 30,50 h 40" />
            <path class="line bottom" d="m 30,67 h 40 c 12.796276,0 15.357889,-11.717785 15.357889,-26.851538 0,-15.133752 -4.786586,-27.274118 -16.667516,-27.274118 -11.88093,0 -18.499247,6.994427 -18.435284,17.125656 l 0.252538,40" />
        </svg>
    </div>
}