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
        rowsPerPage: [5],
        rowsPerPageOptions: [3, 5, 10, 15],
        jumpToPage: true,
        textLabels: {
            pagination: {
                next: "Next >",
                previous: "< Previous",
                rowsPerPage: "Total items Per Page",
                displayRows: "OF"
            }
        }
    }

    return (
        <div className='card shadow-sm m-3'>
            <MuiDataTable
                title={header}
                columns={columns}
                data={data}
                options={options} />
        </div>
    );
}