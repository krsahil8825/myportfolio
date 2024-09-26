import { STEPS } from '../steps/util';
import { getURLParmsValue } from '../utils/url-params';
import { __ } from '@wordpress/i18n';

let currentIndexKey = 0;
let builderKey = 'gutenberg';

if ( astraSitesVars.default_page_builder ) {
	currentIndexKey = 0;
	builderKey =
		astraSitesVars.default_page_builder === 'brizy'
			? 'gutenberg'
			: astraSitesVars.default_page_builder;
}

export const siteLogoDefault = {
	id: '',
	thumbnail: '',
	url: '',
	width: 120,
};

export const initialState = {
	siteFeatures: [
		{
			title: __( 'Donations', 'astra-sites' ),
			id: 'donations',
			description: __(
				'Collect donations online from your website',
				'astra-sites'
			),
			enabled: false,
			icon: 'heart',
		},
		{
			title: __( 'Automation & Integrations', 'astra-sites' ),
			id: 'automation-integrations',
			description: __( 'Automate your website & tasks', 'astra-sites' ),
			enabled: false,
			icon: 'squares-plus',
		},
		{
			title: __( 'Sales Funnels', 'astra-sites' ),
			id: 'sales-funnels',
			description: __(
				'Boost your sales & maximize your profits',
				'astra-sites'
			),
			enabled: false,
			icon: 'funnel',
		},
		{
			title: __( 'Video Player', 'astra-sites' ),
			id: 'video-player',
			description: __(
				'Showcase your videos on your website',
				'astra-sites'
			),
			enabled: false,
			icon: 'play-circle',
		},
		{
			title: __( 'Free Live Chat', 'astra-sites' ),
			id: 'live-chat',
			description: __(
				'Connect with your website visitors for free',
				'astra-sites'
			),
			enabled: false,
			icon: 'live-chat',
		},
	],
	formDetails: {
		first_name: '',
		email: '',
		wp_user_type: '',
		build_website_for: '',
		opt_in: true,
	},
	allSitesData: astraSitesVars.all_sites || {},
	allCategories: astraSitesVars.allCategories || [],
	allCategoriesAndTags: astraSitesVars.allCategoriesAndTags || [],
	aiActivePallette: null,
	aiActiveTypography: null,
	aiSiteLogo: siteLogoDefault,
	currentIndex: 'ai-builder' === builderKey ? 0 : currentIndexKey,
	currentCustomizeIndex: 0,
	siteLogo: siteLogoDefault,
	activePaletteSlug: 'default',
	activePalette: {},
	typography: {},
	typographyIndex: 0,
	stepsLength: Object.keys( STEPS ).length,

	builder: builderKey,
	siteType: '',
	siteOrder: 'popular',
	siteBusinessType: '',
	selectedMegaMenu: '',
	siteSearchTerm: getURLParmsValue( window.location.search, 's' ) || '',
	userSubscribed: false,
	showSidebar: window && window?.innerWidth < 1024 ? false : true,
	tryAgainCount: 0,
	pluginInstallationAttempts: 0,
	confettiDone: false,

	// Template Information.
	templateId: 0,
	templateResponse: null,
	requiredPlugins: null,
	fileSystemPermissions: null,
	selectedTemplateID: '',
	selectedTemplateName: '',
	selectedTemplateType: '',

	// Import statuses.
	reset: 'yes' === starterTemplates.firstImportStatus ? true : false,
	themeStatus: false,
	importStatusLog: '',
	importStatus: '',
	xmlImportDone: false,
	requiredPluginsDone: false,
	notInstalledList: [],
	notActivatedList: [],
	resetData: [],
	importStart: false,
	importEnd: false,
	importPercent: 0,
	importError: false,
	importErrorMessages: {
		primaryText: '',
		secondaryText: '',
		errorCode: '',
		errorText: '',
		solutionText: '',
		tryAgain: false,
	},
	importErrorResponse: [],
	importTimeTaken: {},

	customizerImportFlag:
		astraSitesVars.default_page_builder === 'fse' ? false : true,
	themeActivateFlag:
		astraSitesVars.default_page_builder === 'fse' ? false : true,
	widgetImportFlag: true,
	contentImportFlag: true,
	analyticsFlag: starterTemplates.analytics !== 'yes' ? true : false,
	shownRequirementOnce: false,

	// Filter Favorites.
	onMyFavorite: false,

	// All Sites and Favorites
	favoriteSiteIDs: Object.values( astraSitesVars.favorite_data ) || [],

	// License.
	licenseStatus: astraSitesVars.license_status,
	validateLicenseStatus: false,

	// Staging connected.
	stagingConnected:
		astraSitesVars.staging_connected !== 'yes'
			? ''
			: '&draft=' + astraSitesVars.staging_connected,

	// Search.
	searchTerms: [],
	searchTermsWithCount: [],
	enabledFeatureIds: [],
	dismissAINotice: astraSitesVars.dismiss_ai_notice,

	// Sync Library.
	bgSyncInProgress: !! astraSitesVars.bgSyncInProgress,

	// Limit exceed modal for AI-Builder.
	limitExceedModal: {
		open: false,
	},
};

const reducer = ( state = initialState, { type, ...rest } ) => {
	switch ( type ) {
		case 'set':
			return { ...state, ...rest };
		default:
			return state;
	}
};

export default reducer;
