import { getFirestore } from "firebase/firestore";
import { addDoc, collection, doc, onSnapshot } from "firebase/firestore";
import getStripe from "./initializeStripe";

export default async function createYearlyCheckoutSession(uid: string) {
  const firestore = getFirestore();

  const createYearlyCheckoutSessionRef = await addDoc(
    collection(firestore, "users", uid, "checkout_sessions"),
    {
      price: "price_1O7lWVIF9ewxL6S04FCbuZGz",
      success_url: window.location.origin + "/ForYou", // Change this to your "For You" page
      cancel_url: window.location.origin + "/Settings"
    }
  );

  onSnapshot(
    doc(firestore, "users", uid, "checkout_sessions", createYearlyCheckoutSessionRef.id),
    async (snap: any) => {
      const { sessionId } = snap.data() as any;
      if(sessionId) {
        const stripe = await getStripe();
        stripe?.redirectToCheckout({ sessionId });
      }
    }
  );
}
