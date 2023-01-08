import React, { createContext, useEffect, useState } from "react";
import {
	createUserWithEmailAndPassword,
	getAuth,
	onAuthStateChanged,
	signInWithEmailAndPassword,
	signOut,
} from "firebase/auth";
import app from "../firebase/firebase.config";

export const AuthContext = createContext();
const auth = getAuth(app);

const AuthProvier = ({ children }) => {
	const [user, setUser] = useState(null);
	// Create User Firebase
	const createUser = (email, password) => {
		return createUserWithEmailAndPassword(auth, email, password);
	};

	// SignIn User Firebase
	const login = (email, password) => {
		return signInWithEmailAndPassword(auth, email, password);
	};

	// Sign Out User Firebase
	const logout = () => {
		return signOut(auth);
	};

	//Auth State Observer
	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
			console.log("user Observer");
			setUser(currentUser);
		});
		return () => unsubscribe();
	}, []);

	// firebase user creation data
	const authInfo = { createUser, login, user, logout };
	return (
		<AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
	);
};

export default AuthProvier;
