import React from 'react';
import MuiDataTable from "mui-datatables";

export const DataTable = (props) => {
    
    const { columns, data } = props;

    const options = {
        filter: true,
        responsive: 'vertical',
        selectableRows: false,
        download: false,
        print: false,
    }

    return (
        <div className='card shadow m-4'>
            <MuiDataTable title={<>Contact list</>} columns={columns} data={data} options={options} />
        </div>
    );
}