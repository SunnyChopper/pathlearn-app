// Main Libraries
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Alert, ImageBackground, Dimensions, TouchableWithoutFeedback } from 'react-native';
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


	const renderTitle = () => {
		if (props.title.length > 32) {
			return props.title.substring(0, 32) + '...';
		} else {
			return props.title;
		}
	};

	/* -------------------- *\
	|  6. Render             |
	\* -------------------- */

	return (
		<TouchableWithoutFeedback onPress={props.clickHandler.bind(this, props.roadmap_id)} style={{...MainStyleSheet.container, width: Dimensions.get('window').width * 0.5, height: Dimensions.get('window').width * 0.5 }}>
			<View style={MainStyleSheet.row}>
				<View style={{...MainStyleSheet.colOne, padding: 0}}>
					<ImageBackground source={{uri: props.coverImage}} style={styles.backgroundImage}>
						<View style={styles.overlay} />
						<View style={{width: '100%', height: '100%', padding: 8, justifyContent: 'flex-end'}}>
							<Text style={{...MainStyleSheet.headingThree, color: 'white', marginBottom: 2}}>{renderTitle()}</Text>
							<Text style={{...MainStyleSheet.text, color: 'white', fontSize: 12}}>{props.enrolled} enrolled</Text>
						</View>
					</ImageBackground>
				</View>
			</View>
		</TouchableWithoutFeedback>
	);
};

const styles = StyleSheet.create({
	backgroundImage: {
		width: '100%',
		height: '100%',
		resizeMode: 'cover',
		justifyContent: 'flex-end'
	},
	overlay: {
		...StyleSheet.absoluteFillObject,
		backgroundColor: 'rgba(0,0,0,0.35)'
	}
});

export default ProfilePageCard;