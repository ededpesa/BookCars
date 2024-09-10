import * as bookcarsTypes from ":bookcars-types";
import * as bookcarsHelper from ":bookcars-helper";
import * as helper from "../common/helper";
import { strings as commonStrings } from "../lang/common";
import { strings as blStrings } from "../lang/booking-list";
import { Button } from "@mui/material";
import { format } from "date-fns";

interface BookingPaymentListProps {
  payments: bookcarsTypes.Payment[];
  language: string;
  onAddPayment?: () => void;
}

const BookingPaymentList = ({ payments, language, onAddPayment }: BookingPaymentListProps) => {
  return (
    <section className="payments car car-list">
      <article className="payment">
        <div className="name">
          <h2>Pagos</h2>
        </div>
        <table className="payments-table">
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
        </table>
        <div className="buttons">
          <Button variant="contained" className="btn-primary btn-margin-bottom" size="small" onClick={onAddPayment}>
            {blStrings.ADD_PAYMENT}
          </Button>
        </div>
      </article>
    </section>
  );
};

export default BookingPaymentList;
