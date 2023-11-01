import { useState, useEffect } from "react";
import { getFirestore } from "firebase/firestore";
import isUserPremium from "./isUserPremium";



export default function userPremiumStatus(user: firebase.User){
    const [premiumStatus, setPremiumStatus] = useState<boolean>(false)
}