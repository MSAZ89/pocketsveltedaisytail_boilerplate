import PocketBase from 'pocketbase';
import type { RecordModel } from 'pocketbase';

// Create a reactive state object
export const auth = $state({
	user: null as RecordModel | null,
	isAuthenticated: false
});

// Initialize PocketBase client
const pb = new PocketBase('http://127.0.0.1:8090');

// Check initial authentication state
if (pb.authStore.isValid) {
	auth.user = pb.authStore.model;
	auth.isAuthenticated = true;
}

// Listen for auth changes
pb.authStore.onChange((_, model) => {
	auth.user = model;
	auth.isAuthenticated = !!model;
});

export const login = async (email: string, password: string) => {
	try {
		const authData = await pb.collection('users').authWithPassword(email, password);
		auth.user = authData.record;
		auth.isAuthenticated = true;
		console.error('Login Success:', authData);
		return authData;
	} catch (error) {
		console.error('Login failed:', error);
		throw error;
	}
};

export const signup = async (email: string, password: string) => {
	try {
		// Create a new user in the 'users' collection
		const record = await pb.collection('users').create({
			email: email,
			password: password,
			passwordConfirm: password
		});
		// Optionally authenticate the user after signup
		const authData = await pb.collection('users').authWithPassword(email, password);
		auth.user = authData.record;
	} catch (error) {
		throw error;
	}
};

export const logout = async () => {
	pb.authStore.clear();
	auth.user = null;
	auth.isAuthenticated = false;
	location.pathname = '/login';
};

export default pb;
