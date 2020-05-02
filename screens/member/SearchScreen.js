// System Libraries
import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, Text, Image, Alert, ActivityIndicator, Keyboard, Dimensions, StatusBar } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { useSafeArea } from 'react-native-safe-area-context';

// Actions
import { roadmapSuccess, roadmapError, roadmapDirection, getRoadmapsByQuery, readRoadmap } from '../../store/actions/RoadmapActions';

// Components
import Input from '../../components/Input';
import Button from '../../components/Button';
import FullRoadmapCard from '../../components/FullRoadmapCard';

// Styling
import Colors from '../../constants/Colors';
import MainStyleSheet from '../../styles/MainStyleSheet';

const SearchScreen = props => {
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
	const [searched, setSearched] = useState(false);
	const [query, setQuery] = useState('');

	/* -------------------- *\
	|  3. Selectors          |
	\* -------------------- */

	// Roadmaps
	const query_roadmaps = useSelector(state => state.roadmaps.query_roadmaps);
	const roadmap_success = useSelector(state => state.roadmaps.success);
	const roadmap_error = useSelector(state => state.roadmaps.error);
	const roadmap_direction = useSelector(state => state.roadmaps.direction);
	const roadmap_loading = useSelector(state => state.roadmaps.loading);

	// Enrollments
	const enrollments = useSelector(state => state.enrollments.enrollments);

	/* -------------------- *\
	|  4. Effects            |
	\* -------------------- */

	useEffect(() => {
		if (roadmap_success == true) {
			if (roadmap_direction == 'get_roadmaps_by_query') {
				dispatch(roadmapSuccess(false));
				dispatch(roadmapDirection(''));
			}
		}
	}, [roadmap_success]);

	useEffect(() => {
		if (roadmap_error != '') {
			Alert.alert('Error', roadmap_error, [{text: 'OK', onPress: () => { dispatch(roadmapError('')) }}]);
		}
	}, [roadmap_error]);

	useEffect(() => {
		setIsLoading(roadmap_loading);
	}, [roadmap_loading]);

	/* -------------------- *\
	|  5. Functions          |
	\* -------------------- */

	const queryTextChange = (query) => {
		setSearched(false);
		setQuery(query);
	};

	const searchHandler = () => {
		if (query != "") {
			dispatch(getRoadmapsByQuery(query));
			setSearched(true);
			Keyboard.dismiss();
		} else {
			Alert.alert('Error', 'Please input a search query.');
		}
	};

	const cardHandler = (roadmap_id) => {
		dispatch(readRoadmap(roadmap_id));
		props.navigation.navigate('RoadmapDetails', {mode: 'search'});
	};

	const renderResponse = () => {
		if (searched == true) { 
			if (query_roadmaps.length > 0) {
				return query_roadmaps.map((roadmap) => {
					var enrolled = false;
					enrollments.forEach((enrollment) => {
						if (enrollment.roadmap_id == roadmap.id) {
							enrolled = true;
						}
					});

					return (
						<FullRoadmapCard onPress={cardHandler} roadmap_id={roadmap.id} key={roadmap.id} cardStyles={{ marginVertical: 16 }} cover_image={roadmap.cover} title={roadmap.title} description={roadmap.description} numberEnrolled={roadmap.num_enrollments} category={roadmap.category} />
					);
				});
			} else {
				return (
					<Text style={{...MainStyleSheet.text, textAlign: 'center'}}>No search results for '{query}'</Text>
				);
			}
		} else {
			return <Text style={{...MainStyleSheet.text, textAlign: 'center'}}>Your search results will show here...</Text>;
		}
	};

	/* -------------------- *\
	|  6. Render             |
	\* -------------------- */

	return (
		<View style={{...MainStyleSheet.screen}}>
			<View style={{...MainStyleSheet.container, flex: 1, backgroundColor: '#e0e0e0', justifyContent: 'center', paddingTop: insets.top}}>
				<View style={{...MainStyleSheet.row, paddingHorizontal: 8}}>
					<View style={MainStyleSheet.colFiveSixths}>
						<Input onChangeText={queryTextChange} placeholder="UI Design, Programming, etc." textStyles={{height: 45}} />
					</View>
					<View style={MainStyleSheet.colOneSixth}>
						<Button onPress={searchHandler} buttonText="Go" buttonStyles={{paddingHorizontal: 0, shadowOpacity: 0, marginVertical: 6, height: 45}} textStyles={{fontSize: 16}} />
					</View>
				</View>
			</View>
			<View style={{...MainStyleSheet.container, flex: 10, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center'}}>
				<View style={{...MainStyleSheet.row}}>
					<View style={{...MainStyleSheet.colOne, padding: 0}}>
						{isLoading == true ? (
							<ActivityIndicator size="large" color={Colors.primary} />
						) : (
							<ScrollView style={{height: '100%', paddingHorizontal: 12, flexGrow: 1}} contentContainerStyle={{flexGrow : 1, justifyContent: (searched == true) ? ('flex-start') : ('center')}}>
								{renderResponse()}
							</ScrollView>
						)}
					</View>
				</View>
			</View>
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

export default SearchScreen;