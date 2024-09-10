import { Button, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from "@mui/material";
import * as bookcarsTypes from ":bookcars-types";
import * as helper from "../common/helper";
import { strings as commonStrings } from "../lang/common";
import { strings as blStrings } from "../lang/booking-list";
import { useState } from "react";
import * as BookingService from "../services/BookingService";

interface AddPaymentFormProps {
  onClose: () => void;
  bookingId: string;
  onSuccess: () => void;
}

export const AddPaymentForm = ({ onClose, bookingId, onSuccess }: AddPaymentFormProps) => {
  const [type, setType] = useState("");
  const [amount, setAmount] = useState("");
  const [ref, setRef] = useState("");

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(e.target.value);
  };

  const handleTypeChange = (e: SelectChangeEvent<string>) => {
    setType(e.target.value);
  };

  const handleRefChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRef(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const payload: bookcarsTypes.InsertPaymentPayload = {
        booking: bookingId,
        paymentType: type,
        amount: Number(amount),
        ref: ref,
      };

      const _status = await BookingService.insertPayment(payload);
      onSuccess();
      onClose();
    } catch (err) {
      helper.error(err);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <FormControl fullWidth margin="dense" variant="standard">
          <InputLabel className="required">{commonStrings.TYPE}</InputLabel>
          <Select label={commonStrings.TYPE} value={type} onChange={handleTypeChange} required fullWidth>
            <MenuItem value={bookcarsTypes.PaymentType.CardPayment}>{helper.getPaymentType(bookcarsTypes.PaymentType.CardPayment)}</MenuItem>
            <MenuItem value={bookcarsTypes.PaymentType.MobilePayment}>{helper.getPaymentType(bookcarsTypes.PaymentType.MobilePayment)}</MenuItem>
            <MenuItem value={bookcarsTypes.PaymentType.WalletPayment}>{helper.getPaymentType(bookcarsTypes.PaymentType.WalletPayment)}</MenuItem>
            <MenuItem value={bookcarsTypes.PaymentType.Cash}>{helper.getPaymentType(bookcarsTypes.PaymentType.Cash)}</MenuItem>
            <MenuItem value={bookcarsTypes.PaymentType.PointOfSell}>{helper.getPaymentType(bookcarsTypes.PaymentType.PointOfSell)}</MenuItem>
          </Select>
        </FormControl>
        <FormControl fullWidth margin="dense">
          <TextField
            label={blStrings.AMOUNT}
            inputProps={{ inputMode: "numeric", pattern: "^\\d+(.\\d+)?$" }}
            type="number"
            onChange={handleAmountChange}
            required
            variant="standard"
            autoComplete="off"
            value={amount}
          />
        </FormControl>
        <FormControl fullWidth margin="dense">
          <TextField label={blStrings.REF} onChange={handleRefChange} variant="standard" autoComplete="off" value={ref} />
        </FormControl>
        <div className="buttons">
          <Button variant="contained" type="submit" className="btn-primary btn-margin-bottom" size="small">
            {commonStrings.SAVE}
          </Button>
          <Button variant="contained" type="button" className="btn-secondary btn-margin-bottom margin-right-0" size="small" onClick={onClose}>
            {commonStrings.CANCEL}
          </Button>
        </div>
      </form>
    </>
  );
};
