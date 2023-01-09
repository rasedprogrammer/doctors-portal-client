import React, { createContext, useEffect, useState } from "react";
import {
	createUserWithEmailAndPassword,
	getAuth,
	onAuthStateChanged,
	signInWithEmailAndPassword,
	signOut,
	updateProfile,
} from "firebase/auth";
import app from "../firebase/firebase.config";

export const AuthContext = createContext();
const auth = getAuth(app);

const AuthProvier = ({ children }) => {
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);

	// Create User Firebase
	const createUser = (email, password) => {
		setLoading(true);
		return createUserWithEmailAndPassword(auth, email, password);
	};

	// SignIn User Firebase
	const login = (email, password) => {
		setLoading(true);
		return signInWithEmailAndPassword(auth, email, password);
	};

	// Update User Name Firebase
	const updateUserName = (userInfo) => {
		setLoading(true);
		return updateProfile(auth.currentUser, userInfo);
	};

	// Sign Out User Firebase
	const logout = () => {
		setLoading(true);
		return signOut(auth);
	};

	//Auth State Observer
	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
			console.log("user observing");
			setUser(currentUser);
			setLoading(false);
		});

		return () => unsubscribe();
	}, []);

	// firebase user creation data
	const authInfo = { createUser, login, updateUserName, user, logout, loading };
	return (
		<AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
	);
};

export default AuthProvier;
