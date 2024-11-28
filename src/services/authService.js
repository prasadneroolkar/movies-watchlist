import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth } from "./firebase";

// Sign up a new user
const signUp = async (email) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      "defaultPassword"
    );
    return userCredential.user;
  } catch (error) {
    console.error("Error signing up:", error.message);
    throw error;
  }
};

// Log in an existing user
const logIn = async (email) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      "defaultPassword"
    );
    return userCredential.user;
  } catch (error) {
    console.error("Error logging in:", error.message);
    throw error;
  }
};

// Log out the current user
const logOut = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error("Error logging out:", error.message);
    throw error;
  }
};

export { signUp, logIn, logOut };
