import { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";

// A custom hook to synchronize the user's sign-in state between React components
const useUser = () => {
	const [user, setUser] = useState(null);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		// "unsubscribe" is used to unsubscribe the user sign-in state changes from the Firebase to prevent data leak.
		const unsubscribe = onAuthStateChanged(getAuth(), (userAccount) => {
			setUser(userAccount);
			setIsLoading(false);
		});

		// When the user that is using this hook ("useUser") navigates away from the page, React will call the unsubscribe function.
		return unsubscribe;
	}, []);

	return { user, isLoading };
};

export default useUser;
