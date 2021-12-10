import React from "react";
import CheckoutForm from "../components/checkout-form";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, ElementsConsumer } from "@stripe/react-stripe-js";
import { config } from "../config";

// page de paiement
class Payment extends React.Component {
  constructor(props) {
    super(props);
  }

  InjectedCheckoutForm = () => {
    // chargement du formulaire de carte bleue
    return (
      <ElementsConsumer>
        {({ stripe, elements }) => (
          <CheckoutForm
            orderId={this.props.params.orderId}
            stripe={stripe}
            elements={elements}
          />
        )}
      </ElementsConsumer>
    );
  };

  render() {
    const stripePromise = loadStripe(config.stripe_key);

    return (
      <div>
        <h2>Paiement</h2>
        <Elements stripe={stripePromise}>
          {this.InjectedCheckoutForm()}
        </Elements>
      </div>
    );
  }
}

export default Payment;
