

import { initializeApp, cert } from "firebase-admin/app";
import serviceAccount from "../serviceaccountKey.json" with { type: "json" };

export const app = initializeApp({
    credential: cert(serviceAccount),
});