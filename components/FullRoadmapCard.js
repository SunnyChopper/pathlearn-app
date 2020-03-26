// Main Libraries
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Alert, Image } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

// Actions
import { readRoadmap } from '../store/actions/RoadmapActions';

// Components


// Styling
import MainStyleSheet from '../styles/MainStyleSheet';
import Colors from '../constants/Colors';

const FullRoadmapCard = props => {
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
		<View onPress={buttonPressHandler} style={{...MainStyleSheet.container, ...styles.card}}>
			<View style={MainStyleSheet.row}>
				<View style={MainStyleSheet.colOne}>
					<ImageBackground source={{uri: props.cover_image}} style={styles.coverImage}></ImageBackground>
				</View>
			</View>

			<View style={MainStyleSheet.row}>
				<View style={{...MainStyleSheet.colOne, padding: 16}}>
					<Text style={{...MainStyleSheet.headingOne, color: Colors.primary}}>{props.title}</Text>
					<Text style={MainStyleSheet.text}>{props.description}</Text>
				</View>
			</View>

			<View style={MainStyleSheet.row}>
				<View style={{...MainStyleSheet.colOneHalf, , padding: 16}}>
					{props.enrollmentCard === true ? (
						<Text style={MainStyleSheet.text}>Enrolled on {props.enrollmentDate}</Text>
					) : (
						<Text style={MainStyleSheet.text}>{props.numberEnrolled} enrolled</Text>
					)}
				</View>

				<View style={MainStyleSheet.colOneHalf}>
					<Text style={{...MainStyleSheet.text, textAlign: 'right'}}>{props.category}</Text>
				</View>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	card: {
		width: '100%',
		borderRadius: 8,
		shadowColor: '#0a0a0a',
		shadowOpacity: 0.25,
		shadowRadius: 4,
		shadowOffset: {
			width: 0,
			height: 2
		},
		elevation: 4,
		backgroundColor: Colors.lightBackground
	},
	coverImage: {
		height: 150,
		borderTopLeftRadius: 8,
		borderTopRightRadius: 8,
		resizeMode: 'cover'
	}
});

export default FullRoadmapCard;