import { NpsRating, Comment, PluginRating } from '../steps';
import useStore from '../../store/store.js';
import { XMarkIcon } from '@heroicons/react/20/solid';
import { handleCloseNpsSurvey } from '../../utils/helper.js';

const NpsDialog = function () {
	const { showNps, currentStep } = useStore( ( state ) => ( {
		showNps: state.showNps,
		currentStep: state.currentStep,
	} ) );

	const { dispatch } = useStore();

	if ( ! showNps ) {
		return;
	}

	const renderStep = () => {
		if ( 'nps-rating' === currentStep ) {
			return <NpsRating />;
		}

		if ( 'comment' === currentStep ) {
			return <Comment />;
		}

		if ( 'plugin-rating' === currentStep ) {
			return <PluginRating />;
		}
	};

	const closeNpsSurvey = function () {
		handleCloseNpsSurvey( dispatch, currentStep );
	};

	return (
		<div className="max-w-[30rem] w-full flex bg-white shadow-nps sm:rounded-lg fixed bottom-2 right-2 z-10 p-4 sm:p-5 border border-solid border-border-tertiary">
			{ renderStep() }
			<span
				className="absolute top-3 right-3 cursor-pointer"
				onClick={ closeNpsSurvey }
			>
				<XMarkIcon
					className="h-5 w-5 text-zip-app-inactive-icon"
					aria-hidden="true"
				/>
			</span>
		</div>
	);
};

export default NpsDialog;
