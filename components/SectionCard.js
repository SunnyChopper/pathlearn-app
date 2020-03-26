// Main Libraries
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

// Actions


// Components


// Styling
import MainStyleSheet from '../styles/MainStyleSheet';
import Colors from '../constants/Colors';

const SectionCard = props => {
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

	const renderContents = (contents) => {
		return contents.map((content) => {
			return (
				<View onPress={props.onPress(this, content.link)} key={content.id} style={MainStyleSheet.row}>
					<View style={MainStyleSheet.colOne}>
						<Text style={MainStyleSheet.headingTwo}>{content.title}</Text>
						<Text style={MainStyleSheet.text}>{content.description}</Text>
						<Text style={MainStyleSheet.text}>{content.category}</Text>
					</View>
				</View>
			);
		});
	};

	/* -------------------- *\
	|  6. Render             |
	\* -------------------- */

	return (
		<View style={MainStyleSheet.container}>
			<View style={MainStyleSheet.row}>
				<View style={{...MainStyleSheet.colOne, ...styles.sectionHeader}}>
					<Text style={{...MainStyleSheet.headingThree, color: 'white'}}>{props.title}</Text>
				</View>
			</View>
			{renderContents()}
		</View>
	);
};

const styles = StyleSheet.create({
	sectionHeader: {
		backgroundColor: Colors.lightAccents,
		padding: 12
	}
});

export default SectionCard;