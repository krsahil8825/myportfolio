import { useState } from '@wordpress/element';
import useStore from '../../store/store.js';
import { HeadingTitle, HeadingContent } from '../dialog';
import Button from '../button';
import LoadingSpinner from '../loading-spinner';
import { cn, handleNpsSurveyApi } from '../../utils/helper.js';
import { __ } from '@wordpress/i18n';

const Comment = function () {
	const [ feedback, setFeedback ] = useState( '' );
	const { npsRating } = useStore( ( state ) => ( {
		npsRating: state.npsRating,
	} ) );
	const [ processing, setProcessing ] = useState( false );

	const { dispatch } = useStore();

	const handleCommentChange = ( event ) => {
		setFeedback( event.target.value );
	};

	const handleCommentResponse = async function ( event ) {
		event.preventDefault();

		if ( processing ) {
			return;
		}

		handleNpsSurveyApi( npsRating, feedback, '', dispatch, setProcessing );
	};

	return (
		<div>
			<div className="flex justify-between">
				<HeadingTitle>
					{ __( 'Thank you for your feedback!', 'astra-sites' ) }
				</HeadingTitle>
			</div>
			<HeadingContent>
				{ __(
					'We value your input. How can we improve your experience?',
					'astra-sites'
				) }
			</HeadingContent>
			<div className="mt-5">
				<form onSubmit={ handleCommentResponse }>
					<div className="mt-2">
						<textarea
							rows={ 4 }
							cols={ 65 }
							name="comment"
							id="comment"
							className="block w-full rounded-md py-1.5 text-zip-body-text shadow-sm border border-border-nps-primary border-solid placeholder:text-nps-placeholder-text focus:ring-1 focus:ring-nps-button-background sm:text-sm sm:leading-6"
							defaultValue={ '' }
							value={ feedback }
							onChange={ handleCommentChange }
						/>
					</div>

					<div className="mt-3 flex justify-start">
						<Button
							className="relative py-2 px-4 font-semibold"
							variant="primary"
							type="submit"
							size="small"
						>
							{ processing && (
								<span className="absolute inset-0 inline-flex items-center justify-center">
									<LoadingSpinner />
								</span>
							) }
							<span className={ cn( processing && 'invisible' ) }>
								{ __( 'Submit', 'astra-sites' ) }
							</span>
						</Button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default Comment;
