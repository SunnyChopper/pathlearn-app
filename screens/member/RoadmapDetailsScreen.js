// System Libraries
import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, Text, Image, Alert, ActivityIndicator } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';

// Actions

// Components
import Button from '../../components/Button';
import SectionCard from '../../components/SectionCard';

// Styling
import Colors from '../../constants/Colors';
import MainStyleSheet from '../../styles/MainStyleSheet';

// Misc.
import { app_uri } from '../../constants/env';

const RoadmapDetailsScreen = props => {
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

	const [isLoading, setIsLoading] = useState(true);
	const [enrolled, setEnrolled] = useState(false);
	const [roadmap, setRoadmap] = useState([]);
	const [sections, setSections] = useState([]);
	const [content, setContent] = useState([]);

	/* -------------------- *\
	|  3. Selectors          |
	\* -------------------- */

	// User
	const user_id = useSelector(state => state.user.current_id);

	// Enrollments
	const enrollments = useSelector(state => state.enrollments.enrollments);

	// Roadmap
	const current_roadmap_id = useSelector(state => state.roadmaps.current_id);

	/* -------------------- *\
	|  4. Effects            |
	\* -------------------- */

	useEffect(() => {
		if ((current_roadmap_id != 0) && (current_roadmap_id != null)) {
			setIsLoading(true);

			// Send GET request for roadmap details and its sections.
			axios.get(app_uri + '/api/roadmaps/read?roadmap_id=' + current_roadmap_id).then((response) => {
				if (response.data['success'] == true) {
					setRoadmap(response.data['roadmap']);

					return axios.get(app_uri + '/api/roadmaps/sections/get?roadmap_id=' + current_roadmap_id);
				}
			}).then((response) => {
				if (response.data['success'] == true) {
					setSections(response.data['sections']);
					setIsLoading(false);
				}
			}).catch((error) => {
				console.log('[ERROR] - Error while getting roadmap details');
				console.log(error);
			});
			
		}
	}, [current_roadmap_id]);

	useEffect(() => {
		if (enrollments.length > 0) {
			enrollments.forEach((enrollment) => {
				if (enrollment.roadmap_id == current_roadmap_id) {
					setEnrolled(true);
				}
			});
		}
	}, []);

	/* -------------------- *\
	|  5. Functions          |
	\* -------------------- */

	const cardHandler = (link) => {
		console.log('Do nothing here...');
	};

	const renderSectionCards = () => {
		return sections.map((section) => {
			return (
				<SectionCard key={section.id} section_id={section.id} linkHandler={cardHandler} />
			);
		});
	};
	const enrollHandler = () => {
		setIsLoading(true);

		const params = {
			user_id: user_id,
			roadmap_id: current_roadmap_id
		};

		axios.post(app_uri + '/api/roadmaps/enrollments/create', params).then((response) => {
			if (response.data['success'] == true) {
				setIsLoading(false);
				dispatch({ type: 'create_enrollment', payload: response.data['enrollment'] });
				props.navigation.navigate('RoadmapEnrollment', { title: roadmap.title, roadmap_id: roadmap.id });
			} else {
				console.log(response.data);
			}
		}).catch((error) => {
			console.log(error);
			setIsLoading(false);
		});
	};

	const renderEnrollButton = () => {
		if (enrolled == false) {
			return (
				<Button onPress={enrollHandler} buttonText="ENROLL IN ROADMAP" buttonStyles={{ paddingHorizontal: 4, marginTop: 16 }} textStyles={{fontFamily: 'montserrat-bold', letterSpacing: 4}} />
			);
		} else {
			return null;
		}
	};

	/* -------------------- *\
	|  6. Render             |
	\* -------------------- */

	if (isLoading == true) {
		return (
			<View style={MainStyleSheet.screen}>
				<View style={{...MainStyleSheet.container, flex: 1, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center'}}>
					<View style={MainStyleSheet.row}>
						<View style={MainStyleSheet.colOne}>
							<ActivityIndicator size="large" color={Colors.primary} />
						</View>
					</View>
				</View>
			</View>
		);
	}

	return (
		<View style={MainStyleSheet.screen}>
			<ScrollView style={{...MainStyleSheet.container, flex: 1, backgroundColor: 'white'}}>
				<View style={MainStyleSheet.row}>
					<View style={{...MainStyleSheet.colOne, padding: 0}}>
						<Image source={{uri: roadmap.cover }} style={styles.headerImage} />
					</View>
				</View>

				<View style={{...MainStyleSheet.row, marginTop: 24, paddingHorizontal: 24}}>
					<View style={MainStyleSheet.colOne}>
						<Text style={{...MainStyleSheet.headingOne, color: Colors.primary, fontSize: 28, marginBottom: 8}}>{roadmap.title}</Text>
						<Text style={{...MainStyleSheet.text, fontSize: 16, lineHeight: 32, marginBottom: 8 }}>{roadmap.description}</Text>

						<View style={MainStyleSheet.row}>
							<View style={MainStyleSheet.colOneHalf}>
								<Text style={{...MainStyleSheet.text}}>{roadmap.num_enrollments} enrolled</Text>
							</View>
						</View>

						{(enrolled == false) ? (
							<Button onPress={enrollHandler} buttonText="ENROLL IN ROADMAP" buttonStyles={{ paddingHorizontal: 4, marginTop: 16 }} textStyles={{fontFamily: 'montserrat-bold', letterSpacing: 4}} />
						) : (
							null
						)}
					</View>
				</View>

				<View style={{...MainStyleSheet.row, paddingHorizontal: 24, marginTop: 24}}>
					<View style={MainStyleSheet.colOne}>
						<Text style={{...MainStyleSheet.headingTwo, fontFamily: 'montserrat', marginBottom: 16}}>Roadmap Content</Text>
						{renderSectionCards()}
					</View>
				</View>
			</ScrollView>
		</View>
	);
};

RoadmapDetailsScreen.navigationOptions = navData => {
	return {
		headerTitle: 'PathLearn'
	}	
};

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	},
	headerImage: {
		width: '100%',
		height: 175,
		resizeMode: 'cover'
	}
});

export default RoadmapDetailsScreen;