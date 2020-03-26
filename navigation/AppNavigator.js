/* ---------------------- *\
|	Libraries              | 
\* ---------------------- */

import React from 'react';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import { createSwitchNavigator, createAppContainer} from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack'; 
import { Platform, Button, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useDispatch } from 'react-redux';

/* ---------------------- *\
|	Screens                |
\* ---------------------- */

import OnboardingScreen from '../screens/guest/OnboardingScreen';
import LoginScreen from '../screens/guest/LoginScreen';
import RegisterScreen from '../screens/guest/RegisterScreen';
import IntroQuizScreen from '../screens/guest/IntroQuizScreen';
import RecommendationsScreen from '../screens/member/RecommendationScreen';
import RoadmapOverviewScreen from '../screens/member/RoadmapOverviewScreen';
import RoadmapEnrollmentScreen from '../screens/member/RoadmapEnrollmentScreen';
import RoadmapDetailsScreen from '../screens/member/RoadmapDetailsScreen';
import ContentScreen from '../screens/member/ContentScreen';
import SearchScreen from '../screens/member/SearchScreen';
import EnrolledScreen from '../screens/member/EnrolledScreen';
import ProfileScreen from '../screens/member/ProfileScreen';
import CreateRoadmapScreen from '../screens/members/CreateRoadmapScreen';
import CreateSectionsScreen from '../screens/members/CreateSectionsScreen';

/* ---------------------- *\
|	Constants              |
\* ---------------------- */

import Colors from '../constants/Colors';

/* ---------------------- *\
|	Default Nav Options    |
\* ---------------------- */

const defaultNavOptions = {
	headerStyle: {
		backgroundColor: Platform.OS === 'android' ? Colors.lightBackground : ''
	},
	headerTitleStyle: {
		fontFamily: 'montserrat-bold'
	},
	headerBackTitleStyle: {
		fontFamily: 'montserrat'
	},
	headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primary
};

/* ---------------------- *\
|	Navigators             |
\* ---------------------- */

const GuestNavigator = createSwitchNavigator({
	Onboarding: {
		screen: OnboardingScreen
	},
	Login: {
		screen: LoginScreen
	},
	Register: {
		screen: RegisterScreen
	},
	Quiz: {
		screen: IntroQuizScreen
	}
});

const RecommendationsNavigator = createStackNavigator({
	Recommendations: {
		screen: RecommendationsScreen
	},
	RoadmapOverview: {
		screen: RoadmapOverviewScreen
	},
	RoadmapEnrollment: {
		screen, RoadmapEnrollmentScreen
	},
	RoadmapDetails: {
		screen: RoadmapDetailsScreen
	},
	Content: {
		screen: ContentScreen
	}
});

const SearchNavigator = createStackNavigator({
	Search: {
		screen: SearchScreen
	},
	RoadmapOverview: {
		screen: RoadmapOverviewScreen
	},
	RoadmapEnrollment: {
		screen: RoadmapEnrollmentScreen
	},
	RoadmapDetails: {
		screen: RoadmapDetailsScreen
	},
	Content: {
		screen: ContentScreen
	}
});

const EnrolledNavigator = createStackNavigator({
	Enrolled: {
		screen: EnrolledScreen
	},
	RoadmapDetails: {
		screen: RoadmapDetailsScreen
	},
	Content: {
		screen: ContentScreen
	}
});

const ProfileNavigator = createStackNavigator({
	Profile: {
		screen: ProfileScreen
	},
	CreateRoadmap: {
		screen: CreateRoadmapScreen
	},
	CreateSections: {
		screen: CreateSectionsScreen
	}
});

/* ---------------------- *\
|	Tab Bar Config         |
\* ---------------------- */

const homeTabConfig = {
	Recommendations: {
		screen: RecommendationsNavigator,
		navigationOptions: {
			tabBarIcon: tabInfo => {
				return (<Ionicons name="ios-paper" size={25} color={tabInfo.tintColor} />);
			},
			tabBarColor: Colors.primary,
			tabBarLabel: Platform.OS === 'android' ? (<Text style={{ fontFamily: 'montserrat' }}>Recommendations</Text>) : ('Recommendations')
		}
	},
	Search: {
		screen: SearchNavigator,
		navigationOptions: {
			tabBarIcon: tabInfo => {
				return (<Ionicons name="ios-search" size={25} color={tabInfo.tintColor} />);
			},
			tabBarColor: Colors.primary,
			tabBarLabel: Platform.OS === 'android' ? (<Text style={{ fontFamily: 'montserrat' }}>Search</Text>) : ('Search')
		}
	},
	Enrolled: {
		screen: EnrolledNavigator,
		navigationOptions: {
			tabBarIcon: tabInfo => {
				return (<Ionicons name="ios-ribbon" size={25} color={tabInfo.tintColor} />);
			},
			tabBarColor: Colors.primary,
			tabBarLabel: Platform.OS === 'android' ? (<Text style={{ fontFamily: 'montserrat' }}>Enrolled</Text>) : ('Enrolled')
		}
	},
	Profile: {
		screen: ProfileNavigator,
		navigationOptions: {
			tabBarIcon: tabInfo => {
				return (<Ionicons name="ios-user" size={25} color={tabInfo.tintColor} />);
			},
			tabBarColor: Colors.primary,
			tabBarLabel: Platform.OS === 'android' ? (<Text style={{ fontFamily: 'montserrat' }}>Profile</Text>) : ('Profile')
		}
	}
};

const HomeNavigator = Platform.OS === 'android' ? createMaterialBottomTabNavigator(homeTabConfig, {
	activeTintColor: 'white',
	shifting: true,
	barStyle: {
		backgroundColor: Colors.primaryColor
	}
}) : createBottomTabNavigator(homeTabConfig, {
	tabBarOptions: {
		labelStyle: {
			fontFamily: 'montserrat'
		},
		activeTintColor: Colors.primaryColor
	}
});

const MainNavigator = createSwitchNavigator({
	Guest: GuestNavigator,
	Home: HomeNavigator
});

export default createAppContainer(MainNavigator);