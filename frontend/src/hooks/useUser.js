import { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const useUser = () => {
	const [user, setUser] = useState(null);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		// "unsubscribe" is used to unsubscribe the user sign-in state changes from the firebase to prevent data leak.
		const unsubscribe = onAuthStateChanged(getAuth(), (user) => {
			setUser(user);
			setIsLoading(false);
		});

		// When the user that is using this hook ("useUser") navigate away from the page, React will call the unsubscribe function.
		return unsubscribe;
	}, []);

	return { user, isLoading };
};

export default useUser;
