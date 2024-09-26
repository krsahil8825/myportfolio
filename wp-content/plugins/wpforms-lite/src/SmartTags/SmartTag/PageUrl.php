<?php

namespace WPForms\SmartTags\SmartTag;

/**
 * Class PageUrl.
 *
 * @since 1.6.7
 */
class PageUrl extends SmartTag {

	/**
	 * Get smart tag value.
	 *
	 * @since 1.6.7
	 *
	 * @param array  $form_data Form data.
	 * @param array  $fields    List of fields.
	 * @param string $entry_id  Entry ID.
	 *
	 * @return string
	 */
	public function get_value( $form_data, $fields = [], $entry_id = '' ) {

		$page_url = $this->get_meta( $entry_id, 'page_url' );

		if ( ! empty( $page_url ) ) {
			return esc_url( $page_url );
		}

		if ( wpforms_is_editor_page() ) {
			return esc_url( $this->get_page_url_in_editor() );
		}

		// phpcs:ignore WordPress.Security.NonceVerification
		return empty( $_POST['page_url'] ) ? esc_url( wpforms_current_url() ) : esc_url( esc_url_raw( wp_unslash( $_POST['page_url'] ) ) );
	}

	/**
	 * Get the page URL in the editor.
	 *
	 * @since 1.9.0
	 *
	 * @return string Page URL.
	 */
	private function get_page_url_in_editor(): string {

		$post_id = get_the_ID();

		// Handle Divi Builder preview case.
		if ( ! $post_id ) {
			$post_id = filter_input( INPUT_POST, 'divi_post_id', FILTER_VALIDATE_INT );
		}

		if ( ! $post_id ) {
			return home_url();
		}

		return get_permalink( $post_id );
	}
}
