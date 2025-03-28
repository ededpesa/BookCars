import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { loadStripe, Stripe } from "@stripe/stripe-js";
import env from "../config/env.config";
import { strings as commonStrings } from "../lang/common";

import * as bookcarsTypes from ":bookcars-types";
import * as StripeService from "../services/StripeService";

import "../assets/css/checkout.css";
import { EmbeddedCheckout, EmbeddedCheckoutProvider } from "@stripe/react-stripe-js";
import { Button, FormControl, InputLabel, OutlinedInput, Paper } from "@mui/material";

const stripePromise = loadStripe(env.STRIPE_PUBLISHABLE_KEY);

const Payment = () => {
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [language, setLanguage] = useState(env.DEFAULT_LANGUAGE);
  const [amount, setAmount] = useState<number>(0);
  const [sessionCreated, setSessionCreated] = useState(false);

  // Función que se llama cuando se envía el formulario con el monto
  const handleCreateSession = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!amount) {
      alert("Por favor, ingresa un monto válido.");
      return;
    }

    try {
      const payload: bookcarsTypes.CreatePaymentPayload = {
        amount: amount,
        currency: env.STRIPE_CURRENCY_CODE,
        locale: language,
        receiptEmail: env.PAYMENT_EMAIL,
        name: "Pago",
        description: "Upyrental - Pago directo",
        customerName: "Pago User",
        isDirect: true,
      };
      const res = await StripeService.createCheckoutSession(payload);
      setClientSecret(res.clientSecret);
      setSessionCreated(true);
    } catch (error) {
      console.error("Stripe initialization error:", error);
    }
  };

  const onLoad = async () => {
    // Puedes agregar código adicional para onLoad si lo requieres
  };

  return (
    <>
      {!sessionCreated && (
        <Layout onLoad={onLoad} strict={false}>
          <div className="booking">
            <Paper className="booking-form" elevation={10}>
              <div className="payment-form-container">
                <h2 className="text-center" style={{ textAlign: "center" }}>
                  Pago directo
                </h2>
                <form onSubmit={handleCreateSession}>
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <div className="driver-details-form">
                      <FormControl fullWidth margin="dense">
                        <InputLabel className="required">Monto</InputLabel>
                        <OutlinedInput
                          type="text"
                          label={"Monto"}
                          required={true}
                          value={amount}
                          typeof="number"
                          onChange={(e) => {
                            setAmount(Number(e.target.value));
                          }}
                          autoComplete="off"
                        />
                      </FormControl>
                    </div>
                    <div className="">
                      <Button type="submit" variant="contained" className="btn-checkout btn-margin-bottom" size="small">
                        Continuar con el pago
                      </Button>
                    </div>
                  </div>

                  {/* <label htmlFor="amount">Monto (USD):</label> */}
                  {/* <input
                    id="amount"
                    type="number"
                    placeholder="Ingrese el monto"
                    value={amount}
                    onChange={(e) => setAmount(Number(e.target.value))}
                    min="1"
                    required
                  /> */}
                </form>
              </div>
            </Paper>
          </div>
        </Layout>
      )}
      {/* Mostrar EmbeddedCheckout únicamente cuando tengamos stripe y el clientSecret */}
      {stripePromise && clientSecret && sessionCreated && (
        <Layout onLoad={onLoad} strict={false}>
          <div className="booking">
            <Paper className="booking-form" elevation={10}>
              <EmbeddedCheckoutProvider stripe={stripePromise} options={{ clientSecret }}>
                <EmbeddedCheckout />
              </EmbeddedCheckoutProvider>
              <div className="booking-buttons">
                <Button variant="contained" className="btn-cancel btn-margin-bottom" size="small" onClick={() => setSessionCreated(false)}>
                  {commonStrings.CANCEL}
                </Button>
              </div>
            </Paper>
          </div>
        </Layout>
      )}
    </>
  );
};

export default Payment;
