import React from 'react';
import contactService from "service/contact-service";
import companyService from "service/company-service";
import utils from "utils";
import { Skeleton, Stack } from '@mui/material';


export const Dashboard = () => {

    const [contacts, setContacts] = React.useState({ all: null, employees: null, freelancers: null });
    const [companies, setCompanies] = React.useState({ all: null });
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        contactService.getContacts().then(response => {
            setContacts({
                ...contacts,
                all: response.data.length,
                employees: response.data.filter(contact => contact.contactType === utils.CONTACT_TYPES.Employee).length,
                freelancers: response.data.filter(contact => contact.contactType === utils.CONTACT_TYPES.Freelancer).length
            });
        }).finally(() => {
            companyService.getCompanies().then(response => {
                setCompanies({ all: response.data.length });
            }).finally(() => setLoading(false));
        });
    }, []);

    return (
        <>
            {
                loading ?
                    <div className="mx-3 mt-2 grid-4x25"> {
                        [...Array(4)].map(() =>
                            <Stack spacing={1} className="mx-1">
                                <Skeleton variant="text" width={200} />
                                <Skeleton variant="rectangular" height={60} sx={{ borderRadius: "5px" }} />
                            </Stack>
                        )
                    }</div> :
                    <div className="mx-3 grid-4x25" >
                        <DashbordBoxItem title="Total companies" icon="bi bi-building" count={companies.all} className="me-3" />
                        <DashbordBoxItem title="Total contacts" icon="bi bi-person" count={contacts.all} className="me-3" />
                        <DashbordBoxItem title="Total Employees" icon="bi bi-person-check" count={contacts.employees} className="me-3" />
                        <DashbordBoxItem title="Total Freelancers" icon="bi bi-person-workspace" count={contacts.freelancers} />
                    </div>
            }
        </>
    );
}


const DashbordBoxItem = (props) => {
    const { className, title, count, icon } = props;
    return <div className={`card shadow-sm mt-1 dashboard-item ${className}`}>
        <div className="card-body p-3 d-flex justify-content-between mx-2">
            <div>
                <span>{title}</span>
                <div style={{ fontWeight: "bold" }}>
                    ({count})
                </div>
            </div>
            <div className='icon-box-circle'>
                <div className='mt-1'>
                    <i className={icon} style={{ fontSize: "20px" }} />
                </div>
            </div>
        </div>
    </div>
}