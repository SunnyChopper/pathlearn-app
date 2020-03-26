// Main Libraries
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

// Actions


// Components


// Styling
import MainStyleSheet from '../styles/MainStyleSheet';
import Colors from '../constants/Colors';

const Input = props => {
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
		<View style={MainStyleSheet.row}>
			<View style={MainStyleSheet.colOne}>
				<TextInput onChangeText={props.onTextChange} placeholder={props.placeholder} value={props.value} style={styles.input} multiline={props.multiline} />
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	input: {
		width: '100%',
		borderBottomColor: Colors.primary,
		borderBottomWidth: 2,
		backgroundColor: Colors.lightBackground,
		marginVerical: 4
	}
});

export default Input;