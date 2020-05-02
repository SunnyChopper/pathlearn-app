// Main Libraries
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Alert, TouchableWithoutFeedback, ActivityIndicator } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';

// Actions


// Components


// Styling
import MainStyleSheet from '../styles/MainStyleSheet';
import Colors from '../constants/Colors';

// Misc.
import { app_uri } from '../constants/env';

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

	const [isLoading, setIsLoading] = useState(true);
	const [section, setSection] = useState([]);
	const [content, setContent] = useState([]);

	/* -------------------- *\
	|  3. Selectors          |
	\* -------------------- */

	/* -------------------- *\
	|  4. Effects            |
	\* -------------------- */

	useEffect(() => {
		setIsLoading(true);

		axios.get(app_uri + '/api/roadmaps/sections/read?section_id=' + props.section_id).then((response) => {
			if (response.data['success'] == true) {
				setSection(response.data['section']);

				return axios.get(app_uri + '/api/roadmaps/sections/content/get?section_id=' + props.section_id);
			}
		}).then((response) => {
			if (response.data['success'] == true) {
				setContent(response.data['content']);
				setIsLoading(false);
			}
		});
	}, []);

	/* -------------------- *\
	|  5. Functions          |
	\* -------------------- */

	const renderContents = () => {
		return content.map((c, index) => {
			console.log(index);
			console.log(content.length - 1);
			if (index == (content.length - 1)) {
				return (
					<TouchableWithoutFeedback onPress={props.linkHandler.bind(this, c.link)} key={c.id} style={MainStyleSheet.row}>
						<View style={{...MainStyleSheet.colOne, marginBottom: 32, borderColor: '#eaeaea', borderWidth: 2, borderTopWidth: 0, borderBottomLeftRadius: 8, borderBottomRightRadius: 8, paddingVertical: 16, paddingHorizontal: 8}}>
							<Text style={{...MainStyleSheet.headingThree, marginBottom: 4}}>{c.title}</Text>
							<Text style={{...MainStyleSheet.text, fontSize: 14, lineHeight: 21, marginBottom: 8}}>{c.description}</Text>

							<View style={MainStyleSheet.row}>
								<View style={{...MainStyleSheet.colOneHalf, padding: 0}}>
									<Text style={MainStyleSheet.text}>{c.category}</Text>
								</View>

								<View style={{...MainStyleSheet.colOneHalf, padding: 0}}>
									<Text style={{...MainStyleSheet.text, textAlign: 'right'}}>{c.type}</Text>
								</View>
							</View>
						</View>
					</TouchableWithoutFeedback>
				);
			} else {
				return (
					<TouchableWithoutFeedback onPress={props.linkHandler.bind(this, c.link)} key={c.id} style={MainStyleSheet.row}>
						<View style={{...MainStyleSheet.colOne, borderColor: '#eaeaea', borderWidth: 2, paddingVertical: 16, paddingHorizontal: 8}}>
							<Text style={{...MainStyleSheet.headingThree, marginBottom: 4}}>{c.title}</Text>
							<Text style={{...MainStyleSheet.text, fontSize: 14, lineHeight: 21, marginBottom: 8}}>{c.description}</Text>

							<View style={MainStyleSheet.row}>
								<View style={{...MainStyleSheet.colOneHalf, padding: 0}}>
									<Text style={MainStyleSheet.text}>{c.category}</Text>
								</View>

								<View style={{...MainStyleSheet.colOneHalf, padding: 0}}>
									<Text style={{...MainStyleSheet.text, textAlign: 'right'}}>{c.type}</Text>
								</View>
							</View>
						</View>
					</TouchableWithoutFeedback>
				);
			}
		});
	};

	/* -------------------- *\
	|  6. Render             |
	\* -------------------- */

	if (isLoading == true) {
		return (
			<View style={MainStyleSheet.container}>
				<View style={MainStyleSheet.row}>
					<View style={{...MainStyleSheet.colOne, ...styles.sectionHeader}}>
						<ActivityIndicator size="small" color={Colors.primary} />
					</View>
				</View>
				<View style={{...MainStyleSheet.colOne, borderColor: '#eaeaea', borderWidth: 2, paddingVertical: 16, paddingHorizontal: 8, justifyContent: 'center', alignItems: 'center'}}>
					<ActivityIndicator size="large" color={Colors.primary} />
				</View>
			</View>
		);
	}

	return (
		<View style={MainStyleSheet.container}>
			<View style={MainStyleSheet.row}>
				<View style={{...MainStyleSheet.colOne, ...styles.sectionHeader}}>
					<Text style={{...MainStyleSheet.headingThree, color: 'white', marginBottom: 0}}>{section.title}</Text>
				</View>
			</View>
			{renderContents()}
		</View>
	);
};

const styles = StyleSheet.create({
	sectionHeader: {
		backgroundColor: Colors.lightAccents,
		padding: 12,
		borderTopLeftRadius: 8,
		borderTopRightRadius: 8
	}
});

export default SectionCard;