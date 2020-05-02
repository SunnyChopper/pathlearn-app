// System Libraries
import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, Text, Image, Alert, ActivityIndicator, KeyboardAvoidingView } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

// Actions
import { userError, userSuccess, userDirection, loginUser } from '../../store/actions/UserActions';

// Components
import Button from '../../components/Button';
import Input from '../../components/Input';

// Styling
import Colors from '../../constants/Colors';
import MainStyleSheet from '../../styles/MainStyleSheet';

const LoginScreen = props => {
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

	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [fillCheck, setFillCheck] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	/* -------------------- *\
	|  3. Selectors          |
	\* -------------------- */

	// User data
	const user = useSelector(state => state.user.user);
	const user_success = useSelector(state => state.user.success);
	const user_error = useSelector(state => state.user.error);
	const user_direction = useSelector(state => state.user.direction);
	const user_loading = useSelector(state => state.user.loading);

	/* -------------------- *\
	|  4. Effects            |
	\* -------------------- */

	useEffect(() => {
		if (user_error != '') {
			Alert.alert('Error', user_error, [{text: 'OK', onPress: () => { dispatch(userError('')) }}]);
		}
	}, [user_error]);

	useEffect(() => {
		if (user_success == true) {
			if (user_direction == 'login_user') {
				// Check if user has already taken intro quiz
				if (user['initial_categories'] == 1) {
					props.navigation.navigate('Home');
				} else {
					props.navigation.navigate('Categories');
				}

				dispatch(userDirection(''));
				dispatch(userSuccess(false));
			}
		}
	}, [user_success]);

	useEffect(() => {
		setIsLoading(user_loading);
	}, [user_loading]);

	useEffect(() => {
		if ((username != "") && (password != "")) {
			setFillCheck(true);
		} else {
			setFillCheck(false);
		}
	}, [username, password]);

	/* -------------------- *\
	|  5. Functions          |
	\* -------------------- */

	const usernameTextChange = (username) => {
		setUsername(username.replace(/\s/g, ''));
	};

	const passwordTextChange = (password) => {
		setPassword(password.replace(/\s/g, ''));
	};

	const emailLogin = () => {
		if (fillCheck == true) {
			dispatch(loginUser(username, password));
		} else {
			Alert.alert('Error', 'Please fill out your username and password.', [{text: 'OK'}]);
		}
	};

	/* -------------------- *\
	|  6. Render             |
	\* -------------------- */

	if (isLoading == true) {
		return (
			<View style={MainStyleSheet.screen}>
				<View style={{...MainStyleSheet.container, flex: 6, width: '100%', justifyContent: 'flex-end'}}>
					<View style={MainStyleSheet.row}>
						<View style={{...MainStyleSheet.colOne, alignItems: 'center'}}>
							<Image source={require('../../assets/logo.png')} style={styles.logo} />
						</View>
					</View>
				</View>
				<View style={{...MainStyleSheet.container, flex: 6, width: '100%', justifyContent: 'flex-start', alignItems: 'center'}}>
					<ActivityIndicator color={Colors.primary} size="large" />
				</View>
			</View>
		);
	} else {
		return (
			<View style={MainStyleSheet.screen}>
				<View style={{...MainStyleSheet.container, flex: 6, width: '100%', justifyContent: 'flex-end'}}>
					<View style={MainStyleSheet.row}>
						<View style={{...MainStyleSheet.colOne, alignItems: 'center'}}>
							<Image source={require('../../assets/logo.png')} style={styles.logo} />
						</View>
					</View>
				</View>

				<KeyboardAvoidingView behavior="padding" style={{...MainStyleSheet.container, flex: 4, padding: 24, backgroundColor: '#fefefe'}}>
					<View style={MainStyleSheet.row}>
						<View style={MainStyleSheet.colOne}>
							<Input placeholder="Username" onTextChange={usernameTextChange} value={username} autoCorrect={false} />
						</View>
					</View>

					<View style={MainStyleSheet.row}>
						<View style={MainStyleSheet.colOne}>
							<Input placeholder="Password" onTextChange={passwordTextChange} value={password} secureTextEntry={true} />
						</View>
					</View>

					<View style={MainStyleSheet.row}>
						<View style={MainStyleSheet.colOne}>
							<Button buttonText="Login with Email" onPress={emailLogin} />
						</View>
					</View>
				</KeyboardAvoidingView>

				<View style={{...MainStyleSheet.container, flex: 2, paddingBottom: 32, justifyContent: 'flex-end'}}>
					<View style={MainStyleSheet.row}>
						<View style={MainStyleSheet.colOne}>
							<Text style={{...MainStyleSheet.text, textAlign: 'center', fontSize: 16}} onPress={() => { props.navigation.navigate('Register') }}>Click here to register with your email.</Text>
						</View>
					</View>
				</View>
			</View>
		);
	}	
};

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		width: '100%',
		justifyContent: 'center',
		alignItems: 'center',
		padding: 24
	},
	logo: {
		width: '80%',
		height: '80%'
	}
});

export default LoginScreen;