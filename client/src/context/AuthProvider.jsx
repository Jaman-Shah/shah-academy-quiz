import axios from "axios";
import { createContext, useEffect, useState } from "react";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth } from "../firebase/firebase.config";
import { apiBaseUrl } from "../hooks/useAxiosCommon";

export const AuthContext = createContext(null);

const googleProvider = new GoogleAuthProvider();

const getAuthorizationHeader = async (firebaseUser) => {
  const token = await firebaseUser.getIdToken();
  return {
    authorization: `Bearer ${token}`,
  };
};

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [dbUser, setDbUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const syncUser = async (firebaseUser, extraData = {}) => {
    if (!firebaseUser) {
      return null;
    }

    const headers = await getAuthorizationHeader(firebaseUser);
    const response = await axios.post(
      `${apiBaseUrl}/users`,
      {
        name: extraData.name || firebaseUser.displayName || "",
        className: extraData.className || "",
        provider:
          extraData.provider ||
          firebaseUser.providerData?.[0]?.providerId ||
          "password",
        photoURL: firebaseUser.photoURL || "",
      },
      { headers }
    );

    setDbUser(response.data);
    return response.data;
  };

  const refreshDbUser = async (firebaseUser = auth.currentUser) => {
    if (!firebaseUser) {
      setDbUser(null);
      return null;
    }

    const headers = await getAuthorizationHeader(firebaseUser);
    const response = await axios.get(`${apiBaseUrl}/users/me`, { headers });
    setDbUser(response.data);
    return response.data;
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setLoading(true);
      setUser(currentUser);

      if (!currentUser) {
        setDbUser(null);
        setLoading(false);
        return;
      }

      try {
        await syncUser(currentUser);
      } catch (error) {
        console.log(error.message);
        setDbUser(null);
      } finally {
        setLoading(false);
      }
    });

    return unsubscribe;
  }, []);

  const createUser = async ({ name, className, email, password }) => {
    setLoading(true);
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(result.user, { displayName: name });
      const profile = await syncUser(auth.currentUser || result.user, {
        name,
        className,
        provider: "password",
      });
      return { result, profile };
    } finally {
      setLoading(false);
    }
  };

  const loginUser = async (email, password) => {
    setLoading(true);
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      const profile = await syncUser(result.user, { provider: "password" });
      return { result, profile };
    } finally {
      setLoading(false);
    }
  };

  const signInWithGoogle = async () => {
    setLoading(true);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const profile = await syncUser(result.user, { provider: "google" });
      return { result, profile };
    } finally {
      setLoading(false);
    }
  };

  const updateUserProfileData = async ({ name, className, photoURL }) => {
    if (!auth.currentUser) {
      return null;
    }

    setLoading(true);
    try {
      const profileUpdates = {};
      if (name) {
        profileUpdates.displayName = name;
      }
      if (
        typeof photoURL === "string" &&
        photoURL.trim() &&
        /^https?:\/\//i.test(photoURL.trim())
      ) {
        profileUpdates.photoURL = photoURL.trim();
      }

      if (Object.keys(profileUpdates).length) {
        await updateProfile(auth.currentUser, profileUpdates);
      }

      const headers = await getAuthorizationHeader(auth.currentUser);
      const response = await axios.patch(
        `${apiBaseUrl}/users/me`,
        { name, className, photoURL },
        { headers }
      );

      setUser(auth.currentUser);
      setDbUser(response.data);
      return response.data;
    } finally {
      setLoading(false);
    }
  };

  const logoutUser = async () => {
    setLoading(true);
    try {
      await signOut(auth);
    } finally {
      setLoading(false);
    }
  };

  const authInfo = {
    user,
    dbUser,
    loading,
    createUser,
    loginUser,
    signInWithGoogle,
    updateUserProfileData,
    refreshDbUser,
    logoutUser,
  };

  return <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
