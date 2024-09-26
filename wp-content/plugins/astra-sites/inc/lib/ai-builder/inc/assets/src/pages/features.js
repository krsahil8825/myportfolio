import { useEffect, useState } from '@wordpress/element';
import {
	FunnelIcon,
	HeartIcon,
	PlayCircleIcon,
	SquaresPlusIcon,
	CheckIcon,
	ChatBubbleLeftEllipsisIcon,
	WrenchIcon,
	PaintBrushIcon,
	Squares2X2Icon,
	QueueListIcon,
	ShoppingCartIcon,
} from '@heroicons/react/24/outline';
import { __ } from '@wordpress/i18n';
import { useDispatch, useSelect } from '@wordpress/data';
import apiFetch from '@wordpress/api-fetch';
import { STORE_KEY } from '../store';
import { classNames } from '../helpers';
import NavigationButtons from '../components/navigation-buttons';
import { useNavigateSteps } from '../router';
import withBuildSiteController from '../hoc/withBuildSiteController';
import Container from '../components/container';
import Heading from '../components/heading';

const fetchStatus = {
	fetching: 'fetching',
	fetched: 'fetched',
	error: 'error',
};

const ICON_SET = {
	heart: HeartIcon,
	'squares-plus': SquaresPlusIcon,
	funnel: FunnelIcon,
	'play-circle': PlayCircleIcon,
	'live-chat': ChatBubbleLeftEllipsisIcon,
	'page-builder': PaintBrushIcon,
	'contact-form': QueueListIcon,
	blog: Squares2X2Icon,
	ecommerce: ShoppingCartIcon,
};

const Features = ( { handleClickStartBuilding, isInProgress } ) => {
	const { previousStep } = useNavigateSteps();

	const { setSiteFeatures, storeSiteFeatures } = useDispatch( STORE_KEY );
	const { siteFeatures, loadingNextStep } = useSelect( ( select ) => {
		const { getSiteFeatures, getLoadingNextStep } = select( STORE_KEY );

		return {
			siteFeatures: getSiteFeatures(),
			loadingNextStep: getLoadingNextStep(),
		};
	}, [] );
	const [ isFetchingStatus, setIsFetchingStatus ] = useState(
		fetchStatus.fetching
	);

	const fetchSiteFeatures = async () => {
		const response = await apiFetch( {
			path: 'zipwp/v1/site-features',
			method: 'GET',
			headers: {
				'X-WP-Nonce': aiBuilderVars.rest_api_nonce,
			},
		} );

		if ( response?.success ) {
			// Store to state.
			storeSiteFeatures( response.data.data );

			// Set status to fetched.
			return setIsFetchingStatus( fetchStatus.fetched );
		}

		setIsFetchingStatus( fetchStatus.error );
	};

	const handleToggleFeature = ( feature ) => () => {
		if ( feature.compulsory && feature.enabled ) {
			return;
		}
		setSiteFeatures( feature.id );
	};

	useEffect( () => {
		if ( isFetchingStatus === fetchStatus.fetching ) {
			fetchSiteFeatures();
		}
	}, [] );

	return (
		<Container className="grid grid-cols-1 gap-8 auto-rows-auto !max-w-[55rem] w-full mx-auto">
			<div className="space-y-4">
				<Heading
					heading={ __( 'Select features', 'ai-builder' ) }
					subHeading={ __(
						'Select the features you want on this website',
						'ai-builder'
					) }
				/>
			</div>

			{ /* Feature Cards */ }
			<div className="grid grid-cols-1 lg:grid-cols-2 auto-rows-auto gap-x-8 gap-y-5 w-full">
				{ isFetchingStatus === fetchStatus.fetched &&
					siteFeatures.map( ( feature ) => {
						const FeatureIcon = ICON_SET?.[ feature.icon ];
						return (
							<div
								key={ feature.id }
								className={ classNames(
									'relative py-4 pl-4 pr-5 rounded-md shadow-sm border border-solid bg-white border-button-disabled transition-colors duration-150 ease-in-out',
									feature.enabled && 'border-accent-st'
								) }
								data-disabled={ loadingNextStep }
							>
								<div className="flex items-start justify-start gap-3">
									<div className="p-0.5 shrink-0">
										{ FeatureIcon && (
											<FeatureIcon className="text-zip-body-text w-7 h-7" />
										) }
										{ ! FeatureIcon && (
											<WrenchIcon className="text-zip-body-text w-7 h-7" />
										) }
									</div>
									<div className="space-y-1 mr-5">
										<p className="p-0 m-0 !text-base !font-semibold !text-zip-app-heading">
											{ feature.title }
										</p>
										<p className="p-0 m-0 !text-sm !font-normal !text-zip-body-text">
											{ feature.description }
										</p>
									</div>
								</div>
								{ /* Check mark */ }
								<span
									className={ classNames(
										'inline-flex absolute top-4 right-4 p-[0.1875rem] border border-solid border-zip-app-inactive-icon rounded',
										feature.enabled &&
											'border-accent-st bg-accent-st',
										feature.compulsory &&
											'border-button-disabled bg-button-disabled'
									) }
								>
									<CheckIcon
										className="w-2.5 h-2.5 text-white"
										strokeWidth={ 4 }
									/>
								</span>
								{ /* Click handler overlay */ }
								<div
									className="absolute inset-0 cursor-pointer"
									onClick={ handleToggleFeature( feature ) }
								/>
							</div>
						);
					} ) }
				{ /* Skeleton */ }
				{ isFetchingStatus === fetchStatus.fetching &&
					Array.from( {
						length: Object.keys( ICON_SET ).length,
					} ).map( ( _, index ) => (
						<div
							key={ index }
							className="relative py-4 pl-4 pr-5 rounded-md shadow-sm border border-solid bg-white border-button-disabled"
						>
							<div className="flex items-start justify-start gap-3">
								<div className="p-0.5 shrink-0">
									<div className="w-7 h-7 bg-gray-200 rounded animate-pulse" />
								</div>
								<div className="space-y-1 w-full">
									<div className="w-3/4 h-6 bg-gray-200 rounded animate-pulse" />
									<div className="w-1/2 h-5 bg-gray-200 rounded animate-pulse" />
								</div>
							</div>
							<span className="inline-flex absolute top-4 right-4 w-4 h-4 bg-gray-200 animate-pulse rounded" />
							<div className="absolute inset-0 cursor-pointer" />
						</div>
					) ) }
			</div>
			{ /* Error Message */ }
			{ isFetchingStatus === fetchStatus.error && (
				<div className="flex items-center justify-center w-full px-5 py-5">
					<p className="text-secondary-text text-center px-10 py-5 border-2 border-dashed border-border-primary rounded-md">
						{ __(
							'Something went wrong. Please try again later.',
							'ai-builder'
						) }
					</p>
				</div>
			) }

			<hr className="!border-border-tertiary border-b-0 w-full" />

			{ /* Navigation buttons */ }
			<NavigationButtons
				continueButtonText={ __( 'Start Building', 'ai-builder' ) }
				onClickPrevious={ previousStep }
				onClickContinue={ handleClickStartBuilding() }
				onClickSkip={ handleClickStartBuilding( true ) }
				loading={ isInProgress }
				skipButtonText={ __( 'Skip & Start Building', 'ai-builder' ) }
			/>
		</Container>
	);
};

export default withBuildSiteController( Features );
