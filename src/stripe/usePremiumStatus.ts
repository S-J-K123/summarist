import { useState, useEffect } from "react";
import { getFirestore } from "firebase/firestore";
import { User } from "firebase/auth";
import isUserPremium from "./isUserPremium";

export default function userPremiumStatus(user: User) {
  const [premiumStatus, setPremiumStatus] = useState<boolean>(false);

  useEffect(() => {
    if (user) {
      const checkPremiumStatus = async function () {
        setPremiumStatus(await isUserPremium(user));
      };
      checkPremiumStatus();
    }
  }, [user]);
  return premiumStatus;
}