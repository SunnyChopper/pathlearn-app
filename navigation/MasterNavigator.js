// Libraries
import React, { useState, useEffect, useRef } from 'react';
import { AsyncStorage } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { useDispatch } from 'react-redux';

// Actions
import { isLoggedIn, setUser } from '../store/actions/UserActions';

// Navigators
import AppNavigator from './AppNavigator';

const MasterNavigator = props => {
	/* --------------------- *\
	|  Screen                 |
	|-------------------------|
	|  1. Dispatch            |
	|  2. State variables     |
	|  3. Selectors           |
	|  4. Effects             |
	|  5. Functions           |
	|  6. Render              |
	\* --------------------- */

	/* -------------------- *\
	|  1. Dispatch           |
	\* -------------------- */

	const dispatch = useDispatch();

	/* -------------------- *\
	|  2. State variables    |
	\* -------------------- */

	const [hasOnboarded, setHasOnboarded] = useState(false);
	const navRef = useRef();

	/* -------------------- *\
	|  3. Selectors          |
	\* -------------------- */

	/* -------------------- *\
	|  4. Effects            |
	\* -------------------- */

	/* -------------------- *\
	|  5. Functions          |
	\* -------------------- */

	const fetchOnboard = async () => {
		AsyncStorage.getItem('hasOnboarded').then((value) => {
			// Check if null
			if (value != null) {
				// Get value
				var returnJSON = JSON.parse(value);
				const onboarded = returnJSON['hasOnboarded'];

				// Check if has onboarded
				if (onboarded == true) {
					setHasOnboarded(true);

					// Next, check if logged in or not
					AsyncStorage.getItem('logged_in').then((value) => {
						// Check if null
						if (value != null) {
							// Get value
							var returnJSON = JSON.parse(value);
							const loggedIn = returnJSON['logged_in'];

							// Check if logged in
							if (loggedIn == true) {
								// Save to Redux
								dispatch(isLoggedIn(true));

						 		// Get user id
						 		AsyncStorage.getItem('current_user').then((value) => {
						 			var returnJSON = JSON.parse(value);
						 			const current_user = returnJSON['current_user'];
						 			dispatch(setUser(current_user));

						 			// Check if user has taken quiz
						 			if (current_user['initial_categories'] != 1) {
						 				// First check if intial categories have been updated locally
						 				AsyncStorage.getItem('initial_categories').then((value) => {
						 					// Check if null
						 					if (value != null) {
						 						// Navigate to intro quiz
										 		navRef.current.dispatch(
													NavigationActions.navigate({
														routeName: 'Home'
													})
												);
						 					} else {
						 						// Navigate to intro quiz
										 		navRef.current.dispatch(
													NavigationActions.navigate({
														routeName: 'Categories'
													})
												);
						 					}
						 				});
						 			} else {
						 				// Navigate to home page
								 		navRef.current.dispatch(
											NavigationActions.navigate({
												routeName: 'Home'
											})
										);
						 			}
						 		});
							} else {
								// Navigate to login
								navRef.current.dispatch(
									NavigationActions.navigate({
										routeName: 'Login'
									})
								);
							}
						} else {
							// Navigate to login by default
							navRef.current.dispatch(
								NavigationActions.navigate({
									routeName: 'Login'
								})
							);
						}
					});
				} else {
					// Navigate to onboarding
					navRef.current.dispatch(
						NavigationActions.navigate({
							routeName: 'Onboarding'
						})
					);
				}
			} else {
				// Navigate to onboarding by default
				navRef.current.dispatch(
					NavigationActions.navigate({
						routeName: 'Onboarding'
					})
				);
			}
		});
	};

	/* ----- Effects ----- */
	useEffect(() => {
		fetchOnboard();
	}, []);

	/* ----- JSX ----- */
	return <AppNavigator ref={navRef} />
};

export default MasterNavigator;