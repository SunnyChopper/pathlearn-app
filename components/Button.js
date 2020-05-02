// Main Libraries
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
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
		<TouchableOpacity style={{...styles.button, ...props.buttonStyles}} onPress={props.onPress}>
			<Text style={{...styles.buttonText, ...props.textStyles}}>{props.buttonText}</Text>
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	button: {
		backgroundColor: Colors.primary,
		paddingVertical: 12,
		paddingHorizontal: 24,
		borderRadius: 8,
		marginVertical: 8,
		shadowColor: '#0a0a0a',
		shadowOpacity: 0.2,
		shadowRadius: 4,
		shadowOffset: {
			width: 0,
			height: 2
		}
	},
	buttonText: {
		fontFamily: 'montserrat-light',
		textAlign: 'center',
		fontSize: 18,
		color: 'white'
	}
});

export default Button;