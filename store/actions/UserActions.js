import {
	// 1. CRUD
	CREATE_USER,
	UPDATE_USER,
	DELETE_USER,

	// 2. Directional
	USER_DIRECTION,

	// 3. Status
	USER_LOADING,
	USER_SUCCESS,
	USER_ERROR,

	// 4. Helper
	LOGIN_USER,
	IS_LOGGED_IN,
	SET_USER,
	LOGOUT_USER,
	INITIAL_CATEGORIES
} from '../types.js';

import { AsyncStorage } from 'react-native';
import { app_uri } from '../../constants/env.js';
import axios from 'axios';

/* ----------------------- *\
|  Action File              |
|---------------------------|
|  1. CRUD Actions          |
|  2. Directional Actions   |
|  3. Status Actions        |
|  4. Helper Actions        |
\* ----------------------- */

/* ----------------------- *\
|  1. CRUD Actions          |
\* ----------------------- */

export const createUser = (first_name, last_name, username, password, mode) => {
	return (dispatch) => {
		// Loading for front-end
		dispatch({ type: USER_LOADING, payload: true });

		// POST Params
		const params = {
			first_name: first_name,
			last_name: last_name,
			username: username,
			password: password,
			mode: mode
		};

		// Create POST request
		axios.post(app_uri + '/api/users/create', params).then(function(response) {
			if (response.data['success'] == true) {
				// Save user data
				dispatch({ type: CREATE_USER, payload: response.data['user'] });

				// Save data to device hard drive
				AsyncStorage.setItem('logged_in', JSON.stringify({
					logged_in: true
				}));
				AsyncStorage.setItem('current_user', JSON.stringify({
					current_user: response.data['user']
				}));

				// Directional data
				dispatch({ type: USER_DIRECTION, payload: 'create_user' });
				dispatch({ type: USER_SUCCESS, payload: true });
				dispatch({ type: USER_LOADING, payload: false });
			} else {
				// Directional data
				dispatch({ type: USER_ERROR, payload: response.data['error'] });
				dispatch({ type: USER_LOADING, payload: false });
			}
		}).catch(function(error) {
			// Console log the error
			console.log('[ERROR] - Error within `createUser` action.');
			console.log(error);

			// Directional data
			dispatch({ type: USER_ERROR, payload: error });
			dispatch({ type: USER_LOADING, payload: false });
		});
	};
};

export const updateUser = (user_id, first_name, last_name, username, password, mode) => {
	return (dispatch) => {

		// Construct parameter object
		const params = {
			first_name: first_name,
			last_name: last_name,
			username: username,
			password: password,
			mode: mode
		};

		// Sent POST Request
		axios.post(app_uri + '/api/users/update', params).then(function(response) {
			if (response.data['success'] == true) {
				dispatch({ type: CREATE_USER, payload: response.data['user'] });

				dispatch({ type: USER_DIRECTION, payload: 'update_user' });
				dispatch({ type: USER_SUCCESS, payload: true });
				dispatch({ type: USER_LOADING, payload: false });
			} else {
				dispatch({ type: USER_ERROR, payload: response.data['error'] });
				dispatch({ type: USER_LOADING, payload: false });
			}
		}).catch(function(error) {
			dispatch({ type: USER_ERROR, payload: error });
			dispatch({ type: USER_LOADING, payload: false });
		});


	};
};

export const deleteUser = (user_id) => {
	return (dispatch) => {
		const postVariables = {
			user_id: user_id
		};

		axios.post(app_uri + '/api/users/delete', postVariables).then(function(response) {
			if (response.data['success'] == true) {
				dispatch({ type: DELETE_USER, payload: response.data['user'] });

				dispatch({ type: USER_DIRECTION, payload: 'delete_user' });
				dispatch({ type: USER_SUCCESS, payload: true });
				dispatch({ type: USER_LOADING, payload: false });
			} else {
				dispatch({ type: USER_ERROR, payload: response.data['error'] });
				dispatch({ type: USER_LOADING, payload: false });
			}
		}).catch(function(error) {
			dispatch({ type: USER_ERROR, payload: error });
			dispatch({ type: USER_LOADING, payload: false });
		});
	};
};

/* ----------------------- *\
|  2. Directional Actions   |
\* ----------------------- */

export const userDirection = (direction) => {
	return {
		type: USER_DIRECTION,
		payload: direction
	};
};

/* ----------------------- *\
|  3. Status Actions        |
\* ----------------------- */

export const userLoading = (loading) => {
	return {
		type: USER_LOADING,
		payload: loading
	};
};

export const userSuccess = (success) => {
	return {
		type: USER_SUCCESS,
		payload: success
	};
};

export const userError = (error) => {
	return {
		type: USER_ERROR,
		payload: error
	};
};

/* ----------------------- *\
|  4. Helper Actions        |
\* ----------------------- */

export const loginUser = (username, password) => {
	return (dispatch) => {
		// Loading for front-end
		dispatch({ type: USER_LOADING, payload: true });

		// POST params
		const params = {
			username: username,
			password: password
		};

		// Send POST request
		axios.post(app_uri + '/api/users/login', params).then(function(response) {
			if (response.data['success'] == true) {
				// Save user data
				dispatch({ type: LOGIN_USER, payload: response.data['user'] });

				// Save data to device hard drive
				AsyncStorage.setItem('logged_in', JSON.stringify({
					logged_in: true
				}));
				AsyncStorage.setItem('current_user', JSON.stringify({
					current_user: response.data['user']
				}));

				// Directional data
				dispatch({ type: USER_DIRECTION, payload: 'login_user' });
				dispatch({ type: USER_SUCCESS, payload: true });
				dispatch({ type: USER_LOADING, payload: false });
			} else {
				// Directional data
				dispatch({ type: USER_ERROR, payload: response.data['error'] });
				dispatch({ type: USER_LOADING, payload: false });
			}
		}).catch(function(error) {
			// Console log the error
			console.log('[ERROR] - Error in `loginUser`.');
			console.log(error);

			// Directional data
			dispatch({ type: USER_ERROR, payload: error });
			dispatch({ type: USER_LOADING, payload: false });
		});
	};
};

export const isLoggedIn = (logged_in) => {
	return {
		type: IS_LOGGED_IN,
		payload: logged_in
	};
};

export const setUser = (user) => {
	return {
		type: SET_USER,
		payload: user
	};
};

export const logoutUser = () => {
	AsyncStorage.removeItem('logged_in');
	AsyncStorage.removeItem('current_user');

	return {
		type: LOGOUT_USER,
		payload: null
	};
};

export const initialCategories = (user_id) => {
	return (dispatch) => {
		// Loading for front-end
		dispatch({ type: USER_LOADING, payload: true });

		// POST Params
		const params = {
			user_id: user_id
		};

		// Send POST Request
		axios.post(app_uri + '/api/users/toggle-initial-categories', params).then((response) => {
			if (response.data['success'] == true) {
				// Data
				dispatch({ type: INITIAL_CATEGORIES, payload: true });

				// Directional data
				dispatch({ type: USER_DIRECTION, payload: 'initial_categories' });
				dispatch({ type: USER_SUCCESS, payload: true });
				dispatch({ type: USER_LOADING, payload: false });
			}
		}).catch((error) => {
			// Console log error
			console.log('[ERROR] - Error within `initialCategories` action:');
			console.log(error);

			// Directional data
			dispatch({ type: USER_ERROR, payload: error });
			dispatch({ type: USER_LOADING, payload: false });
		});
	};
};