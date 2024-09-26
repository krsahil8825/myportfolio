import { twMerge } from 'tailwind-merge';
import clsx from 'clsx';
import apiFetch from '@wordpress/api-fetch';

export const cn = ( ...classNames ) => twMerge( clsx( classNames ) );

export const handleCloseNpsSurvey = async function ( dispatch, step ) {
	try {
		const response = await apiFetch( {
			path: '/nps-survey/v1/dismiss-nps-survey',
			method: 'POST',
			headers: {
				'X-WP-Nonce': npsSurvey.rest_api_nonce,
				'content-type': 'application/json',
			},
			data: {
				current_step: step,
			},
		} );

		if ( response.success ) {
			console.log( 'NPS Survey dismissed!' );
			dispatch( {
				type: 'SET_SHOW_NPS',
				payload: false,
			} );
		}
	} catch ( error ) {
		// TODO: Handle error
	}
};

export const handleNpsSurveyApi = async function (
	npsRating,
	feedback,
	step,
	dispatch,
	setProcessing
) {
	try {
		setProcessing( true );
		const response = await apiFetch( {
			path: 'nps-survey/v1/rating',
			method: 'POST',
			headers: {
				'X-WP-Nonce': npsSurvey.rest_api_nonce,
				'content-type': 'application/json',
			},
			data: {
				rating: npsRating,
				comment: feedback,
			},
		} );

		if ( response.success ) {
			if ( '' === step ) {
				dispatch( {
					type: 'SET_SHOW_NPS',
					payload: false,
				} );
			}
			dispatch( {
				type: 'SET_CURRENT_STEP',
				payload: step,
			} );
		}
		setProcessing( false );
	} catch ( error ) {
		// TODO: Handle error
	}
};
