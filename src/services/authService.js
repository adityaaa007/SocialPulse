import { auth } from "./firebaseApp";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  signOut,
} from "firebase/auth";

class AuthService {
  async createUser({ email, password }) {
    return await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        return user;
      })
      .catch((error) => {
        const errorMessage = error.message;
        console.log("CreateUser error: " + errorMessage);
        throw error;
      });
  }

  async loginWithEmail({ email, password }) {
    return await signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        return user;
      })
      .catch((error) => {
        const errorMessage = error.message;
        console.log("Login error: " + errorMessage);
        throw error;
      });
  }

  async updateUserProfile({ name }) {
    return await updateProfile(auth.currentUser, {
      displayName:
        name /* photoURL: "https://example.com/jane-q-user/profile.jpg" */,
    })
      .then(() => {
        // Profile updated!
        const currentUser = auth.currentUser;
        return currentUser;
      })
      .catch((error) => {
        console.log("Update profile error: " + error);
        throw error;
      });
  }

  async logout() {
    return await signOut(auth)
      .then(() => {
        // Sign-out successful
        console.log("Signed out successfully");
        return true;
        // this.dispatch(logout());
      })
      .catch((error) => {
        // An error happened.
        console.log("Logout error: " + error);
        throw error;
      });
  }
}

const authService = new AuthService();
export default authService;
