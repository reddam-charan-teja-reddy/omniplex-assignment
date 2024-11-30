// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const errorConfig = {
	apiKey: 'AIzaSyAy4mtHIdPsVtwWMM4VucvAzcGcxlcAPOE',
	authDomain: 'error-logger-724d5.firebaseapp.com',
	projectId: 'error-logger-724d5',
	storageBucket: 'error-logger-724d5.firebasestorage.app',
	messagingSenderId: '547350201882',
	appId: '1:547350201882:web:d30385b9df2f80aaccb3a3',
	measurementId: 'G-L7G4J1HWDT',
};

// Initialize Firebase
const errApp = initializeApp(errorConfig);
const analytics = getAnalytics(app);

const errordb = getFirestore(app);
const errStorage = getStorage(app);

export { errordb, errStorage };

export const initializeErrorFirebase = () => {
	return errApp;
};
