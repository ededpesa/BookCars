import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { strings } from "../lang/checkout";
import Layout from "../components/Layout";
import NoMatch from "./NoMatch";
import * as StripeService from "../services/StripeService";
import Info from "./Info";

const CheckoutSession = () => {
  return (
    <Layout>
      <Info message={strings.SUCCESS_SHORT} />
    </Layout>
  );
};

export default CheckoutSession;
