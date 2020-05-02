// System Libraries
import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, Text, Image, Alert, ActivityIndicator, AsyncStorage } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

// Actions
import { categorySuccess, categoryError, categoryDirection, getCategories } from '../../store/actions/CategoryActions';
import { userCategorySuccess, userCategoryError, userCategoryDirection, createUserCategories } from '../../store/actions/UserCategoryActions';
import { userSuccess, userError, userDirection, initialCategories } from '../../store/actions/UserActions';

// Components
import Button from '../../components/Button';
import ImageButton from '../../components/ImageButton';

// Styling
import Colors from '../../constants/Colors';
import MainStyleSheet from '../../styles/MainStyleSheet';

const SelectCategoriesScreen = props => {
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

	const [fillCheck, setFillCheck] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [selectedCategories, setSelectedCategories] = useState([]);

	/* -------------------- *\
	|  3. Selectors          |
	\* -------------------- */

	// User
	const current_user_id = useSelector(state => state.user.current_id);
	const user_success = useSelector(state => state.user.success);
	const user_error = useSelector(state => state.user.error);
	const user_direction = useSelector(state => state.user.direction);
	const user_loading = useSelector(state => state.user.loading);

	// Categories
	const categories = useSelector(state => state.categories.categories);
	const categories_success = useSelector(state => state.categories.success);
	const categories_error = useSelector(state => state.categories.error);
	const categories_direction = useSelector(state => state.categories.direction);
	const categories_loading = useSelector(state => state.categories.loading);

	// User Categories
	const user_categories = useSelector(state => state.user_categories.categories);
	const user_categories_success = useSelector(state => state.user_categories.success);
	const user_categories_error = useSelector(state => state.user_categories.error);
	const user_categories_direction = useSelector(state => state.user_categories.direction);
	const user_categories_loading = useSelector(state => state.user_categories.loading);

	/* -------------------- *\
	|  4. Effects            |
	\* -------------------- */

	/* Success Effects */

	useEffect(() => {
		if (user_success == true) {
			if (user_direction == 'initial_categories') {
				dispatch(userSuccess(false));
				dispatch(userDirection(''));

				props.navigation.navigate('Home');
			}
		}
	}, [user_success]);

	useEffect(() => {
		if (user_categories_success == true) {
			if (user_categories_direction == 'create_user_categories') {
				dispatch(userCategorySuccess(false));
				dispatch(userCategoryDirection(''));
				dispatch(initialCategories(current_user_id));
			}
		}
	}, [user_categories_success]);

	useEffect(() => {
		if (categories_success == true) {
			if (categories_direction == 'get_categories') {
				dispatch(categorySuccess(false));
				dispatch(categoryDirection(''));
			}
		}
	}, [categories_success]);

	/* Error Effects */

	useEffect(() => {
		if (user_error != '') {
			Alert.alert('Error', user_error, [{text: 'OK', onPress: () => { dispatch(userError('')) }}]);
		}
	}, [user_error]);

	useEffect(() => {
		if (user_categories_error != '') {
			Alert.alert('Error', user_categories_error, [{text: 'OK', onPress: () => { dispatch(userCategoryError('')) }}]);
		}
	}, [user_categories_error]);


	useEffect(() => {
		if (categories_error != '') {
			Alert.alert('Error', categories_error, [{text: 'OK', onPress: () => { dispatch(categoryError('')) }}]);
		}
	}, [categories_error]);

	/* Loading Effects */

	useEffect(() => {
		if ((categories_loading == true) || (user_categories_loading == true) || (user_loading == true)) {
			setIsLoading(true);
		} else {
			setIsLoading(false);
		}
	}, [categories_loading, user_categories_loading, user_loading]);

	/* Initial Effect */

	useEffect(() => {
		dispatch(getCategories());
	}, []);

	/* -------------------- *\
	|  5. Functions          |
	\* -------------------- */

	const buttonPress = (category_id) => {
		// Check if in selected array
		var index = selectedCategories.indexOf(category_id);

		// Based on if found
		const newCategories = selectedCategories;
		if (index != -1) {
			newCategories.splice(index, 1);
			setSelectedCategories(newCategories);
		} else {
			newCategories.push(category_id);
			setSelectedCategories(newCategories);
		}

		// Check for fill check
		if (newCategories.length > 0) {
			setFillCheck(true);
		} else {
			setFillCheck(false);
		}
	};

	const renderCategories = () => {
		return categories.map((category) => {
			return (
				<ImageButton key={category.id} onPress={buttonPress} selected={false} category_id={category.id} title={category.title} description={category.description} url={category.cover_image} />
			);
		});
	};

	const submitHandler = () => {
		if (fillCheck != false) {
			dispatch(createUserCategories(current_user_id, selectedCategories));
		} else {
			Alert.alert('Error', 'You must pick at least one category you\'re interested in.');
		}
	};

	/* -------------------- *\
	|  6. Render             |
	\* -------------------- */

	if (isLoading == true) {
		return (
			<View style={MainStyleSheet.screen}>
				<View style={{...MainStyleSheet.container, flex: 1, justifyContent: 'center', alignItems: 'center'}}>
					<ActivityIndicator size="large" color={Colors.primary} />
				</View>
			</View>
		);
	}

	return (
		<View style={MainStyleSheet.screen}>
			<ScrollView style={{...MainStyleSheet.container, flex: 1, backgroundColor: 'white'}}>
				<View style={{...MainStyleSheet.row, marginTop: 72}}>
					<View style={MainStyleSheet.colOne}>
						<Text style={{...MainStyleSheet.headingOne, textAlign: 'center', marginBottom: 6}}>What're Your Interests?</Text>
						<Text style={{...MainStyleSheet.text, textAlign: 'center', fontSize: 15}}>We'll show you only what you're interested in.</Text>
					</View>
				</View>

				<View style={{...MainStyleSheet.row, paddingHorizontal: 16}}>
					<View style={MainStyleSheet.colOne}>
						<View style={styles.buttonsContainer}>
							{renderCategories()}
						</View>
					</View>
				</View>

				<View style={{...MainStyleSheet.row, marginBottom: 64, paddingHorizontal: 24 }}>
					<View style={MainStyleSheet.colOne}>
						<Button onPress={submitHandler} buttonText="Select Categories" />
					</View>
				</View>
			</ScrollView>
		</View>
	);
};

const styles = StyleSheet.create({
	buttonsContainer: {
		marginTop: 24,
		marginBottom: 24,
		alignItems: 'center'
	}
});

export default SelectCategoriesScreen;