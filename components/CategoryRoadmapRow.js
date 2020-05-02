// Main Libraries
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator, TouchableWithoutFeedback } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';

// Actions
import { readRoadmap } from '../store/actions/RoadmapActions';

// Components
import VerticalRoadmapCard from './VerticalRoadmapCard';

// Styling
import MainStyleSheet from '../styles/MainStyleSheet';
import Colors from '../constants/Colors';

// Misc.
import { app_uri } from '../constants/env';

const CategoryRoadmapRow = props => {
	/* --------------------- *\
	|  Component              |
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

	const [isLoading, setIsLoading] = useState(true);
	const [category, setCategory] = useState([]);
	const [roadmaps, setRoadmaps] = useState([]);

	/* -------------------- *\
	|  3. Selectors          |
	\* -------------------- */

	// Categories
	const categories = useSelector(state => state.categories.categories);
	const categories_success = useSelector(state => state.categories.success);
	const categories_error = useSelector(state => state.categories.error);
	const categories_direction = useSelector(state => state.categories.direction);

	/* -------------------- *\
	|  4. Effects            |
	\* -------------------- */

	useEffect(() => {
		if (categories.length > 0) {
			// Get selected category
			categories.forEach((check_category) => {
				if (check_category.id == props.category_id) {
					setCategory(check_category);
				}
			});

			// Get roadmaps
			setIsLoading(true);

			// Send GET Request
			axios.get(app_uri + '/api/roadmaps/get?category_id=' + props.category_id).then((response) => {
				if (response.data['success'] == true) {
					setRoadmaps(response.data['roadmaps']);
					setIsLoading(false);
				}
			}).catch((error) => {
				console.log('[ERROR] - Error while fetching roadmaps.');
				console.log(error);
			});

		}
	}, [categories]);

	/* -------------------- *\
	|  5. Functions          |
	\* -------------------- */

	const cardHandler = (roadmap_id) => {
		props.cardHandler(roadmap_id);
	};

	const renderCards = () => {
		return roadmaps.map((roadmap) => {
			return (
				<VerticalRoadmapCard key={roadmap.id} roadmap_id={roadmap.id} onPress={cardHandler} cover_image={roadmap.cover} title={roadmap.title} description={roadmap.description} numberEnrolled={roadmap.num_enrollments} />
			);
		});
	};

	/* -------------------- *\
	|  6. Render             |
	\* -------------------- */

	return (
		<View style={MainStyleSheet.container}>
			<View style={MainStyleSheet.row}>
				<View style={{...MainStyleSheet.colOne, padding: 0}}>
					<Text style={{...MainStyleSheet.headingTwo, ...props.titleStyles, paddingLeft: 24}}>{category.title}</Text>
					<ScrollView showsHorizontalScrollIndicator={false} horizontal={true} style={styles.horizontalScrollView}>
						<View style={{...MainStyleSheet.row, paddingLeft: 24, marginTop: 8}}>
							{(isLoading == true) ? (
								<ActivityIndicator size="large" color={Colors.primary} />
							) : (
								renderCards()
							)}
						</View>
					</ScrollView>
				</View>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	horizontalScrollView: {
		paddingBottom: 8,
		marginBottom: 24
	}
});

export default CategoryRoadmapRow;