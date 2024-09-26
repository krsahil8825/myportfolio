import actionTypes from './action-types';

const reducer = ( state, { type, payload } ) => {
	switch ( type ) {
		case actionTypes.SET_SHOW_NPS:
			return { ...state, showNps: payload };
		case actionTypes.SET_CURRENT_STEP:
			return { ...state, currentStep: payload };
		case actionTypes.SET_NPS_RATING:
			return { ...state, npsRating: payload };
		default:
			return state;
	}
};

export default reducer;
