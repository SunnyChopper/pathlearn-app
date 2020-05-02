// System Libraries
import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, Text, Image, Alert, ActivityIndicator } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';

// Actions
import { readRoadmap } from '../../store/actions/RoadmapActions';

// Components
import Button from '../../components/Button';

// Styling
import Colors from '../../constants/Colors';
import MainStyleSheet from '../../styles/MainStyleSheet';

// Misc.
import { app_uri } from '../../constants/env';

const RoadmapEnrollmentScreen = props => {
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

	const [isLoading, setIsLoading] = useState(false);
	const [roadmaps, setRoadmaps] = useState([]);

	/* -------------------- *\
	|  3. Selectors          |
	\* -------------------- */


	/* -------------------- *\
	|  4. Effects            |
	\* -------------------- */


	/* -------------------- *\
	|  5. Functions          |
	\* -------------------- */

	const goToRoadmap = () => {
		dispatch(readRoadmap(props.navigation.getParam('roadmap_id')));
		props.navigation.navigate('RoadmapOverview');
	};

	/* -------------------- *\
	|  6. Render             |
	\* -------------------- */

	return (
		<View style={MainStyleSheet.screen}>
			<View style={{...MainStyleSheet.container, flex: 1, backgroundColor: '#fefefe', justifyContent: 'center'}}>
				<View style={MainStyleSheet.row}>
					<View style={{...MainStyleSheet.colOne, paddingHorizontal: 48, alignItems: 'center'}}>
						<Image source={require('../../assets/like.png')} style={styles.icon} />
						<Text style={{...MainStyleSheet.headingOne, textAlign: 'center'}}>Successfully Enrolled</Text>
						<Text style={{...MainStyleSheet.text, textAlign: 'center', fontSize: 16, lineHeight: 24}}>You have successfully enrolled for {props.navigation.getParam('title', 'Car Design')}. You can now quickly access it through your 'Enrolled' tab. Click below to access the Roadmap content.</Text>
						<Button onPress={goToRoadmap} buttonText="Go to Roadmap" buttonStyles={{ marginTop: 32 }} />
					</View>
				</View>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	},
	icon: {
		width: 128,
		height: 128,
		marginBottom: 64,
		shadowColor: '#2a2a2a',
		shadowOpacity: 0.15,
		shadowRadius: 2,
		shadowOffset: {
			width: 0,
			height: 4
		},
		overflow: 'visible' 
	}
});

export default RoadmapEnrollmentScreen;