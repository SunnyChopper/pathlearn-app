// System Libraries
import React, { useEffect } from 'react';
import { StyleSheet, Image, AsyncStorage } from 'react-native';
import { useDispatch } from 'react-redux';
import Onboarding from 'react-native-onboarding-swiper';

// Actions

// Components

// Styling
import Colors from '../../constants/Colors';

const OnboardingScreen = props => {
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

	/* -------------------- *\
	|  3. Selectors          |
	\* -------------------- */

	/* -------------------- *\
	|  4. Effects            |
	\* -------------------- */

	/* -------------------- *\
	|  5. Functions          |
	\* -------------------- */

	const completeOnboarding = async () => {
		// Flip onboarding
		await AsyncStorage.setItem('hasOnboarded', JSON.stringify({
			hasOnboarded: true
		}));

		// Navigate
		props.navigation.navigate('Login');
	};

	/* -------------------- *\
	|  6. Render             |
	\* -------------------- */

	return (
		<Onboarding
			onDone = {completeOnboarding}
			onSkip = {completeOnboarding}
			pages = {[
				{
					backgroundColor: Colors.lightBackground,
					image: <Image style={styles.image} source={require('../../assets/question.png')} />,
					title: 'Know What to Learn',
					subtitle: 'More often than not, it\'s not that you aren\'t motivated to learn, it\'s just that you don\'t know what to learn. PathLearn aims to fix this.'
				},
				{
					backgroundColor: Colors.lightBackground,
					image: <Image style={styles.image} source={require('../../assets/review.png')} />,
					title: 'Community Reviewed',
					subtitle: 'The PathLearn community will make sure that all the RoadMaps generated make sense for the topic. We do not tolerate misinformation.'
				},
				{
					backgroundColor: Colors.lightBackground,
					image: <Image style={styles.image} source={require('../../assets/webinar.png')} />,
					title: 'Be Curious and Discover',
					subtitle: 'As more people contribute to PathLearn, the number of topics will grow. You\'ll be able to explore all of these topics and learn something new.'
				},
			]}
		/>
	);
};

const styles = StyleSheet.create({
	image: {
		width: 196,
		height: 196
	}
});

export default OnboardingScreen;