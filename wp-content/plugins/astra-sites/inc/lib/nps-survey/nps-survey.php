<?php

/**
 * Nps_Survey
 *
 * @since 1.0.0
 */

class Nps_Survey {

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
	 * Constructor
	 *
	 * @since 1.0.0
	 */
	public function __construct() {
		add_action( 'wp_loaded', [ $this, 'load_files' ] );
	}

	/**
	 * Load Files
	 *
	 * @since 1.0.0
	 *
	 * @return void
	 */
	public function load_files() {
		require_once ASTRA_SITES_DIR . 'inc/lib/nps-survey/classes/nps-survey-script.php';
	}
}

/**
 * Kicking this off by calling 'get_instance()' method
 */
Nps_Survey::get_instance();
