import React from 'react';
import Tooltip from '../../components/tooltip/tooltip';
import { __ } from '@wordpress/i18n';
// import { decodeEntities } from '@wordpress/html-entities';
import { useStateValue } from '../../store/store';
import ICONS from '../../../icons';
import { whiteLabelEnabled } from '../../utils/functions';
const { themeStatus, firstImportStatus, analytics } = starterTemplates;
import ToggleSwitch from '../../components/toggle-switch';
import { SirenColorfulIcon } from '../ui/icons';
const AdvancedSettings = () => {
	const [ { reset, themeActivateFlag, analyticsFlag }, dispatch ] =
		useStateValue();

	const updateAnalyticsFlag = () => {
		dispatch( {
			type: 'set',
			analyticsFlag: ! analyticsFlag,
		} );
	};
	const updateThemeFlag = () => {
		dispatch( {
			type: 'set',
			themeActivateFlag: ! themeActivateFlag,
			customizerImportFlag: ! themeActivateFlag,
		} );
	};

	const updateResetValue = () => {
		dispatch( {
			type: 'set',
			reset: ! reset,
		} );
	};

	return (
		<div className="survey-form-advanced-wrapper show-section">
			<p className="label-text row-label !mb-2" role="presentation">
				{ __( 'Advanced Options', 'astra-sites' ) }
			</p>
			<div className="survey-advanced-section">
				<div className="border border-solid border-border-primary rounded-md grid grid-cols-1 !divide-y !divide-border-primary divide-solid divide-x-0">
					{ 'installed-and-active' !== themeStatus && (
						<div className="flex items-center py-3 px-4 grid grid-cols-[1fr_min-content] !gap-2">
							<div className="flex-1 flex items-center space-x-2">
								<h6 className="text-sm !leading-6 text-zip-app-heading">
									{ ' ' }
									{ __(
										'Install & Activate Astra Theme',
										'astra-sites'
									) }
								</h6>
								<Tooltip
									content={ __(
										'To import the site in the original format, you would need the Astra theme activated. You can import it with any other theme, but the site might lose some of the design settings and look a bit different.',
										'astra-sites'
									) }
								>
									{ ICONS.questionMarkNoFill }
								</Tooltip>
							</div>
							<div>
								<ToggleSwitch
									onChange={ updateThemeFlag }
									value={ themeActivateFlag }
									requiredClass={
										themeActivateFlag
											? 'bg-accent-st-secondary'
											: 'bg-border-tertiary'
									}
								/>
							</div>
						</div>
					) }
					{ ! whiteLabelEnabled() && analytics !== 'yes' && (
						<div className="flex items-center py-3 px-4 grid grid-cols-[1fr_min-content] gap-4">
							<div className="flex-1 flex items-center space-x-2">
								<h6 className="text-sm !leading-6 text-zip-app-heading">
									{ ' ' }
									{ __(
										'Share Non-Sensitive Data',
										'astra-sites'
									) }
								</h6>
								<Tooltip
									interactive={ true }
									content={
										<div>
											{ __(
												'Help our developers build better templates and products for you by sharing anonymous and non-sensitive data about your website.',
												'astra-sites'
											) }{ ' ' }
											<a
												href="https://store.brainstormforce.com/usage-tracking/?utm_source=wp_dashboard&utm_medium=general_settings&utm_campaign=usage_tracking"
												target="_blank"
												rel="noreferrer noopener"
											>
												{ __(
													'Learn More',
													'astra-sites'
												) }
											</a>
										</div>
									}
								>
									{ ICONS.questionMarkNoFill }
								</Tooltip>
							</div>
							<div>
								<ToggleSwitch
									onChange={ updateAnalyticsFlag }
									value={ analyticsFlag }
									requiredClass={
										analyticsFlag
											? 'bg-accent-st-secondary'
											: 'bg-border-tertiary'
									}
								/>
							</div>
						</div>
					) }

					{ 'yes' === firstImportStatus && (
						<div className="flex items-center py-3 px-4 grid grid-cols-[1fr_min-content] gap-4">
							<div className="flex-1 space-y-1">
								<div className="flex items-center mr-2">
									<SirenColorfulIcon className="w-6 h-6 text-alert-success" />
									<h6 className="text-sm !leading-6 text-zip-app-heading !ml-2">
										{ __(
											'Maintain previous/old data?',
											'astra-sites'
										) }
									</h6>
								</div>
								<p className="text-sm leading-5 font-normal !text-nps-placeholder-text">
									{ __(
										'It looks like you already have a website made with Starter Templates. Enable this to maintain your old data, including content and images.',
										'astra-sites'
									) }
								</p>
							</div>

							<div className="flex items-center justify-center gap-2">
								<ToggleSwitch
									onChange={ updateResetValue }
									value={ ! reset }
									requiredClass={
										reset
											? 'bg-accent-st-secondary'
											: 'bg-border-tertiary'
									}
								/>
							</div>
						</div>
					) }
				</div>
			</div>
		</div>
	);
};

export default AdvancedSettings;
