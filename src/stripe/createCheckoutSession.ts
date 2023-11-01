import { FirebaseApp } from "firebase/app";
import getStripe from "../stripe/initializeStripe";

export async function createCheckoutSession(uid: string) {
  const firestore = firebase.firestore();

  const createCheckoutSessionRef = await firestore
    .collection("users")
    .doc(uid)
    .collection("checkout_sessions")
    .add({
      price: "price_1O7lWVIF9ewxL6S04FCbuZGz",
      success_url: window.location.origin,
      cancel_url: window.location.origin,
    });

  checkoutSessionRef.onSnapshot(async (snap) => {
    const { sessionId } = snap.data();
    if (sessionId) {
        const Stripe = await getStripe();
        stripe.redirectToCheckout({ sessionId })
    }
  });
}
