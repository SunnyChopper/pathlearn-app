// Main Libraries
import React, { useState, useEffect } from 'react';
import { Animated, TouchableOpacity, View, Image, Text, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

// Styling
import MainStyleSheet from '../styles/MainStyleSheet';

const ImageButton = props => {
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

	const [fadeAnim] = useState(new Animated.Value(0));
	const [decreaseWidthAnim] = useState(new Animated.Value(1));
	const [selected, setSelected] = useState(props.selected);

	/* -------------------- *\
	|  3. Selectors          |
	\* -------------------- */

	/* -------------------- *\
	|  4. Effects            |
	\* -------------------- */

	useEffect(() => {
		if (selected == true) {
			Animated.timing(fadeAnim, {
				toValue: 1,
				duration: 250
			}).start();

			Animated.timing(decreaseWidthAnim, {
				toValue: 0,
				duration: 250
			}).start();
		} else {
			Animated.timing(fadeAnim, {
				toValue: 0,
				duration: 250
			}).start();

			Animated.timing(decreaseWidthAnim, {
				toValue: 1,
				duration: 250
			}).start();
		}
	}, [selected]);

	/* -------------------- *\
	|  5. Functions          |
	\* -------------------- */

	const touchHandler = () => {
		// Send upstream
		props.onPress(props.category_id);

		// Save state
		setSelected(!selected);
	};

	/* -------------------- *\
	|  6. Render             |
	\* -------------------- */

	return (
		<Animated.View style={{
				width: decreaseWidthAnim.interpolate({
					inputRange: [0, 1],
					outputRange: ['85%', '100%']
				})
			}}>
			<TouchableOpacity activeOpacity={0.85} onPress={() => { touchHandler(); }} style={styles.touchable}>
				<View style={styles.button}>
					<View style={styles.view}>
						<Text style={styles.text}>{props.title}</Text>
						<Text style={styles.paragraph}>{props.description}</Text>
					</View>
					
					<Image
						source={{uri: props.url}}
						style={styles.image}
					/>
					<View style={styles.overlay} />
				</View>

				<View style={styles.logoOverlay}>
					<Animated.View style={{opacity:fadeAnim}}>
						<Image source={{uri: 'https://icons.iconarchive.com/icons/graphicloads/100-flat-2/256/check-1-icon.png'}} style={styles.sideLogo} />
					</Animated.View>
				</View>
			</TouchableOpacity>
		</Animated.View>
	);
};

const styles = StyleSheet.create({
	touchable: {
		alignItems: 'center', 
		justifyContent: 'center', 
		backgroundColor: '#000000',
		height: 150,
		marginVertical: 6,
		borderRadius: 8,
		shadowColor: 'rgb(0, 0, 0)',
		shadowOpacity: 0.2,
		shadowRadius: 6,
		shadowOffset: {
			width: 0,
			height: 4
		},
		elevation: 3,
		overflow: 'hidden' 
	},
	button: {
		width: '100%',
		height: '100%',
		overflow: 'hidden'
	},
	view: {
		position: 'absolute',
		backgroundColor: 'transparent',
		padding: 24,
		zIndex: 3
	},
	overlay: {
		...StyleSheet.absoluteFillObject,
		backgroundColor: 'rgba(0, 0, 0, 0.35)'
	},
	image: {
		width: '100%',
		height: 150,
		zIndex: 0
	},
	logoOverlay: {
		position: 'absolute',
		width: '100%',
		height: '100%',
		justifyContent: 'flex-end',
		alignItems: 'flex-end',
		zIndex: 5,
		padding: 8
	},
	sideLogo: {
		width: 36,
		height: 36,
		zIndex: 4
	},
	text: {
		color: 'white',
		fontFamily: 'montserrat-bold',
		fontSize: 24,
		textAlign: 'left',
		zIndex: 1,
		textShadowColor: 'rgba(8, 8, 8, 0.4)',
		textShadowRadius: 4,
		textShadowOffset: {
			width: 0,
			height: 1
		}
	},
	paragraph: {
		width: '70%',
		flexWrap: 'wrap', 
		lineHeight: 18,
		color: 'white',
		fontSize: 14
	}
});

export default ImageButton;