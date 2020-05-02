// System Libraries
import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, Text, Image, Alert, ActivityIndicator } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { useSafeArea } from 'react-native-safe-area-context';

// Actions
import { readRoadmap } from '../../store/actions/RoadmapActions';
import { userCategorySuccess, userCategoryError, userCategoryLoading, userCategoryDirection, getUserCategories } from '../../store/actions/UserCategoryActions';
import { categorySuccess, categoryError, categoryLoading, categoryDirection, getCategories } from '../../store/actions/CategoryActions';
import { enrollmentSuccess, enrollmentError, enrollmentDirection, getEnrollmentsForUser } from '../../store/actions/EnrollmentActions';

// Components
import VerticalRoadmapCard from '../../components/VerticalRoadmapCard';
import CategoryRoadmapRow from '../../components/CategoryRoadmapRow';

// Styling
import Colors from '../../constants/Colors';
import MainStyleSheet from '../../styles/MainStyleSheet';

const RecommendationsScreen = props => {
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

	const insets = useSafeArea();
	const [isLoading, setIsLoading] = useState(false);
	const [loadedRoadmaps, setLoadedRoadmaps] = useState(false);
	const [loadedEnrollments, setLoadedEnrollments] = useState(false);
	const [loadedUserCategories, setLoadedUserCategories] = useState(false);

	/* -------------------- *\
	|  3. Selectors          |
	\* -------------------- */

	// User
	const user = useSelector(state => state.user.user);
	const user_id = useSelector(state => state.user.current_id);

	// User categories
	const user_categories = useSelector(state => state.user_categories.categories);
	const user_categories_success = useSelector(state => state.user_categories.success);
	const user_categories_error = useSelector(state => state.user_categories.error);
	const user_categories_loading = useSelector(state => state.user_categories.loading);
	const user_categories_direction = useSelector(state => state.user_categories.direction);

	// Enrollments
	const enrollments = useSelector(state => state.enrollments.enrollments);
	const enrollments_success = useSelector(state => state.enrollments.success);
	const enrollments_error = useSelector(state => state.enrollments.error);
	const enrollments_loading = useSelector(state => state.enrollments.loading);
	const enrollments_direction = useSelector(state => state.enrollments.direction);

	// Categories
	const categories = useSelector(state => state.categories.categories);
	const categories_success = useSelector(state => state.categories.success);
	const categories_error = useSelector(state => state.categories.error);
	const categories_loading = useSelector(state => state.categories.loading);
	const categories_direction = useSelector(state => state.categories.direction);

	/* -------------------- *\
	|  4. Effects            |
	\* -------------------- */

	/* Success Effects */

	useEffect(() => {
		if (enrollments_success == true) {
			if (enrollments_direction == 'get_enrollments_for_user') {
				dispatch(enrollmentSuccess(false));
				dispatch(enrollmentDirection(''));
			}
		}
	}, [enrollments_success]);

	useEffect(() => {
		if (categories_success == true) {
			if (categories_direction == 'get_categories') {
				dispatch(categorySuccess(false));
				dispatch(categoryDirection(''));
			}
		}
	}, [categories_success]);

	useEffect(() => {
		if (user_categories_success == true) {
			if (user_categories_direction == 'get_user_categories') {
				dispatch(userCategorySuccess(false));
				dispatch(userCategoryDirection(''));
			}
		}
	}, [user_categories_success])

	/* Loading Effects */

	useEffect(() => {
		if ((categories_loading == true) || (enrollments_loading == true) || (user_categories_loading == true)) {
			setIsLoading(true);
		} else {
			setIsLoading(false);
		}
	}, [categories_loading, enrollments_loading, user_categories_loading]);

	/* Initial Effect */

	useEffect(() => {
		if ((user_id != null) && (user_id != 0)) {
			if (user_categories.length == 0) {
				dispatch(getUserCategories(user_id));
			}

			dispatch(getCategories());
			dispatch(getEnrollmentsForUser(user_id));
		}
	}, [user_id]);

	/* -------------------- *\
	|  5. Functions          |
	\* -------------------- */

	const cardHandler = (roadmap_id) => {
		var enrolled = false;
		enrollments.forEach((enrollment) => {
			if (enrollment.roadmap_id == roadmap_id) {
				enrolled = true;
			}
		});
		
		console.log(roadmap_id);
		dispatch(readRoadmap(roadmap_id));
		if (enrolled == true) {
			props.navigation.navigate('RoadmapOverview');
		} else {
			props.navigation.navigate('RoadmapDetails', {mode: 'normal'});
		}
	};

	const renderCards = () => {
		return user_categories.map((user_category, index) => {
			var textStyles = {};
			if (index == 0) {
				textStyles = {
					marginTop: insets.top 
				};
			}

			return (
				<CategoryRoadmapRow cardHandler={cardHandler} key={user_category.id} category_id={user_category.category_id} titleStyles={textStyles} />
			);
		});
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
			<View style={{...MainStyleSheet.container, flex: 1}}>
				<View style={MainStyleSheet.row}>
					<View style={{...MainStyleSheet.colOne, padding: 0}}>
						<ScrollView style={{...styles.scrollView}}>
							{renderCards()}
						</ScrollView>
					</View>
				</View>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	scrollView:  {
		width: '100%',
		height: '100%',
		paddingVertical: 24,
	}
});

export default RecommendationsScreen;