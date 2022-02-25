import React from 'react';
import { RootContainer, Sidebar, Header } from 'components/layout';

export const MasterPage = (props) => {
    const { children } = props;
    return (
        <RootContainer>
            <Sidebar />
            <div className="w-100">
                <Header />
                <div id="content">
                    {children}
                </div>
            </div>
        </RootContainer>
    );
}