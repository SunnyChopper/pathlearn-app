import {
	// 1. CRUD
	CREATE_TOPIC,
	READ_TOPIC,

	// 2. Directional
	TOPIC_DIRECTION,

	// 3. Status
	TOPIC_LOADING,
	TOPIC_SUCCESS,
	TOPIC_ERROR,

	// 4. Helper
	GET_TOPICS,
	GET_TOPICS_FOR_CATEGORY
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

export const createTopic = (title, category_id) => {
	return (dispatch) => {
		const postVariables = {
			title: title,
			category_id: category_id
		};

		axios.post(app_uri + '/api/topics/create', postVariables).then(function(response) {
			if (response.data['success'] == true) {
				dispatch({ type: CREATE_TOPIC, payload: response.data['topic'] });

				dispatch({ type: TOPIC_DIRECTION, payload: 'create_topic' });
				dispatch({ type: TOPIC_SUCCESS, payload: true });
				dispatch({ type: TOPIC_LOADING, payload: false });
			} else {
				dispatch({ type: TOPIC_ERROR, payload: response.data['error'] });
				dispatch({ type: TOPIC_LOADING, payload: false });
			}
		}).catch(function(error) {
			dispatch({ type: TOPIC_ERROR, payload: error });
			dispatch({ type: TOPIC_LOADING, payload: false });
		});
	};
};

export const readTopic = (topic_id) => {
	return {
		type: READ_TOPIC,
		payload: topic_id
	};
};

/* ----------------------- *\
|  2. Directional Actions   |
\* ----------------------- */

export const topicDirection = (direction) => {
	return {
		type: TOPIC_DIRECTION,
		payload: direction
	};
};

/* ----------------------- *\
|  3. Status Actions        |
\* ----------------------- */

export const topicLoading = (loading) => {
	return {
		type: TOPIC_LOADING,
		payload: loading
	};
};

export const topicSuccess = (success) => {
	return {
		type: TOPIC_SUCCESS,
		payload: success
	};
};

export const topicError = (error) => {
	return {
		type: TOPIC_LOADING,
		payload: error
	};
};

/* ----------------------- *\
|  4. Helper Actions        |
\* ----------------------- */

export const getTopics = () => {
	return (dispatch) => {
		axios.get(app_uri + '/api/topics/get').then(function(response) {
			if (response.data['success'] == true) {
				dispatch({ type: GET_TOPICS, payload: response.data['topics'] });

				dispatch({ type: TOPIC_DIRECTION, payload: 'get_topics' });
				dispatch({ type: TOPIC_SUCCESS, payload: true });
				dispatch({ type: TOPIC_LOADING, payload: false });
			} else {
				dispatch({ type: TOPIC_ERROR, payload: response.data['error'] });
				dispatch({ type: TOPIC_LOADING, payload: false });
			}
		}).catch(function(response) {
			dispatch({ type: TOPIC_ERROR, payload: error });
			dispatch({ type: TOPIC_LOADING, payload: false });
		});
	};
};

export const getTopicsForCategory = (category_id) => {
	return (dispatch) => {
		axios.get(app_uri + '/api/topics/get?category_id=' + category_id).then(function(response) {
			if (response.data['success'] == true) {
				dispatch({ type: GET_TOPICS_FOR_CATEGORY, payload: response.data['topics'] });

				dispatch({ type: TOPIC_DIRECTION, payload: 'get_topics_for_category' });
				dispatch({ type: TOPIC_SUCCESS, payload: true });
				dispatch({ type: TOPIC_LOADING, payload: false });
			} else {
				dispatch({ type: TOPIC_ERROR, payload: response.data['error'] });
				dispatch({ type: TOPIC_LOADING, payload: false });
			}
		}).catch(function(error) {
			dispatch({ type: TOPIC_ERROR, payload: error });
			dispatch({ type: TOPIC_LOADING, payload: false });
		});
	};
};