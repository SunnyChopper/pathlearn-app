// Main Libraries
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Alert, ImageBackground } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

// Actions
import { readRoadmap } from '../store/actions/RoadmapActions';

// Components


// Styling
import MainStyleSheet from '../styles/MainStyleSheet';
import Colors from '../constants/Colors';

const ProfilePageCard = props => {
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

	/* -------------------- *\
	|  3. Selectors          |
	\* -------------------- */

	/* -------------------- *\
	|  4. Effects            |
	\* -------------------- */

	/* -------------------- *\
	|  5. Functions          |
	\* -------------------- */

	const buttonPressHandler = () => {
		dispatch(readRoadmap(props.roadmap_id));
		props.navigation.navigate('RoadmapDetails');
	};

	/* -------------------- *\
	|  6. Render             |
	\* -------------------- */

	return (
		<View onPress={buttonPressHandler} style={MainStyleSheet.container}>
			<View style={MainStyleSheet.row}>
				<View style={MainStyleSheet.colOne}>
					<ImageBackground source={{uri: props.coverImage}} style={styles.backgroundImage}>
						<Text style={{...MainStyleSheet.headingThree, color: 'white'}}>{props.title}</Text>
						<Text style={{...MainStyleSheet.text, color: 'white'}}>{props.enrolled} enrolled</Text>
					</ImageBackground>
				</View>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	backgroundImage: {
		flex: 1,
		resizeMode: 'cover',
		justifyContent: 'flex-end',
		padding: 16
	}
});

export default ProfilePageCard;