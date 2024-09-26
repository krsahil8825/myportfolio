import { Outlet } from '@tanstack/react-router';
import { CheckIcon } from '@heroicons/react/24/outline';
import { memo, useEffect, useLayoutEffect, Fragment } from '@wordpress/element';
import { useSelect, useDispatch } from '@wordpress/data';
import { __ } from '@wordpress/i18n';
import { removeQueryArgs } from '@wordpress/url';
import {
	classNames,
	getLocalStorageItem,
	setLocalStorageItem,
} from '../../helpers/index';
import PreviewWebsite from '../../pages/preview';
import { STORE_KEY } from '../../store';
import LimitExceedModal from '../limit-exceeded-modal';
import ContinueProgressModal from '../continue-progress-modal';
import AiBuilderExitButton from '../ai-builder-exit-button';
import { AnimatePresence } from 'framer-motion';
import { useNavigateSteps, steps, useValidateStep } from '../../router';
import { Toaster } from 'react-hot-toast';
import ErrorBoundary from '../../pages/error-boundary';
import useEffectAfterMount from '../../hooks/use-effect-after-mount';
import ApiErrorModel from '../api-error-model';

const { logoUrl } = aiBuilderVars;

const OnboardingAI = () => {
	const {
		currentStepURL,
		currentStepIndex: currentStep,
		navigateTo,
	} = useNavigateSteps();
	const redirectToStepURL = useValidateStep( currentStepURL );

	const authenticated = aiBuilderVars?.zip_token_exists,
		isAuthScreen = currentStep === 0;

	const { setContinueProgressModal } = useDispatch( STORE_KEY );

	const aiOnboardingDetails = useSelect( ( select ) => {
		const { getOnboardingAI } = select( STORE_KEY );
		return getOnboardingAI();
	} );
	const selectedTemplate = aiOnboardingDetails?.stepData?.selectedTemplate,
		{ loadingNextStep } = aiOnboardingDetails;

	// Redirect to the required step.
	useEffect( () => {
		if ( ! aiBuilderVars.zip_token_exists ) {
			navigateTo( {
				to: '/',
				replace: true,
			} );
			return;
		}
		navigateTo( {
			to: redirectToStepURL,
			replace: true,
		} );
	}, [ currentStep, aiOnboardingDetails ] );

	useEffectAfterMount( () => {
		if (
			! aiOnboardingDetails?.stepData?.businessType ||
			'' === aiOnboardingDetails?.stepData?.businessType
		) {
			return;
		}
		setLocalStorageItem(
			'ai-builder-onboarding-details',
			aiOnboardingDetails
		);
	}, [ aiOnboardingDetails ] );

	useEffect( () => {
		const savedAiOnboardingDetails = getLocalStorageItem(
			'ai-builder-onboarding-details'
		);
		if (
			savedAiOnboardingDetails?.stepData?.businessType &&
			authenticated
		) {
			setContinueProgressModal( {
				open: true,
			} );
		}
	}, [] );

	const dynamicStepClassNames = ( step, stepIndex ) => {
		if ( step === stepIndex ) {
			return 'border-accent-st bg-white text-accent-st border-solid';
		}
		if ( step > stepIndex ) {
			return 'bg-secondary-text text-white border-secondary-text border-solid';
		}
		return 'border-solid border-step-connector text-secondary-text';
	};

	const dynamicClass = function ( cStep, sIndex ) {
		if ( steps?.[ sIndex ].layoutConfig?.screen === 'done' ) {
			return '';
		}
		if ( cStep === sIndex ) {
			return 'bg-accent-st';
		}
		return 'bg-border-line-inactive';
	};

	const urlParams = new URLSearchParams( window.location.search );
	useLayoutEffect( () => {
		const token = urlParams.get( 'token' );
		if ( token ) {
			const url = removeQueryArgs(
				window.location.href,
				'token',
				'email',
				'action',
				'credit_token'
			);

			window.onbeforeunload = null;
			window.history.replaceState( {}, '', url + '#/' );
		}
	}, [ currentStep, currentStepURL, aiOnboardingDetails ] );

	const getStepIndex = ( value, by = 'path' ) => {
		return steps.findIndex( ( item ) => item[ by ] === value );
	};

	const moveToStep = ( stepURL, stepIndex ) => () => {
		if (
			currentStep === stepIndex ||
			currentStep > getStepIndex( '/features' ) ||
			currentStep < stepIndex ||
			loadingNextStep
		) {
			return;
		}

		navigateTo( {
			to: stepURL,
		} );
	};

	return (
		<>
			<div
				id="spectra-onboarding-ai"
				className={ classNames(
					'font-figtree h-screen grid grid-cols-1 shadow-medium grid-rows-[4rem_1fr]',
					isAuthScreen && 'grid-rows-1'
				) }
			>
				{ ! isAuthScreen && (
					<header
						className={ classNames(
							'w-full h-full grid grid-cols-[5rem_1fr_5rem] items-center justify-between md:justify-start z-[5] relative bg-white shadow',
							steps[ currentStep ]?.layoutConfig?.hideHeader &&
								'justify-center md:justify-between'
						) }
					>
						{ /* Brand logo */ }
						<img
							className="h-10 mx-auto"
							src={ logoUrl }
							alt={ __( 'Build with AI', 'ai-builder' ) }
						/>
						{ /* Steps/Navigation items */ }
						{ ! steps[ currentStep ]?.layoutConfig?.hideHeader && (
							<nav className="hidden md:flex items-center justify-center gap-4 flex-1">
								{ steps.map(
									(
										{
											path,
											layoutConfig: {
												name,
												hideStep,
												stepNumber,
											},
										},
										stepIdx
									) =>
										hideStep ? (
											<Fragment key={ stepIdx } />
										) : (
											<Fragment key={ stepIdx }>
												<div
													className={ classNames(
														'flex items-center',
														{
															'cursor-pointer':
																currentStep >
																	stepIdx &&
																currentStep <=
																	getStepIndex(
																		'/features'
																	) &&
																! loadingNextStep,
														}
													) }
													key={ stepIdx }
													onClick={ moveToStep(
														path,
														stepIdx
													) }
												>
													<div
														className={ classNames(
															'flex items-center gap-2'
														) }
													>
														<div
															className={ classNames(
																'rounded-full border border-border-primary text-xs font-semibold flex items-center justify-center w-5 h-5',
																dynamicStepClassNames(
																	currentStep,
																	stepIdx
																)
															) }
														>
															{ currentStep >
															stepIdx ? (
																<CheckIcon className="h-3 w-3" />
															) : (
																<span>
																	{
																		stepNumber
																	}
																</span>
															) }
														</div>
														<div
															className={ classNames(
																'text-sm font-medium text-secondary-text',
																currentStep ===
																	stepIdx &&
																	'text-accent-st'
															) }
														>
															{ name }
														</div>
													</div>
												</div>
												{ steps.length - 1 > stepIdx &&
													! (
														steps[ stepIdx + 1 ]
															?.layoutConfig
															?.hideStep &&
														steps[ stepIdx + 1 ]
															?.layoutConfig
															?.screen === 'done'
													) && (
														<div
															className={ classNames(
																'w-8 h-px self-center',
																dynamicClass(
																	currentStep,
																	stepIdx
																)
															) }
														/>
													) }
											</Fragment>
										)
								) }
							</nav>
						) }
						{ /* Close button */ }
						{ /* Do not show on Migration step */ }
						{ getStepIndex( '/done' ) !== currentStep &&
							getStepIndex( '/building-website' ) !==
								currentStep && (
								<div className="[grid-area:1/3] flex items-center justify-center mx-auto">
									<AiBuilderExitButton exitButtonClassName="text-icon-tertiary hover:text-icon-secondary" />
								</div>
							) }
					</header>
				) }
				<main
					id="sp-onboarding-content-wrapper"
					className="flex-1 overflow-x-hidden h-full bg-container-background"
				>
					<ErrorBoundary>
						<div className="h-full w-full relative flex">
							<div
								className={ classNames(
									'w-full max-h-full flex flex-col flex-auto items-center overflow-y-auto',
									! isAuthScreen &&
										'px-5 pt-5 [&:has(.max-w-container)]:pb-5 md:px-10 md:pt-10 md:[&:has(.max-w-container)]:pb-10 lg:px-14 lg:pt-14 lg:[&:has(.max-w-container)]:pb-14 xl:px-20 xl:pt-16 xl:[&:has(.max-w-container)]:pb-20',
									steps[ currentStep ]?.layoutConfig
										?.contentClassName
								) }
							>
								{ /* Renders page content */ }
								<Outlet />
							</div>
						</div>
					</ErrorBoundary>
				</main>
				<LimitExceedModal />
				<ContinueProgressModal />
				<ApiErrorModel />
			</div>
			<div className="absolute top-0 left-0 z-20">
				<AnimatePresence>
					{ !! selectedTemplate && currentStepURL === '/design' && (
						<PreviewWebsite />
					) }
				</AnimatePresence>
			</div>
			{ /* Toaster container */ }
			<Toaster position="top-right" reverseOrder={ false } gutter={ 8 } />
		</>
	);
};

export default memo( OnboardingAI );
