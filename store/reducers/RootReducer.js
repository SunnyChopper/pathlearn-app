import { combineReducers } from 'redux';

import CategoryReducer from './CategoryReducer';
import UserCategoryReducer from './UserCategoryReducer';
import ContentReducer from './ContentReducer';
import EnrollmentReducer from './EnrollmentReducer';
import RoadmapReducer from './RoadmapReducer';
import SectionReducer from './SectionReducer';
import TopicReducer from './TopicReducer';
import UserReducer from './UserReducer';

const RootReducer = combineReducers({
	categories: CategoryReducer,
	user_categories: UserCategoryReducer,
	content: ContentReducer,
	enrollments: EnrollmentReducer,
	roadmaps: RoadmapReducer,
	sections: SectionReducer,
	topics: TopicReducer,
	user: UserReducer
});

export default RootReducer;