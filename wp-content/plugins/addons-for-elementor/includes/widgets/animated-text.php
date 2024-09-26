<?php

/*
Widget Name: Animated Text
Description: Display headings with animated text
Author: LiveMesh
Author URI: https://www.livemeshthemes.com
*/
namespace LivemeshAddons\Widgets;

use Elementor\Repeater;
use Elementor\Widget_Base;
use Elementor\Controls_Manager;
use Elementor\Scheme_Color;
use Elementor\Group_Control_Typography;
use Elementor\Scheme_Typography;
if ( !defined( 'ABSPATH' ) ) {
    exit;
}
// Exit if accessed directly
/**
 * Class for Animated Text widget that displays headings with animated text
 */
class LAE_Animated_Text_Widget extends LAE_Widget_Base {
    /**
     * Get the name for the widget
     * @return string
     */
    public function get_name() {
        return 'lae-animated-text';
    }

    /**
     * Get the widget title
     * @return string|void
     */
    public function get_title() {
        return __( 'Animated Text', 'livemesh-el-addons' );
    }

    /**
     * Get the widget icon
     * @return string
     */
    public function get_icon() {
        return 'lae-icon-spell-check';
    }

    /**
     * Retrieve the list of categories the widget belongs to.
     *
     * Used to determine where to display the widget in the editor.
     *
     * @return string[]
     */
    public function get_categories() {
        return array('livemesh-addons');
    }

    /**
     * Get the widget documentation URL
     * @return string
     */
    public function get_custom_help_url() {
        return 'https://livemeshelementor.com/docs/livemesh-addons/animated-text/';
    }

    /**
     * Obtain the scripts required for the widget to function
     * @return string[]
     */
    public function get_script_depends() {
        return ['anime', 'lae-frontend-scripts', 'lae-animated-text-scripts'];
    }

    /**
     * Register the controls for the widget
     * Adds fields that help configure and customize the widget
     * @return void
     */
    protected function register_controls() {
        $this->start_controls_section( 'section_animated_text', [
            'label' => __( 'Animated Text', 'livemesh-el-addons' ),
        ] );
        $this->add_control( 'animated_text_class', [
            'type'        => Controls_Manager::TEXT,
            'label'       => __( 'Container Class', 'livemesh-el-addons' ),
            'description' => __( 'The CSS class for the animated text container DIV element.', 'livemesh-el-addons' ),
            'ai'          => [
                'active' => false,
            ],
        ] );
        $this->add_control( 'before_text', [
            'type'        => Controls_Manager::TEXT,
            'label'       => __( 'Before Text', 'livemesh-el-addons' ),
            'label_block' => true,
            'separator'   => 'after',
            'default'     => __( 'Before Text', 'livemesh-el-addons' ),
            'dynamic'     => [
                'active' => true,
            ],
        ] );
        $repeater = new Repeater();
        $repeater->add_control( 'animated_text_item', [
            'label'       => __( 'Animated Text Item', 'livemesh-el-addons' ),
            'default'     => __( 'My Animated Text', 'livemesh-el-addons' ),
            'type'        => Controls_Manager::TEXT,
            'label_block' => true,
            'dynamic'     => [
                'active' => true,
            ],
        ] );
        $this->add_control( 'animated_text_items', [
            'type'        => Controls_Manager::REPEATER,
            'default'     => [[
                'animated_text_item' => 'Creatively Express',
            ], [
                'animated_text_item' => 'Stay Productive',
            ], [
                'animated_text_item' => 'Endless Customization',
            ]],
            'fields'      => $repeater->get_controls(),
            'title_field' => '{{{ animated_text_item }}}',
        ] );
        $this->add_control( 'animated_text_link', [
            'label'       => __( 'Animated Text URL', 'livemesh-el-addons' ),
            'description' => __( 'The link for the page linked from the animated text.', 'livemesh-el-addons' ),
            'type'        => Controls_Manager::URL,
            'label_block' => true,
            'default'     => [
                'url'         => '',
                'is_external' => 'true',
            ],
            'placeholder' => __( 'https://www.mysite.com', 'livemesh-el-addons' ),
            'dynamic'     => [
                'active' => true,
            ],
        ] );
        $this->add_control( 'after_text', [
            'type'        => Controls_Manager::TEXT,
            'label'       => __( 'After Text', 'livemesh-el-addons' ),
            'label_block' => true,
            'separator'   => 'before',
            'default'     => __( 'After Text', 'livemesh-el-addons' ),
            'dynamic'     => [
                'active' => true,
            ],
        ] );
        $this->end_controls_section();
        $this->start_controls_section( 'section_widget_settings', [
            'label'      => __( 'Settings', 'livemesh-el-addons' ),
            'tab'        => Controls_Manager::TAB_SETTINGS,
            'show_label' => false,
        ] );
        $this->add_control( "text_animation", [
            "type"    => Controls_Manager::SELECT,
            'label'   => __( 'Text Animation', 'livemesh-el-addons' ),
            'options' => $this->get_animation_options(),
            'default' => 'fx1',
        ] );
        $this->add_control( 'animation_delay', [
            'label'   => __( 'Animation delay (ms)', 'livemesh-el-addons' ),
            'type'    => Controls_Manager::NUMBER,
            'default' => 2800,
            'min'     => 500,
            'step'    => 100,
        ] );
        $this->add_control( 'split_type', [
            'label'   => __( 'Split Text', 'livemesh-el-addons' ),
            'type'    => Controls_Manager::SELECT,
            'options' => array(
                'character' => __( 'Characters', 'livemesh-el-addons' ),
                'word'      => __( 'Words', 'livemesh-el-addons' ),
            ),
            'default' => 'character',
        ] );
        $this->add_control( 'text_alignment', [
            'label'   => __( 'Text Alignment', 'livemesh-el-addons' ),
            'type'    => Controls_Manager::CHOOSE,
            'options' => [
                'left'   => [
                    'title' => __( 'Left', 'livemesh-el-addons' ),
                    'icon'  => 'eicon-text-align-left',
                ],
                'center' => [
                    'title' => __( 'Center', 'livemesh-el-addons' ),
                    'icon'  => 'eicon-text-align-center',
                ],
                'right'  => [
                    'title' => __( 'Right', 'livemesh-el-addons' ),
                    'icon'  => 'eicon-text-align-right',
                ],
            ],
            'default' => 'center',
        ] );
        $this->end_controls_section();
        $this->start_controls_section( 'section_animated_text_before_text', [
            'label' => __( 'Before Text', 'livemesh-el-addons' ),
            'tab'   => Controls_Manager::TAB_STYLE,
        ] );
        $this->add_control( 'before_text_color', [
            'label'     => __( 'Color', 'livemesh-el-addons' ),
            'type'      => Controls_Manager::COLOR,
            'selectors' => [
                '{{WRAPPER}} .lae-animated-text .lae-animated-text-before-text' => 'color: {{VALUE}};',
            ],
        ] );
        $this->add_group_control( Group_Control_Typography::get_type(), [
            'name'     => 'before_text_typography',
            'selector' => '{{WRAPPER}} .lae-animated-text .lae-animated-text-before-text',
        ] );
        $this->end_controls_section();
        $this->start_controls_section( 'section_animated_text_items', [
            'label' => __( 'Animated Text', 'livemesh-el-addons' ),
            'tab'   => Controls_Manager::TAB_STYLE,
        ] );
        $this->add_control( 'animated_text_color', [
            'label'     => __( 'Color', 'livemesh-el-addons' ),
            'type'      => Controls_Manager::COLOR,
            'selectors' => [
                '{{WRAPPER}} .lae-animated-text .lae-animated-text-items' => 'color: {{VALUE}};',
            ],
        ] );
        $this->add_group_control( Group_Control_Typography::get_type(), [
            'name'     => 'animated_text_typography',
            'selector' => '{{WRAPPER}} .lae-animated-text .lae-animated-text-items',
        ] );
        $this->end_controls_section();
        $this->start_controls_section( 'section_animated_text_after_text', [
            'label' => __( 'After Text', 'livemesh-el-addons' ),
            'tab'   => Controls_Manager::TAB_STYLE,
        ] );
        $this->add_control( 'after_text_color', [
            'label'     => __( 'Color', 'livemesh-el-addons' ),
            'type'      => Controls_Manager::COLOR,
            'selectors' => [
                '{{WRAPPER}} .lae-animated-text .lae-animated-text-after-text' => 'color: {{VALUE}};',
            ],
        ] );
        $this->add_group_control( Group_Control_Typography::get_type(), [
            'name'     => 'after_text_typography',
            'selector' => '{{WRAPPER}} .lae-animated-text .lae-animated-text-after-text',
        ] );
        $this->end_controls_section();
    }

    public function split_string_to_spans( $base_string, $split_type ) {
        $base_words = explode( ' ', $base_string );
        if ( $split_type === 'character' ) {
            $glue = '';
            $symbols = str_split( $base_string, 1 );
        } else {
            $glue = '&nbsp;';
            $symbols = $base_words;
        }
        foreach ( $symbols as $symbol ) {
            if ( $symbol === ' ' ) {
                $symbol = '&nbsp;';
                // maintain the separation of words
            }
            $spans[] = sprintf( '<span>%s</span>', $symbol );
        }
        return implode( $glue, $spans );
    }

    /**
     * The animation options available for animating text elements.
     * @return array The key value pairs of available animations for display in the widget settings UI
     */
    function get_animation_options() {
        return apply_filters( 'lae_text_animation_options', array(
            'fx1' => __( 'Effect 1', 'livemesh-el-addons' ),
            'fx2' => __( 'Effect 2', 'livemesh-el-addons' ),
            'fx3' => __( 'Effect 3', 'livemesh-el-addons' ),
            'fx4' => __( 'Effect 4', 'livemesh-el-addons' ),
            'fx5' => __( 'Effect 5', 'livemesh-el-addons' ),
            'fx6' => __( 'Effect 6', 'livemesh-el-addons' ),
        ) );
    }

    /**
     * Render HTML widget output on the frontend.
     *
     * Written in PHP and used to generate the final HTML.
     *
     * @return void
     */
    protected function render() {
        $settings = $this->get_settings_for_display();
        $settings = apply_filters( 'lae_animated_text_' . $this->get_id() . '_settings', $settings );
        $args['settings'] = $settings;
        $args['widget_instance'] = $this;
        lae_get_template_part( "addons/animated-text/loop", $args );
    }

    /**
     * Render the widget output in the editor.
     * @return void
     */
    protected function content_template() {
    }

}
