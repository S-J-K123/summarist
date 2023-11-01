import {Stripe, loadStripe } from "@stripe/stripe-js"

let  stripePromise: Stripe | null;


const initializeStripe = async () => {
    if (!stripePromise) {
        stripePromise = await loadStripe(
            "pk_test_51O737nIF9ewxL6S0xo33IxqyXtsjtl3lFWuuQVF0FxJLCzfi99sBTdSuGwVQQIRh9GJQ1v2FZ7IkfRVXoIDjEGOJ00CKddr6mY"
        )
    }
}