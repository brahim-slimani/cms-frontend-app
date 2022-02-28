import React from 'react';
import { RootContainer, Sidebar, Header } from 'components/layout';
import utils from 'utils';

export const MasterPage = (props) => {
    const { children } = props;
    return (
        <RootContainer>
            <Sidebar />
            <div className="w-100" style={{ height: "90vh" }}>
                <Header />
                <div className='scroll-container position-relative' style={{ height: "inherit" }}>
                    {utils.BreadCrumbsTemplate()}
                    {children}
                </div>
            </div>
        </RootContainer>
    );
}