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

	const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

	const renderTimestamp = () => {
		var date = new Date(props.enrollmentDate);
		var day = date.getDate();
		var month = date.getMonth();
		var year = date.getFullYear();
		return monthNames[month] + " " + day.toString() + ", " + year.toString();
	};

	/* -------------------- *\
	|  6. Render             |
	\* -------------------- */

	return (
		<TouchableWithoutFeedback onPress={props.onPress.bind(this, props.roadmap_id)}>
			<View style={{...MainStyleSheet.container, ...styles.card, ...props.cardStyles}}>
				<View style={{...MainStyleSheet.row, borderTopRightRadius: 8, borderTopLeftRadius: 8, overflow: 'hidden' }}>
					<View style={{...MainStyleSheet.colOne, padding: 0}}>
						<ImageBackground source={{uri: props.cover_image}} style={styles.coverImage}></ImageBackground>
					</View>
				</View>

				<View style={{...MainStyleSheet.row, paddingHorizontal: 16, paddingVertical: 16, paddingBottom: 0}}>
					<View style={{...MainStyleSheet.colOne}}>
						<Text style={{...MainStyleSheet.headingTwo, color: Colors.primary}}>{props.title}</Text>
						<Text style={{...MainStyleSheet.text, fontSize: 14, lineHeight: 21}}>{props.description}</Text>
					</View>
				</View>

				<View style={MainStyleSheet.row}>
					<View style={{...MainStyleSheet.colTwoThirds, paddingBottom: 16, paddingHorizontal: 16, paddingTop: 8}}>
						{props.enrollmentCard === true ? (
							<Text style={{...MainStyleSheet.text, fontSize: 13, color: '#4a4a4a'}}>Enrolled on {renderTimestamp()}</Text>
						) : (
							<Text style={{...MainStyleSheet.text, fontSize: 13, color: '#4a4a4a'}}>{props.numberEnrolled} enrolled</Text>
						)}
					</View>

					<View style={{...MainStyleSheet.colOneThird, paddingBottom: 16, paddingHorizontal: 16, paddingTop: 8}}>
						<Text style={{...MainStyleSheet.text, fontSize: 13, textAlign: 'right', color: Colors.darkAccents}}>{props.category}</Text>
					</View>
				</View>
			</View>
		</TouchableWithoutFeedback>
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