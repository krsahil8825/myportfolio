import { redux } from 'zustand/middleware';
import { create } from 'zustand';
import reducer from './reducer';

export const initialState = {
	showNps: npsSurvey?.is_show_nps,
	currentStep:
		'plugin-rating' === npsSurvey.nps_status?.dismiss_step
			? 'plugin-rating'
			: 'nps-rating',
	npsRating: null,
};

const useStore = create( redux( reducer, initialState ) );

export default useStore;
