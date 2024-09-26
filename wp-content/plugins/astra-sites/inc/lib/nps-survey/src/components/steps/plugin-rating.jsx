import { handleCloseNpsSurvey } from '../../utils/helper.js';
import useStore from '../../store/store.js';
import { HeadingTitle, HeadingContent } from '../dialog';
import Button from '../button';
import { __ } from '@wordpress/i18n';

const PluginRating = function () {
	const { currentStep } = useStore( ( state ) => ( {
		currentStep: state.currentStep,
	} ) );

	const { dispatch } = useStore();

	const handlePluginRating = function () {
		handleCloseNpsSurvey( dispatch, currentStep );

		window.open(
			'https://wordpress.org/support/plugin/astra-sites/reviews/#new-post',
			'_blank'
		);
	};

	return (
		<div>
			<div className="flex justify-between">
				<HeadingTitle>
					{ __(
						'Thanks a lot for your feedback! 😍',
						'astra-sites'
					) }
				</HeadingTitle>
			</div>
			<HeadingContent>
				{ __(
					'Could you please do us a favor and give us a 5-star rating on WordPress? It would help others choose Starter Templates with confidence. Thank you!',
					'astra-sites'
				) }
			</HeadingContent>
			<div className="flex gap-5 mt-5">
				<div className="flex justify-start">
					<Button
						variant="primary"
						className="py-2 px-4 font-semibold"
						type="button"
						onClick={ handlePluginRating }
						size="small"
					>
						{ __( 'Rate the Plugin', 'astra-sites' ) }
					</Button>
				</div>
				<div className="flex justify-start">
					<Button
						variant="link"
						className="py-2 px-0 no-underline font-normal"
						type="button"
						onClick={ () =>
							handleCloseNpsSurvey( dispatch, currentStep )
						}
						size="small"
					>
						{ __( 'I already did!', 'astra-sites' ) }
					</Button>
				</div>
			</div>
		</div>
	);
};

export default PluginRating;
