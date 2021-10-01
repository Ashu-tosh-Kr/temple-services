// import axios from "axios";
import { Formik, Form } from "formik";
import React, { useEffect, useState } from "react";
import "./PaymentModal.styles.scss";
import * as Yup from "yup";
import InputField from "../formComponents/InputField";
import { Grid, Typography, Button, Modal, Box } from "@mui/material";
import DatePicker from "../formComponents/DatePicker";

const validationSchema = Yup.object({
  cardNumber: Yup.string().required("Required"),
  expires: Yup.string().required("Required"),
  cvv: Yup.string().matches(/\d{3}/, "Invalid CVV").required("Required"),
  firstName: Yup.string().required("Required"),
  lastName: Yup.string().required("Required"),
  street: Yup.string().required("Required"),
  city: Yup.string().required("Required"),
  state: Yup.string().required("Required"),
  zip: Yup.string().required("Required"),
  phone: Yup.string().required("Required"),
  email: Yup.string().email("Invalid Email").required("Required"),
});

export default function PaymentModal({ openPayModal, setOpenPayModal }) {
  const [sdkReady, setSdkReady] = useState(false);

  const initialValues = {
    cardNumber: "",
    expires: new Date(),
    cvv: "",
    firstName: "",
    lastName: "",
    street: "",
    city: "",
    state: "",
    zip: "",
    phone: "",
    email: "",
  };

  const style = {
    minWidth: "20rem",
    width: "60%",
    overflowY: "scroll",
    maxHeight: "95vh",
    bgcolor: "background.paper",
    borderRadius: "8px",
    boxShadow: 24,
    p: 4,
  };
  useEffect(() => {
    const addPayPalScript = async () => {
      // const { data } = await axios.get("/api/config/paypal");
      const data = {
        clientToken: "",
      };
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src = `https://www.paypal.com/sdk/js?client-id=AZyy6akAuprcwc7ii-Rd3q7kIl-7HIjIwNJAkMur2jbEb3tAPnAfTTdN7Ciz5xwfGIu4ZxCtBPbeWpFe`;
      script.setAttribute("data-client-token", `${data.clientToken}`);
      script.async = true;
      script.onload = () => {
        setSdkReady(true);
      };
      document.body.appendChild(script);
    };
    addPayPalScript();
  }, []);

  const onSubmit = (values) => {
    console.log(values);
  };

  if (!sdkReady) {
    return <div className="">Loading</div>;
  }
  // If the payment has been made
  if (false) {
    return <div>Payment successful.!</div>;
  }

  // If any error occurs
  if (false) {
    return <div>Error Occurred in processing payment.! Please try again.</div>;
  }

  // Default Render
  return (
    <>
      <Modal
        sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
        open={openPayModal}
        onClose={() => setOpenPayModal(false)}
        aria-labelledby="payments-modal"
        aria-describedby="Enter credit card details to checkout"
      >
        <Box sx={style}>
          <Grid container spacing={2} sx={{ marginBottom: "1rem" }}>
            <Grid item xs={12}>
              <Typography
                style={{ textAlign: "center", lineHeight: "0.25em" }}
                variant="h4"
              >
                Amount
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography style={{ textAlign: "center" }} variant="h2">
                {"$300"}
              </Typography>
            </Grid>
          </Grid>

          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            {(formik) => {
              // console.log(formik.values.expires);
              return (
                <Form>
                  <Grid container spacing={2}>
                    <Grid item xs={12} lg={6}>
                      <Grid container spacing={2}>
                        <Grid item xs={12}>
                          <Typography>Billing Address </Typography>
                        </Grid>
                        <Grid item xs={12}>
                          <InputField name="street" label="Street" />
                        </Grid>
                        <Grid item xs={12}>
                          <InputField name="city" label="City" />
                        </Grid>

                        <Grid item xs={8}>
                          <InputField name="state" label="State" />
                        </Grid>
                        <Grid item xs={4}>
                          <InputField name="zip" label="ZIP Code" />
                        </Grid>

                        <Grid item xs={12}>
                          <Typography>Contact Info</Typography>
                        </Grid>
                        <Grid item xs={12}>
                          <InputField name="phone" label="Phone Number" />
                        </Grid>
                        <Grid item xs={12}>
                          <InputField name="email" label="Email" />
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={12} lg={6}>
                      <Grid spacing={2} container>
                        <Grid item xs={12}>
                          <Typography>Card Details</Typography>
                        </Grid>
                        <Grid item xs={12}>
                          <InputField name="cardNumber" label="Card Number" />
                        </Grid>
                        <Grid item xs={7}>
                          <DatePicker
                            name="expires"
                            label="Expires"
                            // inputFormat="mm/yyyy"
                            views={["year", "month"]}
                          />
                        </Grid>
                        <Grid item xs={5}>
                          <InputField name="cvv" label="CVV" />
                        </Grid>
                        <Grid item xs={6}>
                          <InputField name="firstName" label="First Name" />
                        </Grid>
                        <Grid item xs={6}>
                          <InputField name="lastName" label="Last Name" />
                        </Grid>
                      </Grid>
                      <Button
                        type="submit"
                        size="large"
                        sx={{ marginTop: "1rem" }}
                        variant="contained"
                        fullWidth
                      >
                        Proceed
                      </Button>
                    </Grid>
                  </Grid>
                </Form>
              );
            }}
          </Formik>
        </Box>
      </Modal>
    </>
  );
}
