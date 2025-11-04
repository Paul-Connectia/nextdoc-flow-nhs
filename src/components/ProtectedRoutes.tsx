import { useAuth } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { LoadingSpinner } from './LoadingSkeleton';

export default function ProtectedRoute({ children }) {
	const { isSignedIn, isLoaded } = useAuth();
	const navigate = useNavigate();

	console.log(isSignedIn)

	useEffect(() => {
		if (isLoaded && !isSignedIn) {
			navigate('/login'); // Redirect to sign-in if not authenticated
		}
	}, [isSignedIn, isLoaded, navigate, window.location.href]);

	if (!isLoaded) {
		return <LoadingSpinner />;
	}

	return isSignedIn ? children : null;
}