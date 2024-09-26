<?php
namespace LivemeshAddons\Controls;

use Elementor\Base_Data_Control;

/* Credit - Image Chooser control by ElementsKit - https://wpmet.com/plugin/elementskit/ */

defined( 'ABSPATH' ) || exit;

class LAE_Style_Select extends Base_Data_Control {

    /**
     * Get the control type.
     *
     */
    public function get_type() {
        return 'lae-style-select';
    }

    /**
     * Get default settings for style select control
     *
     */
    protected function get_default_settings() {
        return array(
            'label_block' => true,
            'options'     => array(),
        );
    }

    /**
     * Render the style select control output in the editor.
     *
     * Used to generate the control HTML in the editor using Underscore JS
     * template. The variables for the class are available using `data` JS
     * object.
     *
     */
    public function content_template() {
        $control_uid_input_type = '{{value}}';
        ?>
        <div class="elementor-control-field">
            <label class="elementor-control-title">{{{ data.label }}}</label>
            <div class="elementor-control-input-wrapper">
                <div class="lae-style-choices">
                    <# _.each( data.options, function( options, value ) { #>
                    <div class="lae-style-select-label-block" style="width:{{ options.width }}">
                        <input id="<?php $this->print_control_uid( $control_uid_input_type ); ?>"  type="radio" name="elementor-choose-{{ data.name }}-{{ data._cid }}" value="{{ value }}">
                        <label class="lae-style-choices-label" for="<?php $this->print_control_uid( $control_uid_input_type ); ?>" title="{{ options.title }}">
                            <img class="imagesmall" src="{{ options.imagesmall }}" alt="{{ options.title }}" {{ options.imagesmallheight ? `style=height:` + options.imagesmallheight : `` }} />
                            <span class="imagelarge">
									<img src="{{ options.imagelarge }}" alt="{{ options.title }}" />
								</span>
                            <span class="elementor-screen-only">{{{ options.title }}}</span>
                        </label>
                    </div>
                    <# } ); #>
                </div>
            </div>
        </div>

        <# if ( data.description ) { #>
        <div class="elementor-control-field-description">{{{ data.description }}}</div>
        <# } #>
        <?php
    }

    /**
     * Enqueue control scripts and styles.
     *
     */
    public function enqueue() {
        // styles
        wp_register_style( 'lae-style-select-control-styles', LAE_PLUGIN_URL. 'assets/css/controls/style-select.css', array(), '1.0.0' );
        wp_enqueue_style( 'lae-style-select-control-styles' );

        // script
        wp_register_script( 'lae-style-select-control-scripts', LAE_PLUGIN_URL . 'assets/js/controls/style-select.js' );
        wp_enqueue_script( 'lae-style-select-control-scripts' );
    }
}
