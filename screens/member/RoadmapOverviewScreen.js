// System Libraries
import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, Text, Image, Alert, ActivityIndicator } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';

// Actions

// Components
import SectionCard from '../../components/SectionCard';

// Styling
import Colors from '../../constants/Colors';
import MainStyleSheet from '../../styles/MainStyleSheet';

// Misc.
import { app_uri } from '../../constants/env';

const RoadmapOverviewScreen = props => {
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
	const [sections, setSections] = useState([]);
	const [content, setContent] = useState([]);
	const [roadmap, setRoadmap] = useState([]);
	const [category, setCategory] = useState([]);

	/* -------------------- *\
	|  3. Selectors          |
	\* -------------------- */

	// Categories
	const categories = useSelector(state => state.categories.categories);

	// Roadmap
	const current_roadmap_id = useSelector(state => state.roadmaps.current_id);

	/* -------------------- *\
	|  4. Effects            |
	\* -------------------- */

	useEffect(() => {
		if ((current_roadmap_id != 0) && (current_roadmap_id != null)) {
			setIsLoading(true);

			axios.get(app_uri + '/api/roadmaps/read?roadmap_id=' + current_roadmap_id).then((response) => {
				if (response.data['success'] == true) {
					console.log('Got roadmap');
					setRoadmap(response.data['roadmap']);

					return axios.get(app_uri + '/api/roadmaps/sections/get?roadmap_id=' + current_roadmap_id);
				}
			}).then((response) => {
				if (response.data['success'] == true) {
					console.log('Got sections');
					setSections(response.data['sections']);
					setIsLoading(false);
				}
			}).catch((error) => {
				console.log('[ERROR] - Error while getting roadmap details');
				console.log(error);
			});
		}
	}, [current_roadmap_id]);

	/* -------------------- *\
	|  5. Functions          |
	\* -------------------- */

	const cardHandler = (link) => {
		props.navigation.navigate('Content', { url_link: link });
	};

	const renderSectionCards = () => {
		return sections.map((section) => {
			return (
				<SectionCard key={section.id} section_id={section.id} linkHandler={cardHandler} />
			);
		});
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
				<View style={{...MainStyleSheet.row}}>
					<View style={{...MainStyleSheet.colOne, padding: 0}}>
						<Image source={{ uri: roadmap.cover }} style={styles.headerImage} />
					</View>
				</View>

				<View style={{...MainStyleSheet.row, padding: 24, marginTop: 0}}>
					<View style={MainStyleSheet.colOne}>
						<Text style={{...MainStyleSheet.headingOne, marginBottom: 12}}>{roadmap.title}</Text>
						<Text style={{...MainStyleSheet.headingThree, marginBottom: 4}}>Description:</Text>
						<Text style={{...MainStyleSheet.text, fontSize: 16, lineHeight: 24, marginBottom: 32}}>{roadmap.description}</Text>
						{renderSectionCards()}
					</View>
				</View>
			</ScrollView>
		</View>
	);
};

RoadmapOverviewScreen.navigationOptions = navData => {
	return {
		headerTitle: 'PathLearn'
	}	
}

const styles = StyleSheet.create({
	headerImage: {
		height: 200,
		width: '100%'
	}
});

export default RoadmapOverviewScreen;