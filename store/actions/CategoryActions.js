import {
	// 1. CRUD
	READ_CATEGORY,

	// 2. Directional
	CATEGORY_DIRECTION,

	// 3. Status
	CATEGORY_LOADING,
	CATEGORY_SUCCESS,
	CATEGORY_ERROR,

	// 4. Helper
	GET_CATEGORIES
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

export const readCategory = (category_id) => {
	return {
		type: READ_CATEGORY,
		payload: category_id
	};
};

/* ----------------------- *\
|  2. Directional Actions   |
\* ----------------------- */

export const categoryDirection = (direction) => {
	return {
		type: CATEGORY_DIRECTION,
		payload: direction
	};
};

/* ----------------------- *\
|  3. Status Actions        |
\* ----------------------- */

export const categoryLoading = (loading) => {
	return {
		type: CATEGORY_LOADING,
		payload: loading
	};
};

export const categorySuccess = (success) => {
	return {
		type: CATEGORY_SUCCESS,
		payload: success
	};
};

export const categoryError = (error) => {
	return {
		type: CATEGORY_ERROR,
		payload: error
	};
};

/* ----------------------- *\
|  4. Helper Actions        |
\* ----------------------- */

export const getCategories = () => {
	return (dispatch) => {
		// Loading for frontend
		dispatch({ type: CATEGORY_LOADING, payload: true });

		// GET Request
		axios.get(app_uri + '/api/categories/get').then(function(response) {
			if (response.data['success'] == true) {
				// Save categories
				dispatch({ type: GET_CATEGORIES, payload: response.data['categories'] });

				// Directional data
				dispatch({ type: CATEGORY_DIRECTION, payload: 'get_categories' });
				dispatch({ type: CATEGORY_SUCCESS, payload: true });
				dispatch({ type: CATEGORY_LOADING, payload: false });
			} else {
				// Directional data
				dispatch({ type: CATEGORY_ERROR, payload: response.data['error'] });
				dispatch({ type: CATEGORY_LOADING, payload: false });
			}
		}).catch(function(error) {
			// Console log error
			console.log('[ERROR] - Error within the `getCategories` action.');
			console.log(error);

			// Directional data
			dispatch({ type: CATEGORY_ERROR, payload: error });
			dispatch({ type: CATEGORY_LOADING, payload: false });
		});
	};
};