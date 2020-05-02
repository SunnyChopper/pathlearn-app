// System Libraries
import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, Text, Image, Alert, ActivityIndicator } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

// Actions

// Components
import Button from '../../components/Button';

// Styling
import Colors from '../../constants/Colors';
import MainStyleSheet from '../../styles/MainStyleSheet';

const IntroQuizScreen = props => {
	/* --------------------- *\
	|  Screen                 |
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

	const totalQuestions = 3;
	const [step, setStep] = useState(0);
	const [responses, setResponses] = useState([]);

	/* -------------------- *\
	|  3. Selectors          |
	\* -------------------- */

	/* -------------------- *\
	|  4. Effects            |
	\* -------------------- */

	/* -------------------- *\
	|  5. Functions          |
	\* -------------------- */

	const renderProgress = () => {
		if (step != 0) {
			const progress = ((step - 1) / totalQuestions) * 100;
			return progress.toFixed(0) + '% complete';
		} else {
			return 'Press \'Get Started\' below to start the survey.'
		}
	};

	const renderResults = () => {
		var analytical = 0;
		for (var i = 0; i < responses.length; i++) {
			analytical += responses[i];
		}

		var responseString = '';

		if ((analytical / totalQuestions) > 0.5) {
			responseString += 'You are someone who is very analytical. For this, we will recommend topics such as science, mathematics and much more.';
		}

		responseString += '\n\nClick the button below to go to your home page and get started.';

		return responseString;
	};

	const renderQuestion = () => {
		switch (step) {
			case 0:
				return 'We want to provide you with Roadmaps that match your interest. This short intro survey will help us give you better recommendations.'
				break;
			case 1:
				return 'I find myself to be more analytical than I am creative.';
				break;
			case 2:
				return 'I take time to stop and learn from my mistakes instead of focusing on moving quickly.';
				break;
			case 3:
				return 'I tend to wonder what the world will be like in the future instead of how it has been in the past.';
				break;
			default:
				return renderResults();
				break;
		}
	};

	const renderButtons = () => {
		if ((step != 0) && ((step - 1) != totalQuestions)) {
			return (
				<View style={{...MainStyleSheet.container, flex: 1}}>
					<View style={MainStyleSheet.row}>
						<View style={{...MainStyleSheet.colOneHalf, paddingRight: 8}}>
							<Button buttonText="Yes" onPress={responseHandler.bind(this, 1)} />
						</View>
						<View style={{...MainStyleSheet.colOneHalf, paddingLeft: 8}}>
							<Button buttonText="No" onPress={responseHandler.bind(this, 0)} />
						</View>
					</View>
				</View>
			);
		} else if (step == 0) {
			return (
				<View style={{...MainStyleSheet.container, flex: 1}}>
					<View style={MainStyleSheet.row}>
						<View style={MainStyleSheet.colOne}>
							<Button buttonText="Get Started" onPress={startButtonHandler} />
						</View>
					</View>
				</View>
			);
		} else if ((step - 1) == totalQuestions) {
			return (
				<View style={{...MainStyleSheet.container, flex: 1}}>
					<View style={MainStyleSheet.row}>
						<View style={MainStyleSheet.colOne}>
							<Button buttonText="Go to Home Page" onPress={homeButtonHandler} />
						</View>
					</View>
				</View>
			);
		}
	};

	const homeButtonHandler = () => {
		props.navigation.navigate('Home');
	};

	const startButtonHandler = () => {
		setStep(1);
	};

	const responseHandler = (response, button) => {
		// Save response
		var newResponses = responses;
		newResponses.push(response);
		setResponses(newResponses);

		// Increment step
		if ((step - 1) != totalQuestions) {
			setStep(step + 1);
		}
	};

	const yesButtonHandler = () => {
		var newResponses = responses;
		newResponses.push(1);
		setResponses(newResponses);
	};

	const noButtonHandler = () => {
		var newResponses = responses;
		newResponses.push(0);
		setResponses(newResponses);
	};

	/* -------------------- *\
	|  6. Render             |
	\* -------------------- */

	return (
		<View style={{...MainStyleSheet.screen, padding: 24}}>
			<View style={{...MainStyleSheet.container, flex: 4, justifyContent: 'center'}}>
				<View style={MainStyleSheet.row}>
					<View style={MainStyleSheet.colOne}>
						<Text style={{...MainStyleSheet.headingOne, textAlign: 'center'}}>Intro Survey</Text>
						<Text style={{...MainStyleSheet.text, textAlign: 'center', marginBottom: 16}}>{renderProgress()}</Text>
						<Text style={{...MainStyleSheet.text, textAlign: 'center', fontSize: 16, lineHeight: 24}}>{renderQuestion()}</Text>
					</View>
				</View>
			</View>

			{renderButtons()}
		</View>
	);
};

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	}
});

export default IntroQuizScreen;