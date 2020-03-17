/* ---------------- *\
|  Categories        |
|--------------------|
|  1. CRUD           |
|  2. Directional    |
|  3. Status         |
|  4. Helper         |
\* -----------------*/

// 1. CRUD for Categories
export const READ_CATEGORY = 'read_category';

// 2. Directional for Categories
export const CATEGORY_DIRECTION = 'category_direction';

// 3. Status for Categories
export const CATEGORY_LOADING = 'category_loading';
export const CATEGORY_SUCCESS = 'category_success';
export const CATEGORY_ERROR = 'category_error';

// 4. Helper for Categories
export const GET_CATEGORIES = 'get_categories';

/* ---------------- *\
|  Topics            |
|--------------------|
|  1. CRUD           |
|  2. Directional    |
|  3. Status         |
|  4. Helper         |
\* -----------------*/

// 1. CRUD for Topics
export const CREATE_TOPIC = 'create_topic';
export const READ_TOPIC = 'read_topic';

// 2. Directional for Topics
export const TOPIC_DIRECTION = 'topic_direction';

// 3. Status for Topics
export const TOPIC_LOADING = 'topic_loading';
export const TOPIC_SUCCESS = 'topic_success';
export const TOPIC_ERROR = 'topic_error';

// 4. Helper for Topics
export const GET_TOPICS = 'get_topics';
export const GET_TOPICS_FOR_CATEGORY = 'get_topics_for_category';

/* ---------------- *\
|  Roadmaps          |
|--------------------|
|  1. CRUD           |
|  2. Directional    |
|  3. Status         |
|  4. Helper         |
\* -----------------*/

// 1. CRUD for Roadmaps
export const CREATE_ROADMAP = 'create_roadmap';
export const READ_ROADMAP = 'read_roadmap';
export const UPDATE_ROADMAP = 'update_roadmap';
export const DELETE_ROADMAP = 'delete_roadmap';

// 2. Directional for Roadmap
export const ROADMAP_DIRECTION = 'roadmap_direction';

// 3. Status for Roadmap
export const ROADMAP_LOADING = 'roadmap_loading';
export const ROADMAP_SUCCESS = 'roadmap_success';
export const ROADMAP_ERROR = 'roadmap_error';

// 4. Helper for Roadmap
export const GET_ROADMAPS = 'get_roadmaps';
export const GET_ROADMAPS_FOR_CATEGORY = 'get_roadmaps_for_category';
export const GET_ROADMAPS_FOR_TOPIC = 'get_roadmaps_for_topic';
export const GET_ROADMAPS_FOR_USER = 'get_roadmaps_for_user';

/* ---------------- *\
|  Enrollments       |
|--------------------|
|  1. CRUD           |
|  2. Directional    |
|  3. Status         |
|  4. Helper         |
\* -----------------*/

// 1. CRUD for Enrollments
export const CREATE_ENROLLMENT = 'create_enrollment';
export const DELETE_ENROLLMENT = 'delete_enrollment';

// 2. Directional for Enrollments
export const ENROLLMENT_DIRECTION = 'enrollment_direction';

// 3. Status for Enrollments
export const ENROLLMENT_LOADING = 'enrollment_loading';
export const ENROLLMENT_SUCCESS = 'enrollment_success';
export const ENROLLMENT_ERROR = 'enrollment_error';

// 4. Helper for Enrollment
export const GET_ENROLLMENTS = 'get_enrollments';
export const GET_ENROLLMENTS_FOR_USER = 'get_enrollments_for_user';
export const GET_ENROLLMENTS_FOR_ROADMAP = 'get_enrollments_for_roadmap';

/* ---------------- *\
|  Sections          |
|--------------------|
|  1. CRUD           |
|  2. Directional    |
|  3. Status         |
|  4. Helper         |
\* -----------------*/

// 1. CRUD for Sections
export const CREATE_SECTION = 'create_section';
export const READ_SECTION = 'read_section';
export const UPDATE_SECTION = 'update_section';
export const DELETE_SECTION = 'delete_section';

// 2. Directional for Sections
export const SECTION_DIRECTION = 'section_direction';

// 3. Status for Sections
export const SECTION_LOADING = 'section_loading';
export const SECTION_SUCCESS = 'section_success';
export const SECTION_ERROR = 'section_error';

// 4. Helper for Sections
export const GET_SECTIONS_FOR_ROADMAP = 'get_sections_for_roadmap';

/* ---------------- *\
|  Content           |
|--------------------|
|  1. CRUD           |
|  2. Directional    |
|  3. Status         |
|  4. Helper         |
\* -----------------*/

// 1. CRUD for Content
export const CREATE_CONTENT = 'create_content';
export const READ_CONTENT = 'read_content';
export const UPDATE_CONTENT = 'update_content';
export const DELETE_CONTENT = 'delete_content';

// 2. Directional for Content
export const CONTENT_DIRECTION = 'content_direction';

// 3. Status for Content
export const CONTENT_LOADING = 'content_loading';
export const CONTENT_SUCCESS = 'content_success';
export const CONTENT_ERROR = 'content_error';

// 4. Helper Functions for Content
export const GET_CONTENT_FOR_SECTION = 'get_content_for_section';
export const GET_CONTENT_FOR_ROADMAP = 'get_content_for_roadmap';

/* ---------------- *\
|  User              |
|--------------------|
|  1. CRUD           |
|  2. Directional    |
|  3. Status         |
|  4. Helper         |
\* -----------------*/

// 1. CRUD for User
export const CREATE_USER = 'create_user';
export const UPDATE_USER = 'update_user';
export const DELETE_USER = 'delete_user';

// 2. Directional for User
export const USER_DIRECTION = 'user_direction';

// 3. Status for User
export const USER_LOADING = 'user_loading';
export const USER_SUCCESS = 'user_success';
export const USER_ERROR = 'user_error';

// 4. Helper Functions for User
export const LOGIN_USER = 'login_user';