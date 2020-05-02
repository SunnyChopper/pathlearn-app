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
import IntroQuizScreen from '../screens/member/IntroQuizScreen';
import SelectCategoriesScreen from '../screens/member/SelectCategoriesScreen';
import RecommendationsScreen from '../screens/member/RecommendationsScreen';
import RoadmapOverviewScreen from '../screens/member/RoadmapOverviewScreen';
import RoadmapEnrollmentScreen from '../screens/member/RoadmapEnrollmentScreen';
import RoadmapDetailsScreen from '../screens/member/RoadmapDetailsScreen';
import ContentScreen from '../screens/member/ContentScreen';
import SearchScreen from '../screens/member/SearchScreen';
import EnrolledScreen from '../screens/member/EnrolledScreen';
import ProfileScreen from '../screens/member/ProfileScreen';
import CreateRoadmapScreen from '../screens/member/CreateRoadmapScreen';
import CreateSectionScreen from '../screens/member/CreateSectionScreen';

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
	},
	Categories: {
		screen: SelectCategoriesScreen
	}
});

const RecommendationsNavigator = createStackNavigator({
	Recommendations: {
		screen: RecommendationsScreen,
		navigationOptions: {
			headerShown: false
		}
	},
	RoadmapOverview: {
		screen: RoadmapOverviewScreen
	},
	RoadmapEnrollment: {
		screen: RoadmapEnrollmentScreen,
		navigationOptions: {
			headerShown: false
		}
	},
	RoadmapDetails: {
		screen: RoadmapDetailsScreen
	},
	Content: {
		screen: ContentScreen,
		navigationOptions: {
			headerBackTitle: 'Back'
		}
	}
});

const SearchNavigator = createStackNavigator({
	Search: {
		screen: SearchScreen,
		navigationOptions: {
			headerShown: false
		}
	},
	RoadmapOverview: {
		screen: RoadmapOverviewScreen,
		
	},
	RoadmapEnrollment: {
		screen: RoadmapEnrollmentScreen,
		navigationOptions: {
			headerShown: false
		}
	},
	RoadmapDetails: {
		screen: RoadmapDetailsScreen,
		navigationOptions: {
			headerBackTitle: 'Back'
		}
	},
	Content: {
		screen: ContentScreen,
		navigationOptions: {
			headerBackTitle: 'Back'
		}
	}
});

const EnrolledNavigator = createStackNavigator({
	Enrolled: {
		screen: EnrolledScreen,
		navigationOptions: {
			headerShown: false
		}
	},
	RoadmapOverview: {
		screen: RoadmapOverviewScreen,
		navigationOptions: {
			headerBackTitle: 'Back'
		}
	},
	RoadmapDetails: {
		screen: RoadmapDetailsScreen,
		navigationOptions: {
			headerBackTitle: 'Back'
		}
	},
	Content: {
		screen: ContentScreen,
		navigationOptions: {
			headerBackTitle: 'Back'
		}
	}
});

const ProfileNavigator = createStackNavigator({
	Profile: {
		screen: ProfileScreen,
		navigationOptions: {
			headerShown: false
		}
	},
	RoadmapOverview: {
		screen: RoadmapOverviewScreen,
		navigationOptions: {
			headerBackTitle: 'Back'
		}
	},
	RoadmapDetails: {
		screen: RoadmapDetailsScreen,
		navigationOptions: {
			headerBackTitle: 'Back'
		}
	},
	CreateRoadmap: {
		screen: CreateRoadmapScreen,
		navigationOptions: {
			headerBackTitle: 'Back'
		}
	},
	CreateSection: {
		screen: CreateSectionScreen,
		navigationOptions: {
			headerBackTitle: 'Back'
		}
	}
});

/* ---------------------- *\
|	Tab Bar Config         |
\* ---------------------- */

const homeTabConfig = {
	Recommendations: {
		screen: RecommendationsNavigator,
		navigationOptions: ({navigation}) => {
			let { routeName } = navigation.state.routes[navigation.state.index];
			let navigationOptions = {
				tabBarIcon: tabInfo => {
					return (<Ionicons name="ios-paper" size={25} color={tabInfo.tintColor} />);
				},
				tabBarColor: Colors.primary,
				tabBarLabel: Platform.OS === 'android' ? (<Text style={{ fontFamily: 'montserrat' }}>Home</Text>) : ('Home')
			};

			if (routeName === 'RoadmapEnrollment') {
				navigationOptions.tabBarVisible = false;
			}

			return navigationOptions;
		}
	},
	Search: {
		screen: SearchNavigator,
		navigationOptions: ({navigation}) => {
			let { routeName } = navigation.state.routes[navigation.state.index];
			let navigationOptions = {
				tabBarIcon: tabInfo => {
					return (<Ionicons name="ios-search" size={25} color={tabInfo.tintColor} />);
				},
				tabBarColor: Colors.primary,
				tabBarLabel: Platform.OS === 'android' ? (<Text style={{ fontFamily: 'montserrat' }}>Search</Text>) : ('Search')
			};

			if (routeName === 'RoadmapEnrollment') {
				navigationOptions.tabBarVisible = false;
			}

			return navigationOptions;
		}
	},
	Enrolled: {
		screen: EnrolledNavigator,
		navigationOptions: {
			tabBarIcon: tabInfo => {
				return (<Ionicons name="ios-ribbon" size={25} color={tabInfo.tintColor} />);
			},
			tabBarColor: Colors.primary,
			tabBarLabel: Platform.OS === 'android' ? (<Text style={{ fontFamily: 'montserrat' }}>Enrolled</Text>) : ('Enrolled'),
		}
	},
	Profile: {
		screen: ProfileNavigator,
		navigationOptions: {
			tabBarIcon: tabInfo => {
				return (<Ionicons name="ios-person" size={25} color={tabInfo.tintColor} />);
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