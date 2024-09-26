<?php

/**
 * Nps_Survey_Script
 */

class Nps_Survey_Script {

	/**
	 * Instance
	 *
	 * @access private
	 * @var object Class Instance.
	 * @since 1.0.0
	 */
	private static $instance = null;

	/**
	 * Initiator
	 *
	 * @since 1.0.0
	 * @return object initialized object of class.
	 */
	public static function get_instance() {
		if ( null === self::$instance ) {
			self::$instance = new self();
		}
		return self::$instance;
	}

	/**
	 * Constructor.
	 *
	 * @since 1.0.0
	 */
	public function __construct() {
		add_action( 'admin_footer', array( $this, 'add_nps_survey_id' ) );
		add_action( 'admin_enqueue_scripts', array( $this, 'editor_load_scripts' ) );
		add_action( 'rest_api_init', array( $this, 'register_route' ) );
	}

	/**
	 * Add root id.
	 *
	 * @since 4.3.7
	 *
	 * @return void
	 */
	public function add_nps_survey_id() {
		?>
			<div id="nps-survey-root"></div>
		<?php
	}

	/**
	 * Load script.
	 *
	 * @since 1.0.0
	 * @return void
	 */
	public function editor_load_scripts() {

		if ( ! is_admin() || false === $this->is_show_nps_survey_form() ) {
			return;
		}

        $screen          = get_current_screen();
		$screen_id       = $screen ? $screen->id : '';
		$allowed_screens = array(
			'dashboard',
		);

		if ( ! in_array( $screen_id, $allowed_screens, true ) ) {
			return;
		}

		$handle            = 'nps-survey-script';
		$build_path        = ASTRA_SITES_DIR . 'inc/lib/nps-survey/dist/';
		$build_url         = ASTRA_SITES_URI . 'inc/lib/nps-survey/dist/';
		$script_asset_path = $build_path . 'main.asset.php';
		$script_info       = file_exists( $script_asset_path )
			? include $script_asset_path
			: array(
				'dependencies' => array(),
				'version'      => ASTRA_SITES_VER,
			);

		$script_dep = array_merge( $script_info['dependencies'], array( 'jquery' ) );

		wp_enqueue_script(
			$handle,
			$build_url . 'main.js',
			$script_dep,
			$script_info['version'],
			true
		);

		$data = apply_filters(
			'nps_survey_vars',
			array(
				'ajaxurl'             => esc_url( admin_url( 'admin-ajax.php' ) ),
				'_ajax_nonce'         => wp_create_nonce( 'nps-survey' ),
				'nps_status'		  => $this->get_nps_survey_dismiss_status(),
				'is_show_nps'         => $this->is_show_nps_survey_form(),
				'imageDir' 			  => INTELLIGENT_TEMPLATES_URI . 'assets/images/',
			)
		);

		// Add localize JS.
		wp_localize_script(
			'nps-survey-script',
			'npsSurvey',
			$data
		);

		wp_enqueue_style( 'nps-survey-style', $build_url . '/style-main.css', array(), ASTRA_SITES_VER );
		wp_style_add_data( 'nps-survey-style', 'rtl', 'replace' );

	}

	/**
	 * Load all the required files in the importer.
	 *
	 * @since  1.0.0
	 * @return void
	 */
	public function register_route() {

		register_rest_route(
			$this->get_api_namespace(),
			'/rating/',
			array(
				array(
					'methods'             => \WP_REST_Server::CREATABLE,
					'callback'            => array( $this, 'submit_rating' ),
					'permission_callback' => array( $this, 'get_item_permissions_check' ),
					'args'                => array(
					),
				),
			)
		);

		register_rest_route(
			$this->get_api_namespace(),
			'/dismiss-nps-survey/',
			array(
				array(
					'methods'             => \WP_REST_Server::CREATABLE,
					'callback'            => array( $this, 'dismiss_nps_survey_panel' ),
					'permission_callback' => array( $this, 'get_item_permissions_check' ),
					'args'                => array(
					),
				),
			)
		);
	}

	/**
	 * Get the API URL.
	 *
	 * @since  1.0.0
	 * 
	 * @return string
	 */
	public static function get_api_domain() {
		return trailingslashit( defined( 'NPS_SURVEY_REMOTE_URL' ) ? NPS_SURVEY_REMOTE_URL : apply_filters( 'nps_survey_api_domain', 'https://websitedemos.net/' ) );
	}

	/**
	 * Get api namespace
	 *
	 * @since 1.0.0
	 * @return string
	 */
	public function get_api_namespace() {
		return 'nps-survey/v1';
	}

	/**
	 * Get API headers
	 *
	 * @since 1.0.0
	 * @return array<string, string>
	 */
	public function get_api_headers() {
		return array(
			'Content-Type' => 'application/json',
			'Accept'       => 'application/json',
		);
	}

	/**
	 * Check whether a given request has permission to read notes.
	 *
	 * @param  object $request WP_REST_Request Full details about the request.
	 * @return object|boolean
	 */
	public function get_item_permissions_check( $request ) {

		if ( ! current_user_can( 'manage_options' ) ) {
			return new \WP_Error(
				'gt_rest_cannot_access',
				__( 'Sorry, you are not allowed to do that.', 'astra-sites' ),
				array( 'status' => rest_authorization_required_code() )
			);
		}
		return true;
	}

	/**
	 * Submit Ratings.
	 *
	 * @param \WP_REST_Request $request Request object.
	 * @return void
	 */
	public function submit_rating( $request ) {

		$nonce = $request->get_header( 'X-WP-Nonce' );

		// Verify the nonce.
		if ( ! wp_verify_nonce( sanitize_text_field( (string) $nonce ), 'wp_rest' ) ) {
			wp_send_json_error(
				array(
					'data'   => __( 'Nonce verification failed.', 'astra-sites' ),
					'status' => false,

				)
			);
		}

		$api_endpoint = $this->get_api_domain() . 'wp-json/starter-templates/v1/nps-survey/';
		$current_user = wp_get_current_user();

		$post_data = array(
			'rating'        => ! empty( $request['rating'] ) ? sanitize_text_field( $request['rating'] ) : '',
			'comment'       => ! empty( $request['comment'] ) ? sanitize_text_field( $request['comment'] ) : '',
			'email'    => $current_user->user_email,
			'first_name'    => $current_user->first_name ?? $current_user->display_name,
			'last_name'    => $current_user->last_name ?? '',
			'source' => 'starter-templates',
		);

		$request_args = array(
			'body'    => wp_json_encode( $post_data ),
			'headers' => $this->get_api_headers(),
			'timeout' => 60,
		);

		$response     = wp_safe_remote_post( $api_endpoint, $request_args ); // @phpstan-ignore-line

		if ( is_wp_error( $response ) ) {
			// There was an error in the request.
			wp_send_json_error(
				array(
					'data'   => 'Failed ' . $response->get_error_message(),
					'status' => false,

				)
			);
		}

		$response_code = wp_remote_retrieve_response_code( $response );

		if ( 200 === $response_code ) {

			$nps_form_status = array(
				'dismiss_count' => 0,
				'dismiss_permanently' => true,
				'dismiss_step' => ''
			);

			update_option( 'nps-survay-form-dismiss-status', $nps_form_status );

			wp_send_json_success(
				array(
					'status' => true,
				)
			);

		} else {
			wp_send_json_error(
				array(
					'status' => false,

				)
			);
		}
	}

	/**
	 * Dismiss NPS Survey.
	 *
	 * @param \WP_REST_Request $request Request object.
	 * @return void
	 */
	public function dismiss_nps_survey_panel( $request ) {

		$nonce = $request->get_header( 'X-WP-Nonce' );

		// Verify the nonce.
		if ( ! wp_verify_nonce( sanitize_text_field( (string) $nonce ), 'wp_rest' ) ) {
			wp_send_json_error(
				array(
					'data'   => __( 'Nonce verification failed.', 'astra-sites' ),
					'status' => false,

				)
			);
		}

		set_transient( 'nps-survay-form-dismissed', 'yes', 2 * WEEK_IN_SECONDS );

		$nps_form_status = $this->get_nps_survey_dismiss_status();

		//Update dismiss count.
		$nps_form_status['dismiss_count'] = $nps_form_status['dismiss_count'] + 1;
		$nps_form_status['dismiss_step'] = $request['current_step'];

		//Dismiss Permanantly.
		if( $nps_form_status['dismiss_count'] >= 3 ){
			$nps_form_status['dismiss_permanently'] = true;
		}

		update_option( 'nps-survay-form-dismiss-status', $nps_form_status );

		wp_send_json_success(
			array(
				'status' => true,
			)
		);
	}

	/**
	 * Get dismiss status of NPS Survey.
	 * 
	 * @return array<string, mixed>
	 * 
	 */
	public function get_nps_survey_dismiss_status(){

		$default_status = get_option(
			'nps-survay-form-dismiss-status',
			array(
				'dismiss_count' => 0,
				'dismiss_permanently' => false,
				'dismiss_step' => ''
			)
		);

		$status = array(
			'dismiss_count' => ! empty( $default_status['dismiss_count'] ) ? $default_status['dismiss_count'] : 0,
			'dismiss_permanently' =>  ! empty( $default_status['dismiss_permanently'] ) ? $default_status['dismiss_permanently'] : false,
			'dismiss_step' => ! empty( $default_status['dismiss_step'] )  ? $default_status['dismiss_step'] : ''
		);

		return $status;
	}

	/**
	 * Sho status of NPS Survey.
	 * 
	 * @return bool
	 * 
	 */
	public function is_show_nps_survey_form(){

		if( false !== Astra_Sites_White_Label::get_instance()->is_white_labeled() ){
			return false;
		}

		if( false === get_option( 'astra_sites_import_complete', false ) ){
			return false;
		}

		$status = $this->get_nps_survey_dismiss_status();

		if( $status['dismiss_permanently'] ){
			return false;
		}

		if( false !== get_transient( 'nps-survay-form-dismissed' ) ){
			return false;
		}

		return true;
	}
}

/**
 * Kicking this off by calling 'get_instance()' method
 */
Nps_Survey_Script::get_instance();

