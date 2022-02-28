import React from 'react';
import { WithLoadingComponent } from 'components/shared';
import companyService from 'service/company-service';
import { WrappedCompanyList } from 'components/pages/company/company-list';
import utils from "utils";

export const CompanyPage = () => {
    const [refresh, setRefresh] = React.useState();
    return <CompanyListHoc shouldRefresh={(val) => setRefresh(val)} refresh={refresh} />
}

const CompanyListHoc = (props) => {
    const WithLoadingHoc = React.useMemo(() => WithLoadingComponent(WrappedCompanyList, () => companyService.getCompanies(), utils.WrappedLoader({ sm: false }))(props), [props.refresh]);
    return <WithLoadingHoc />
}