// Main Libraries
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Alert, Image, ImageBackground, TouchableWithoutFeedback } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

// Actions
import { readRoadmap } from '../store/actions/RoadmapActions';

// Components


// Styling
import MainStyleSheet from '../styles/MainStyleSheet';
import Colors from '../constants/Colors';

const VerticalRoadmapCard = props => {
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

	const renderDescription = () => {
		if (props.description.length > 120) {
			return props.description.substring(0, 119) + '...';
		} else {
			return props.description;
		}
	};

	/* -------------------- *\
	|  6. Render             |
	\* -------------------- */

	return (
		<TouchableWithoutFeedback onPress={props.onPress.bind(this, props.roadmap_id)}>
			<View style={{...MainStyleSheet.container, ...styles.card}}>
				<View style={{...MainStyleSheet.row, borderTopLeftRadius: 8, borderTopRightRadius: 8, overflow: 'hidden' }}>
					<View style={{...MainStyleSheet.colOne, padding: 0}}>
						<ImageBackground source={{uri: props.cover_image}} style={styles.coverImage}></ImageBackground>
					</View>
				</View>

				<View style={MainStyleSheet.row}>
					<View style={{...MainStyleSheet.colOne, padding: 16}}>
						<Text style={{...MainStyleSheet.headingThree, color: Colors.primary}}>{props.title}</Text>
						<Text style={{...MainStyleSheet.text, fontSize: 13, lineHeight: 20}}>{renderDescription()}</Text>
						<Text style={{...MainStyleSheet.text, fontSize: 12, marginTop: 4}}>{props.numberEnrolled} enrolled</Text>
					</View>
				</View>
			</View>
		</TouchableWithoutFeedback>
	);
};

const styles = StyleSheet.create({
	card: {
		width: 225,
		borderRadius: 8,
		shadowColor: '#0a0a0a',
		shadowOpacity: 0.25,
		shadowRadius: 4,
		shadowOffset: {
			width: 0,
			height: 2
		},
		elevation: 4,
		backgroundColor: Colors.lightBackground,
		marginRight: 16
	},
	coverImage: {
		height: 125,
		width: '100%',
		borderTopLeftRadius: 8,
		borderTopRightRadius: 8,
		resizeMode: 'cover'
	}
});

export default VerticalRoadmapCard;