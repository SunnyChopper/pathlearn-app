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
	LOGIN_USER
} from '../types.js';

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
		const postVariables = {
			first_name: first_name,
			last_name: last_name,
			username: username,
			password: password,
			mode: mode
		};

		axios.post(app_uri + '/api/users/create', postVariables).then(function(response) {
			if (response.data['success'] == true) {
				dispatch({ type: CREATE_USER, payload: response.data['user'] });

				dispatch({ type: USER_DIRECTION, payload: 'create_user' });
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

export const updateUser = (user_id, first_name, last_name, username, password, mode) => {
	return (dispatch) => {
		const postVariables = {
			first_name: first_name,
			last_name: last_name,
			username: username,
			password: password,
			mode: mode
		};

		axios.post(app_uri + '/api/users/update', postVariables).then(function(response) {
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
		const postVariables = {
			username: username,
			password: password
		};

		axios.post(app_uri + '/api/users/login', postVariables).then(function(response) {
			if (response.data['success'] == true) {
				dispatch({ type: LOGIN_USER, payload: response.data['user'] });

				dispatch({ type: USER_DIRECTION, payload: 'login_user' });
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