// System Libraries
import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, Text, Image, Alert, ActivityIndicator, Dimensions } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { useSafeArea } from 'react-native-safe-area-context';
import axios from 'axios';

// Actions
import { readRoadmap } from '../../store/actions/RoadmapActions';
import { logoutUser } from '../../store/actions/UserActions';

// Components
import Button from '../../components/Button';
import ProfilePageCard from '../../components/ProfilePageCard';

// Styling
import Colors from '../../constants/Colors';
import MainStyleSheet from '../../styles/MainStyleSheet';

// Misc.
import { app_uri } from '../../constants/env';

const ProfileScreen = props => {
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

	const insets = useSafeArea();
	const [isLoading, setIsLoading] = useState(false);
	const [displayStats, setDisplayStats] = useState(false);
	const [userRoadmaps, setUserRoadmaps] = useState([]);

	/* -------------------- *\
	|  3. Selectors          |
	\* -------------------- */

	// User
	const user_id = useSelector(state => state.user.current_id);
	const user = useSelector(state => state.user.user);

	/* -------------------- *\
	|  4. Effects            |
	\* -------------------- */

	useEffect(() => {
		if ((user_id != 0) && (user_id != null)) {
			setIsLoading(true);
			axios.get(app_uri + '/api/roadmaps/get?user_id=' + user_id).then((response) => {
				if (response.data['success'] == true) {
					console.log('Got user roadmaps');
					console.log(response.data['roadmaps']);
					setUserRoadmaps(response.data['roadmaps']);
					setIsLoading(false);
				}
			});
		}
	}, [user_id]);

	/* -------------------- *\
	|  5. Functions          |
	\* -------------------- */

	const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

	const renderTimestamp = () => {
		var date = new Date(user.created_at);
		var day = date.getDate();
		var month = date.getMonth();
		var year = date.getFullYear();
		return monthNames[month] + " " + day.toString() + ", " + year.toString();
	};

	const clickHandler = (roadmap_id) => {
		dispatch(readRoadmap(roadmap_id));
		props.navigation.navigate('RoadmapOverview');
	};

	const renderRoadmaps = () => {
		let returnCards = [];

		for (var i = 0; i < userRoadmaps.length; i += 2) {
			var left = userRoadmaps.length - i;
			if (left > 2) {
				var first_roadmap = userRoadmaps[i];
				var second_roadmap = userRoadmaps[i + 1];
				returnCards.push(
					<View key={i} style={{...MainStyleSheet.row, padding: 0}}>
						<View style={{...MainStyleSheet.colOneHalf, padding: 0, height: Dimensions.get('window').width * 0.5}}>
							<ProfilePageCard clickHandler={clickHandler} roadmap_id={first_roadmap.id} key={first_roadmap.id} coverImage={first_roadmap.cover} title={first_roadmap.title} enrolled={first_roadmap.num_enrollments} />
						</View>
						<View style={{...MainStyleSheet.colOneHalf, padding: 0, height: Dimensions.get('window').width * 0.5}}>
							<ProfilePageCard clickHandler={clickHandler} roadmap_id={second_roadmap.id} key={second_roadmap.id} coverImage={second_roadmap.cover} title={second_roadmap.title} enrolled={second_roadmap.num_enrollments} />
						</View>
					</View>
				);
			} else if (left == 1) {
				var first_roadmap = userRoadmaps[i];
				returnCards.push(
					<View key={i} style={{...MainStyleSheet.row, padding: 0}}>
						<View style={{...MainStyleSheet.colOneHalf, padding: 0, height: Dimensions.get('window').width * 0.5}}>
							<ProfilePageCard clickHandler={clickHandler} roadmap_id={first_roadmap.id} key={first_roadmap.id} coverImage={first_roadmap.cover} title={first_roadmap.title} enrolled={first_roadmap.num_enrollments} />
						</View>
					</View>
				);
			}
		}

		return returnCards;
	};

	const logout = () => {
		dispatch(logoutUser());
		props.navigation.navigate('Login');
	};

	/* -------------------- *\
	|  6. Render             |
	\* -------------------- */

	if (isLoading == true) {
		return (
			<View style={MainStyleSheet.screen}>
				<View style={{...MainStyleSheet.container, flex: 1, background: 'white', justifyContent: 'center', alignItems: 'center'}}>
					<ActivityIndicator size="large" color={Colors.primary} />
				</View>
			</View>
		);
	}

	return (
		<View style={MainStyleSheet.screen}>
			<ScrollView style={{...MainStyleSheet.container, backgroundColor: 'white'}}>
				<View style={{...MainStyleSheet.row, paddingHorizontal: 16}}>
					<View style={{...MainStyleSheet.colOne, alignItems: 'center'}}>
						<Image source={{uri: 'https://st3.depositphotos.com/6672868/13701/v/450/depositphotos_137014128-stock-illustration-user-profile-icon.jpg'}} style={{...styles.profileImage, marginTop: insets.top + 32}} />
						<Text style={{...MainStyleSheet.headingOne, ...styles.name}}>{user.first_name} {user.last_name}</Text>
						<Text style={{...MainStyleSheet.text, ...styles.joinedAt}}>Joined on {renderTimestamp()}</Text>
						<View style={MainStyleSheet.row}>
							<View style={MainStyleSheet.colOne}>
								<Button onPress={logout} buttonText="LOGOUT" buttonStyles={styles.createRoadmapButton} textStyles={{fontSize: 14}} />
							</View>
						</View>
					</View>
				</View>

				{(displayStats == true) ? (
					<View style={{...MainStyleSheet.row, paddingHorizontal: 16, marginTop: 16}}>
						<View style={{...MainStyleSheet.colOneThird, alignItems: 'center'}}>
							<Text style={{...MainStyleSheet.headingOne, ...styles.triNumber}}>75</Text>
							<Text style={{...MainStyleSheet.text, ...styles.triNumberSubtitle}}>FOLLOWERS</Text>
						</View>

						<View style={{...MainStyleSheet.colOneThird, alignItems: 'center'}}>
							<Text style={{...MainStyleSheet.headingOne, ...styles.triNumber}}>43</Text>
							<Text style={{...MainStyleSheet.text, ...styles.triNumberSubtitle}}>FOLLOWING</Text>
						</View>

						<View style={{...MainStyleSheet.colOneThird, alignItems: 'center'}}>
							<Text style={{...MainStyleSheet.headingOne, ...styles.triNumber}}>2</Text>
							<Text style={{...MainStyleSheet.text, ...styles.triNumberSubtitle}}>ROADMAPS</Text>
						</View>
					</View>
				) : (
					null
				)}
				

				<View style={{...MainStyleSheet.row, marginTop: 16, marginBottom: 8, paddingHorizontal: 16}}>
					<View style={{...MainStyleSheet.colOne}}>
						<Text style={MainStyleSheet.headingThree}>Your Roadmaps</Text>
					</View>
				</View>

				{renderRoadmaps()}
			</ScrollView>
		</View>
	);
};

const styles = StyleSheet.create({
	profileImage: {
		width: 96,
		height: 96,
		borderRadius: 100,
		marginBottom: 16,
		marginTop: 24,
		shadowColor: '#2a2a2a',
		shadowOpacity: 0.25,
		shadowRadius: 4,
		shadowOffset: {
			width: 0,
			height: 4
		}
	},
	name: {
		textAlign: 'center', 
		color: '#2a2a2a', 
		marginBottom: 8
	},
	joinedAt: {
		textAlign: 'center', 
		color: '#8a8a8a'
	},
	followButton: {
		height: 35, 
		paddingVertical: 8,
		justifyContent: 'center',
		marginTop: 16,
		backgroundColor: Colors.lightAccents
	},
	createRoadmapButton: {
		height: 35, 
		paddingVertical: 8,
		justifyContent: 'center',
		marginTop: 16
	},
	triNumber: {
		fontFamily: 'montserrat-light',
		fontSize: 26,
		marginBottom: 2
	},
	triNumberSubtitle: {
		fontFamily: 'montserrat-light',
		fontSize: 11
	}
});

export default ProfileScreen;