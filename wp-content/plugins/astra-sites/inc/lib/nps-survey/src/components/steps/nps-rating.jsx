import useStore from '../../store/store.js';
import HeadingContent from '../dialog/heading-content.jsx';
import HeadingTitle from '../dialog/heading-title.jsx';
import { handleNpsSurveyApi } from '../../utils/helper.js';
import { __ } from '@wordpress/i18n';
import { useState } from '@wordpress/element';
const { imageDir } = npsSurvey;

const NpsRating = function () {
	const { dispatch } = useStore();
	const ratings = Array.from( { length: 10 }, ( _, i ) => i + 1 );
	const [ processing, setProcessing ] = useState( false );
	const [ selectedRating, setSelectedRating ] = useState( null );

	const handleRatingResponse = async function ( number ) {
		if ( selectedRating !== null ) {
			return; // Prevent multiple submissions
		}
		setSelectedRating( number );
		dispatch( {
			type: 'SET_NPS_RATING',
			payload: number,
		} );

		if ( number >= 8 ) {
			handleNpsSurveyApi(
				number,
				'',
				'plugin-rating',
				dispatch,
				setProcessing
			);
		} else {
			dispatch( {
				type: 'SET_CURRENT_STEP',
				payload: 'comment',
			} );
		}
	};

	return (
		<div className={ processing && 'opacity-50 cursor-progress' }>
			<div className="flex items-center justify-start gap-2">
				<img
					className="size-6"
					src={ `${ imageDir }logo.svg` }
					alt="Brand Logo"
				/>
				<HeadingTitle>
					{ __( 'Starter Templates', 'astra-sites' ) }
				</HeadingTitle>
			</div>
			<HeadingContent>
				{ __(
					'How likely are you to recommend Starter Templates to your friends or colleagues?',
					'astra-sites'
				) }
			</HeadingContent>
			<div className="mt-5">
				<span className="isolate inline-flex gap-2 w-full">
					{ ratings.map( ( number ) => (
						<button
							type="button"
							key={ number }
							onClick={ () => handleRatingResponse( number ) }
							className="relative flex-1 inline-flex items-center justify-center bg-white py-1.5 text-sm font-medium text-nps-button-text hover:bg-gray-50 focus:z-10 border border-solid border-border-nps-primary rounded-md transition-colors ease-in-out duration-150 hover:cursor-pointer"
						>
							{ number }
						</button>
					) ) }
				</span>
			</div>
			<div className="mt-3 flex items-center justify-between">
				<span className="text-secondary-text text-xs font-medium leading-5">
					{ __( 'Very unlikely', 'astra-sites' ) }
				</span>
				<span className="text-secondary-text text-xs font-medium leading-5">
					{ __( 'Very likely', 'astra-sites' ) }
				</span>
			</div>
		</div>
	);
};

export default NpsRating;
