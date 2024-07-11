import { auth } from "../utils/db.server";
import { createUserWithEmailAndPassword } from "firebase/auth";

export async function createAccount(email: string, password: string) {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    throw new Error(error);
  }
}