import React from 'react';
import MuiDataTable from "mui-datatables";
import { IconBtn } from "components/shared";
import jwtWorker from 'utils/jwt-worker';
import utils from "utils";

export const DataTable = (props) => {

    const { header, columns, data } = props;

    const options = {
        filter: true,
        responsive: 'vertical',
        selectableRows: 'none',
        download: false,
        print: false,
        rowsPerPage: [10],
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

export const TableActionsTemplate = (props) => {
    return <div className='d-flex'>
        <IconBtn
            title="Preview"
            icon="bi bi-eye-fill"
            color="success"
            onClick={props.previewCallback} />
        {
            jwtWorker.hasRole(utils.ROLES.Admin) &&
            <>
                <IconBtn
                    title="Assign"
                    icon="bi bi-gear-wide-connected"
                    color="primary"
                    onClick={props.assignCallback} />
                <IconBtn
                    title="Edit"
                    icon="bi bi-pencil-fill"
                    color="secondary"
                    onClick={props.editCallback} />
                <IconBtn
                    title="Delete"
                    icon="bi bi-trash"
                    color="error"
                    onClick={props.deleteCallback} />
            </>
        }
    </div>
}