import * as bookcarsTypes from ":bookcars-types";
import * as bookcarsHelper from ":bookcars-helper";
import * as helper from "../common/helper";
import { strings as commonStrings } from "../lang/common";
import { strings as blStrings } from "../lang/booking-list";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Tooltip } from "@mui/material";
import { Delete as DeleteIcon } from "@mui/icons-material";
import { format } from "date-fns";
import { DataGrid, GridColDef, GridRenderCellParams, GridRowId } from "@mui/x-data-grid";
import { useState } from "react";
import * as BookingService from "../services/BookingService";

interface BookingPaymentListProps {
  payments: bookcarsTypes.Payment[];
  language: string;
  onAddPayment?: () => void;
  onDeletePaymentSuccess: () => void;
}

const BookingPaymentList = ({ payments, language, onAddPayment, onDeletePaymentSuccess }: BookingPaymentListProps) => {
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [selectedId, setSelectedId] = useState("");

  const handleDeletePayment = async () => {
    try {
      const _status = await BookingService.deletePayment(selectedId);

      if (_status === 200) {
        onDeletePaymentSuccess();
      } else {
        helper.error();
      }

      setOpenDeleteDialog(false);
    } catch (err) {
      helper.error(err);
    }
  };

  const _columns: GridColDef<bookcarsTypes.Payment>[] = [
    {
      field: "createdAt",
      headerName: commonStrings.DATE,
      flex: 1,
      valueGetter: (value?: string) => (value ? format(new Date(value), "dd-MM-yyyy") : ""),
    },
    {
      field: "amount",
      headerName: blStrings.AMOUNT,
      flex: 1,
      // renderCell: ({ value }: GridRenderCellParams<bookcarsTypes.Booking, string>) => <span className="bp">{value}</span>,
      valueGetter: (value: number) => bookcarsHelper.formatPrice(value, commonStrings.CURRENCY, language as string),
    },
    {
      field: "paymentType",
      headerName: commonStrings.TYPE,
      flex: 1,
      valueGetter: (value: string) => helper.getPaymentType(value),
    },
    {
      field: "action",
      headerName: "",
      sortable: false,
      disableColumnMenu: true,
      renderCell: ({ row }: GridRenderCellParams<bookcarsTypes.Payment>) => {
        const handleDelete = (e: React.MouseEvent<HTMLElement>) => {
          e.stopPropagation(); // don't select this row after clicking
          setSelectedId(row._id || "");
          setOpenDeleteDialog(true);
        };

        return (
          <div>
            <Tooltip title={commonStrings.DELETE}>
              <IconButton onClick={handleDelete}>
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          </div>
        );
      },
    },
  ];

  return (
    <section className="payments car car-list">
      <article className="payment">
        <div className="name">
          <h2>Pagos</h2>
        </div>
        {/* <table className="payments-table">
          <thead>
            <tr>
              <th>Fecha</th>
              <th>Monto</th>
              <th>Tipo</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((payment) => {
              return (
                <tr key={payment._id}>
                  <td>{payment.createdAt ? format(new Date(payment.createdAt), "dd/MM/yyyy") : ""}</td>
                  <td>{`${bookcarsHelper.formatPrice(payment.amount!, commonStrings.CURRENCY, language as string)}`}</td>
                  <td>{helper.getPaymentType(payment.paymentType)}</td>
                </tr>
              );
            })}
            
          </tbody>
        </table> */}
        <DataGrid
          //checkboxSelection={checkboxSelection}
          hideFooter
          getRowId={(row: bookcarsTypes.Payment): GridRowId => row._id as GridRowId}
          columns={_columns}
          rows={payments}
          // rowCount={rowCount}
          // loading={loading}
          // initialState={{
          //   pagination: {
          //     paginationModel: { pageSize: env.BOOKINGS_PAGE_SIZE },
          //   },
          // }}
          // pageSizeOptions={[env.BOOKINGS_PAGE_SIZE, 50, 100]}
          // pagination
          // paginationMode="server"
          // paginationModel={paginationModel}
          // onPaginationModelChange={setPaginationModel}
          // onRowSelectionModelChange={(_selectedIds) => {
          //   setSelectedIds(Array.from(new Set(_selectedIds)).map((id) => id.toString()));
          // }}
          // disableRowSelectionOnClick
          className="booking-grid"
        />
        <div className="buttons">
          <Button variant="contained" className="btn-primary btn-margin-bottom" size="small" onClick={onAddPayment}>
            {blStrings.ADD_PAYMENT}
          </Button>
        </div>
      </article>
      <Dialog disableEscapeKeyDown maxWidth="xs" open={openDeleteDialog}>
        <DialogTitle className="dialog-header">{commonStrings.CONFIRM_TITLE}</DialogTitle>
        <DialogContent className="dialog-content">{blStrings.DELETE_PAYMENT}</DialogContent>
        <DialogActions className="dialog-actions">
          <Button onClick={() => setOpenDeleteDialog(false)} variant="contained" className="btn-secondary">
            {commonStrings.CANCEL}
          </Button>
          <Button onClick={handleDeletePayment} variant="contained" color="error">
            {commonStrings.DELETE}
          </Button>
        </DialogActions>
      </Dialog>
    </section>
  );
};

export default BookingPaymentList;
