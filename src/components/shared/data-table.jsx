import React from 'react';
import MuiDataTable from "mui-datatables";

export const DataTable = (props) => {

    const { header, columns, data } = props;

    const options = {
        filter: true,
        responsive: 'vertical',
        selectableRows: 'none',
        download: false,
        print: false,
    }

    return (
        <div className='card shadow m-4'>
            <MuiDataTable title={header} columns={columns} data={data} options={options} />
        </div>
    );
}