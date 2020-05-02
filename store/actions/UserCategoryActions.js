import {
	// 1. CRUD
	CREATE_USER_CATEGORIES,

	// 2. Directional
	USER_CATEGORIES_DIRECTION,

	// 3. Status
	USER_CATEGORIES_LOADING,
	USER_CATEGORIES_SUCCESS,
	USER_CATEGORIES_ERROR,

	// 4. Helper
	GET_USER_CATEGORIES
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

export const createUserCategories = (user_id, categories) => {
	return (dispatch) => {
		// Loading for front-end
		dispatch({ type: USER_CATEGORIES_LOADING, payload: true });

		// POST Params
		const params = {
			user_id: user_id,
			categories: categories
		};

		console.log('[DATA] - `categories` = ');
		console.log(categories);

		// Send POST Request
		axios.post(app_uri + '/api/users/categories/create', params).then((response) => {
			if (response.data['success'] == true) {
				// Data
				dispatch({ type: CREATE_USER_CATEGORIES, payload: response.data['user_categories'] });

				// Save data to device hard drive
				AsyncStorage.setItem('initial_categories', JSON.stringify({
					initial_categories: true
				}));

				// Directional data
				dispatch({ type: USER_CATEGORIES_DIRECTION, payload: 'create_user_categories' });
				dispatch({ type: USER_CATEGORIES_SUCCESS, payload: true });
				dispatch({ type: USER_CATEGORIES_LOADING, payload: false });
			} else {
				// Directional data
				dispatch({ type: USER_CATEGORIES_ERROR, payload: response.data['error'] });
				dispatch({ type: USER_CATEGORIES_LOADING, payload: false });
			}
		}).catch((error) => {
			// Console log error
			console.log('[ERROR] - Error within the `createUserCategories` action:');
			console.log(error);

			// Directional data
			dispatch({ type: USER_CATEGORIES_ERROR, payload: error });
			dispatch({ type: USER_CATEGORIES_LOADING, payload: false });
		});
	};
};

/* ----------------------- *\
|  2. Directional Actions   |
\* ----------------------- */

export const userCategoryDirection = (direction) => {
	return {
		type: USER_CATEGORIES_DIRECTION,
		payload: direction
	};
};

/* ----------------------- *\
|  3. Status Actions        |
\* ----------------------- */

export const userCategoryLoading = (loading) => {
	return {
		type: USER_CATEGORIES_LOADING,
		payload: loading
	};
};

export const userCategorySuccess = (success) => {
	return {
		type: USER_CATEGORIES_SUCCESS,
		payload: success
	};
};

export const userCategoryError = (error) => {
	return {
		type: USER_CATEGORIES_ERROR,
		payload: error
	};
};

/* ----------------------- *\
|  4. Helper Actions        |
\* ----------------------- */

export const getUserCategories = (user_id) => {
	return (dispatch) => {
		// Loading for frontend
		dispatch({ type: USER_CATEGORIES_LOADING, payload: true });

		// GET Request
		axios.get(app_uri + '/api/users/categories/get?user_id=' + user_id).then(function(response) {
			if (response.data['success'] == true) {
				// Save categories
				dispatch({ type: GET_USER_CATEGORIES, payload: response.data['user_categories'] });

				// Directional data
				dispatch({ type: USER_CATEGORIES_DIRECTION, payload: 'get_user_categories' });
				dispatch({ type: USER_CATEGORIES_SUCCESS, payload: true });
				dispatch({ type: USER_CATEGORIES_LOADING, payload: false });
			} else {
				// Directional data
				dispatch({ type: USER_CATEGORIES_ERROR, payload: response.data['error'] });
				dispatch({ type: USER_CATEGORIES_LOADING, payload: false });
			}
		}).catch(function(error) {
			// Console log error
			console.log('[ERROR] - Error within the `getUserCategories` action.');
			console.log(error);

			// Directional data
			dispatch({ type: USER_CATEGORIES_ERROR, payload: error });
			dispatch({ type: USER_CATEGORIES_LOADING, payload: false });
		});
	};
};