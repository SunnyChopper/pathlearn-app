// System Libraries
import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, Text, Image, Alert, ActivityIndicator } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { useSafeArea } from 'react-native-safe-area-context';
import axios from 'axios';

// Actions
import { readRoadmap } from '../../store/actions/RoadmapActions';

// Components
import FullRoadmapCard from '../../components/FullRoadmapCard';

// Styling
import Colors from '../../constants/Colors';
import MainStyleSheet from '../../styles/MainStyleSheet';

// Misc.
import { app_uri } from '../../constants/env';

const EnrolledScreen = props => {
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
	const [roadmaps, setRoadmaps] = useState([]);
	const [test, setTest] = useState(0);

	/* -------------------- *\
	|  3. Selectors          |
	\* -------------------- */

	// User
	const user_id = useSelector(state => state.user.current_id);

	// Enrollments
	const enrollments = useSelector(state => state.enrollments.enrollments);

	/* -------------------- *\
	|  4. Effects            |
	\* -------------------- */

	useEffect(() => {
		console.log(user_id);
		if ((user_id != 0) && (user_id != null)) {
			setIsLoading(true);
			axios.get(app_uri + '/api/roadmaps/enrollments?user_id=' + user_id).then((response) => {
				if (response.data['success'] == true) {
					console.log(response.data['roadmaps']);
					setRoadmaps(response.data['roadmaps']);
					setIsLoading(false);
				}
			});
		}
	}, [user_id]);

	/* -------------------- *\
	|  5. Functions          |
	\* -------------------- */

	const cardHandler = (roadmap_id) => {
		console.log(roadmap_id);
		dispatch(readRoadmap(roadmap_id));
		props.navigation.navigate('RoadmapOverview');
	};

	const renderCards = () => {
		return roadmaps.map((roadmap) => {
			var selected_enrollment = Array();
			enrollments.forEach((enrollment) => {
				console.log('Checking enrollments');
				console.log(enrollment);
				if (enrollment.roadmap_id == roadmap.id) {
					selected_enrollment = enrollment;
				}
			});
			console.log(selected_enrollment);

			return (
				<FullRoadmapCard onPress={cardHandler} roadmap_id={roadmap.id} key={roadmap.id} enrollmentDate={selected_enrollment.created_at} category={roadmap.category} cover_image={roadmap.cover} title={roadmap.title} description={roadmap.description} enrollmentCard={true}  />
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
				</View>
			</View>
		);
	}

	return (
		<View style={MainStyleSheet.screen}>
			<View style={{...MainStyleSheet.container, flex: 1, justifyContent: 'center'}}>
				{test == 1 ? (
					<View style={MainStyleSheet.row}>
						<View style={{...MainStyleSheet.colOne, padding: 0}}>
							<Text style={{...MainStyleSheet.text, textAlign: 'center'}}>No enrollments found.</Text>
						</View>
					</View>
				) : (
					<View style={{...MainStyleSheet.row, height: '100%'}}>
						<View style={{...MainStyleSheet.colOne, padding: 0}}>
							<ScrollView style={{paddingTop: insets.top * 1.5, paddingHorizontal: 16}}>
								{renderCards()}
							</ScrollView>
						</View>
					</View>
				)}
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	}
});

export default EnrolledScreen;