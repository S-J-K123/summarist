import { User } from "firebase/auth";


export default async function isUserPremium(
    user: User | null
) : Promise<boolean> {
    if (!user) return false; // handle the case when user is null
    await user.getIdToken(true);
    const decodedToken = await user.getIdTokenResult();
    const stripeRole = decodedToken.claims.stripeRole as boolean;
    return stripeRole;
}