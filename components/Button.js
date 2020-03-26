// Main Libraries
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableWithoutFeedback, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

// Actions


// Components


// Styling
import MainStyleSheet from '../styles/MainStyleSheet';
import Colors from '../constants/Colors';

const Button = props => {
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

	/* -------------------- *\
	|  6. Render             |
	\* -------------------- */

	return (
		<TouchableWithoutFeedback style={{...MainStyleSheet.container, ...styles.button, ...props.styles}} onPress={props.onPress}>
			<View style={MainStyleSheet.row}>
				<View style={MainStyleSheet.colOne}>
					<Text style={{...styles.buttonText, ...props.textStyles}}>{props.buttonText}</Text>
				</View>
			</View>
		</TouchableWithoutFeedback>
	);
};

const styles = StyleSheet.create({
	button: {
		width: '100%',
		backgroundColor: Colors.primary,
		paddingVertical: 6,
		paddingHorizontal: 12
	},
	buttonText: {
		fontFamily: 'montserrat-light',
		textAlign: 'center',
		fontSize: 14,
		color: 'white'
	}
});

export default Button;