//mongoDB

import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile
} from 'firebase/auth';
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';
import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import '../firebase';
import axios from 'axios';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}


export function AuthProvider({ children }) {
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState();

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  // Sign Up Function
  async function signUp(email, password, userName) {
    const auth = getAuth();
    const firebaseUserCredential = await createUserWithEmailAndPassword(auth, email, password);

    // Profile Update
    await updateProfile(auth.currentUser, {
      displayName: userName
    });

    // Store user in MongoDB
    try {
      await axios.post('/api/users', {
        uid: firebaseUserCredential.user.uid,
        email,
        userName,
        createdAt: new Date().toISOString()
      });
    } catch (error) {
      console.error('Error storing user in MongoDB:', error);
      // Optionally: Handle the error (e.g., delete Firebase user if MongoDB storage fails)
    }

    const user = auth.currentUser;
    setCurrentUser({
      ...user
    });
  }

  // Sign In With Google
  async function signInWithGoogle() {
    const auth = getAuth();
    const provider = new GoogleAuthProvider();

    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // Store user in MongoDB
      try {
        const response = await axios.post('/api/auth/google-auth', {
          uid: user.uid,
          email: user.email,
          userName: user.displayName,
          photoURL: user.photoURL,
          createdAt: new Date().toISOString()
        });
        
        if (response.status === 201 || response.status === 200) {
          setCurrentUser(user);
          return user;
        }
      } catch (error) {
        console.error('Error storing Google user in MongoDB:', error);
        // Optionally handle the error (e.g., show error message to user)
      }
    } catch (error) {
      console.error('Google Sign In Error:', error);
      throw error;
    }
  }

  // Update User Name Function
  async function updateUserName(displayName) {
    const auth = getAuth();
    await updateProfile(auth.currentUser, { displayName });
    
    // Update MongoDB
    try {
      await axios.put(`/api/users/${auth.currentUser.uid}`, {
        userName: displayName
      });
    } catch (error) {
      console.error('Error updating user in MongoDB:', error);
    }
  }

  // Update Profile Image Function
  async function updateProfileImage(imageFile) {
    const auth = getAuth();
    const storage = getStorage();
    const fileRef = ref(storage, auth.currentUser.uid);
    await uploadBytes(fileRef, imageFile);
    const photoURL = await getDownloadURL(fileRef);

    await updateProfile(auth.currentUser, { photoURL });

    // Update MongoDB
    try {
      await axios.put(`/api/users/${auth.currentUser.uid}`, {
        photoURL
      });
    } catch (error) {
      console.error('Error updating profile image in MongoDB:', error);
    }
  }

  // Log In Function
  function logIn(email, password) {
    const auth = getAuth();
    return signInWithEmailAndPassword(auth, email, password);
  }

  // Log Out Function
  function logOut() {
    const auth = getAuth();
    return signOut(auth);
  }

  // Reset Password Function
  async function resetPassword(email) {
    const auth = getAuth();
    await sendPasswordResetEmail(auth, email);
  }

  const memoValue = useMemo(
    () => ({
      currentUser,
      signUp,
      logIn,
      logOut,
      resetPassword,
      updateUserName,
      signInWithGoogle,
      updateProfileImage
    }),
    [currentUser]
  );
  return <AuthContext.Provider value={memoValue}>{!loading && children}</AuthContext.Provider>;
}
