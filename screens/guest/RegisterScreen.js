// System Libraries
import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, Image, Alert, ActivityIndicator, KeyboardAvoidingView, TouchableWithoutFeedback } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

// Actions
import { userSuccess, userError, userDirection, userLoading, createUser } from '../../store/actions/UserActions';

// Components
import Input from '../../components/Input';
import Button from '../../components/Button';

// Styling
import Colors from '../../constants/Colors';
import MainStyleSheet from '../../styles/MainStyleSheet';

const RegisterScreen = props => {
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

	const [fillCheck, setFillCheck] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [password, setPassword] = useState('');
	const [username, setUsername] = useState('');

	/* -------------------- *\
	|  3. Selectors          |
	\* -------------------- */

	const user_success = useSelector(state => state.user.success);
	const user_error = useSelector(state => state.user.error);
	const user_direction = useSelector(state => state.user.direction);
	const user_loading = useSelector(state => state.user.loading);

	/* -------------------- *\
	|  4. Effects            |
	\* -------------------- */

	useEffect(() => {
		if (user_success == true) {
			if (user_direction == 'create_user') {
				dispatch(userSuccess(false));
				dispatch(userDirection(''));

				// Navigate to intro quiz
				props.navigation.navigate('Categories');
			}
		}
	}, [user_success]);

	useEffect(() => {
		setIsLoading(user_loading);
	}, [user_loading]);

	useEffect(() => {
		if (user_error != '') {
			Alert.alert('Error', user_error, [{text: 'OK', onPress: () => { dispatch(userError('')) }}]);
		}
	}, [user_error]);

	useEffect(() => {
		if ((firstName != "") && (lastName != "") && (username != "") && (password != "")) {
			setFillCheck(true);
		} else {
			setFillCheck(false);
		}
	}, [firstName, lastName, username, password]);

	/* -------------------- *\
	|  5. Functions          |
	\* -------------------- */

	const firstNameHandler = (text) => {
		setFirstName(text);
	};

	const lastNameHandler = (text) => {
		setLastName(text);
	};

	const usernameHandler = (text) => {
		setUsername(text);
	};

	const passwordHandler = (text) => {
		setPassword(text);
	};

	const registerHandler = () => {
		if (fillCheck == true) {
			// Using '1' for mode means that this is a straight username registered account
			dispatch(createUser(firstName, lastName, username, password, 1));
		} else {
			Alert.alert('Error', 'Please fill out all fields.', [{text: 'OK'}]);
		}
	};

	/* -------------------- *\
	|  6. Render             |
	\* -------------------- */

	if (isLoading == true) {
		return (
			<View style={MainStyleSheet.screen}>
				<View style={{...MainStyleSheet.container, flex: 4}}>
					<View style={{...MainStyleSheet.container, flex: 2, justifyContent: 'flex-end'}}>
						<View style={MainStyleSheet.row}>
							<View style={{...MainStyleSheet.colOne, alignItems: 'center'}}>
								<Image source={require('../../assets/logo.png')} style={styles.logo} />
							</View>
						</View>
					</View>

					<View style={{...MainStyleSheet.container, flex: 1, padding: 24, justifyContent: 'flex-start', alignItems: 'center'}}>
						<ActivityIndicator color={Colors.primary} size="large" />
					</View>
				</View>
				<View style={{...MainStyleSheet.container, flex: 1, justifyContent: 'flex-end', paddingBottom: 32}}>
					<View style={MainStyleSheet.row}>
						<View style={MainStyleSheet.colOne}></View>
					</View>
				</View>
			</View>
		);
	}

	return (
		<View style={MainStyleSheet.screen}>
			<KeyboardAvoidingView style={{flex: 4}} behavior="padding" keyboardVerticalOffset={160}>
				<View style={{...MainStyleSheet.container, flex: 2, justifyContent: 'flex-end'}}>
					<View style={MainStyleSheet.row}>
						<View style={{...MainStyleSheet.colOne, alignItems: 'center'}}>
							<Image source={require('../../assets/logo.png')} style={styles.logo} />
						</View>
					</View>
				</View>

				<View style={{...MainStyleSheet.container, flex: 1, padding: 24}}>
					<View style={MainStyleSheet.row}>
						<View style={{...MainStyleSheet.colOneHalf, paddingRight: 8}}>
							<Input placeholder="First Name" multiline={false} value={firstName} onChangeText={firstNameHandler} />
						</View>
						<View style={{...MainStyleSheet.colOneHalf, paddingLeft: 8}}>
							<Input placeholder="Last Name" multiline={false} value={lastName} onChangeText={lastNameHandler} />
						</View>
					</View>

					<View style={MainStyleSheet.row}>
						<View style={MainStyleSheet.colOne}>
							<Input placeholder="Username" multiline={false} value={username} onChangeText={usernameHandler} />
						</View>
					</View>

					<View style={MainStyleSheet.row}>
						<View style={MainStyleSheet.colOne}>
							<Input placeholder="Password" multiline={false} secureTextEntry={true} value={password} onChangeText={passwordHandler} />
						</View>
					</View>

					<View style={MainStyleSheet.row}>
						<View style={MainStyleSheet.colOne}>
							<Button buttonText="Register" onPress={registerHandler} />
						</View>
					</View>
				</View>
			</KeyboardAvoidingView>

			<View style={{...MainStyleSheet.container, flex: 1, justifyContent: 'flex-end', paddingBottom: 32}}>
				<View style={MainStyleSheet.row}>
					<View style={MainStyleSheet.colOne}>
						<Text style={{...MainStyleSheet.text, textAlign: 'center', fontSize: 16}} onPress={() => { props.navigation.navigate('Login') }}>Already have an account? Click here to login.</Text>
					</View>
				</View>
			</View>
		</View>
	);
	
};

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		width: '100%',
		height: '100%',
		justifyContent: 'center',
		alignItems: 'center'
	},
	logo: {
		width: '80%',
		height: '80%'
	}
});

export default RegisterScreen;