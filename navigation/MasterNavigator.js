/* ---------------------- *\
	Libraries 
\* ---------------------- */

import React, { useState, useEffect, useRef } from 'react';
import { AsyncStorage } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { useDispatch } from 'react-redux';

/* ---------------------- *\
	Navigators 
\* ---------------------- */

import AppNavigator from './AppNavigator';


const MasterNavigator = props => {
	const [hasOnboarded, setHasOnboarded] = useState(false);

	const dispatch = useDispatch();

	const navRef = useRef();

	const fetchOnboard = async () => {
		AsyncStorage.getItem('hasOnboarded').then((value) => {
			var returnJSON = JSON.parse(value);
			var onboarded = returnJSON["hasOnboarded"];
			setHasOnboarded(onboarded);

			// Check if logged in
			AsyncStorage.getItem('logged_in').then((value) => {
				if (value != null) {
					var returnJSON = JSON.parse(value);
					var logged_in = returnJSON["logged_in"];

					if (logged_in == true) {
						AsyncStorage.getItem('current_user_id').then((value) => {
							var returnJSON = JSON.parse(value);
							var current_user_id = returnJSON["current_user_id"];
						});

						navRef.current.dispatch(
							NavigationActions.navigate({
								routeName: 'Home'
							})
						);
					} else {
						navRef.current.dispatch(
							NavigationActions.navigate({
								routeName: 'Guest'
							})
						);
					}
				} else {
					navRef.current.dispatch(
						NavigationActions.navigate({
							routeName: 'Guest'
						})
					);
				}
			});
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