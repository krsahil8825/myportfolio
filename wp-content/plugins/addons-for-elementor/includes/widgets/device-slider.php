<?php

/*
Widget Name: Device Slider
Description: Display a set of images in a mobile, tablet or a laptop slider
Author: LiveMesh
Author URI: https://www.livemeshthemes.com
*/

namespace LivemeshAddons\Widgets;

use Elementor\Utils;
use Elementor\Widget_Base;
use Elementor\Controls_Manager;
use Elementor\Scheme_Color;
use Elementor\Group_Control_Typography;
use Elementor\Scheme_Typography;

if (!defined('ABSPATH'))
    exit; // Exit if accessed directly

/**
 * Class for Device Slider widget that displays blog device or custom post types as a slider.
 */
class LAE_Device_Slider_Widget extends LAE_Widget_Base {

    /**
     * Get the name for the widget
     * @return string
     */
    public function get_name() {
        return 'lae-device-slider';
    }

    /**
     * Get the widget title
     * @return string|void
     */
    public function get_title() {
        return __('Device Slider', 'livemesh-el-addons');
    }

    /**
     * Get the widget icon
     * @return string
     */
    public function get_icon() {
        return 'lae-icon-carousel';
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
        return 'https://livemeshelementor.com/docs/livemesh-addons/core-addons/device-slider/';
    }

    /**
     * Obtain the scripts required for the widget to function
     * @return string[]
     */
    public function get_script_depends() {
        return [
            'lae-jquery-slick',
            'lae-frontend-scripts',
            'lae-device-slider-scripts'
        ];
    }

    /**
     * Register the controls for the widget
     * Adds fields that help configure and customize the widget
     * @return void
     */
    protected function register_controls() {

        $this->start_controls_section(
            'section_device_slider',
            [
                'label' => __('Device Slider', 'livemesh-el-addons'),
            ]
        );

        $this->add_control(
            'device_slider_class', [
                'type' => Controls_Manager::TEXT,
                'label' => __('Container Class', 'livemesh-el-addons'),
                'description' => __('The CSS class for the device slider container DIV element.', 'livemesh-el-addons'),
                'ai' => [
                    'active' => false,
                ],
            ]
        );

        $this->add_control(
            'device_slides',
            [
                'label' => __('Add Images', 'livemesh-el-addons'),
                'type' => Controls_Manager::GALLERY,
            ]
        );

        $this->add_control(
            'device_type',
            [
                'type' => Controls_Manager::SELECT,
                'label' => __('Device Type', 'livemesh-el-addons'),
                'options' => array(
                    'mobile' => __('Mobile', 'livemesh-el-addons'),
                    'tablet' => __('Tablet', 'livemesh-el-addons'),
                    'laptop' => __('Laptop', 'livemesh-el-addons'),
                    'custom' => __('Custom', 'livemesh-el-addons'),
                ),
                'description' => __('Align the slide image with the device frame by adjusting its border radius and position values in the Style tab.', 'livemesh-el-addons'),
                'default' => 'mobile',
            ]
        );

        $this->add_control(
            'custom_device',
            [
                'label' => __('Custom Device', 'livemesh-el-addons'),
                'type' => Controls_Manager::MEDIA,
                'default' => [
                    'url' => Utils::get_placeholder_image_src(),
                ],
                'label_block' => true,
                'dynamic' => [
                    'active' => true,
                ],
                'condition' => [
                    'device_type' => ['custom']
                ],
                'description' => __('You can find a few professional grade mockups <a href="https://www.webmobilefirst.com/en/mockups/" target="_blank">here</a>.', 'livemesh-el-addons'),
            ]
        );

        $this->end_controls_section();

        $this->start_controls_section(
            'section_slider_settings',
            [
                'label' => __('Slider Settings', 'livemesh-el-addons'),
                'tab' => Controls_Manager::TAB_SETTINGS,
            ]
        );

        $this->add_control(
            'slide_animation',
            [
                'type' => Controls_Manager::SELECT,
                'label' => __('Slide Animation', 'livemesh-el-addons'),
                'options' => array(
                    'slide' => __('Slide', 'livemesh-el-addons'),
                    'fade' => __('Fade', 'livemesh-el-addons'),
                ),
                'default' => 'slide',
            ]
        );

        $this->add_control(
            'arrows',
            [
                'type' => Controls_Manager::SWITCHER,
                'label_off' => __('No', 'livemesh-el-addons'),
                'label_on' => __('Yes', 'livemesh-el-addons'),
                'return_value' => 'yes',
                'default' => 'yes',
                'label' => __('Prev/Next Arrows?', 'livemesh-el-addons'),
            ]
        );

        $this->add_control(
            'dots',
            [
                'type' => Controls_Manager::SWITCHER,
                'label_off' => __('No', 'livemesh-el-addons'),
                'label_on' => __('Yes', 'livemesh-el-addons'),
                'return_value' => 'yes',
                'default' => 'no',
                'label' => __('Show dot indicators for navigation?', 'livemesh-el-addons'),
            ]
        );

        $this->add_control(
            'pause_on_hover',
            [
                'type' => Controls_Manager::SWITCHER,
                'label_off' => __('No', 'livemesh-el-addons'),
                'label_on' => __('Yes', 'livemesh-el-addons'),
                'return_value' => 'yes',
                'default' => 'yes',
                'label' => __('Pause on Hover?', 'livemesh-el-addons'),
            ]
        );


        $this->add_control(
            'pause_on_action',
            [
                'type' => Controls_Manager::SWITCHER,
                'label_off' => __('No', 'livemesh-el-addons'),
                'label_on' => __('Yes', 'livemesh-el-addons'),
                'return_value' => 'yes',
                'default' => 'yes',
                "description" => __("Pause the slideshow when interacting with control elements.", "livemesh-el-addons"),
                "label" => __("Pause on action?", "livemesh-el-addons"),
            ]
        );

        $this->add_control(
            'loop',
            [
                'type' => Controls_Manager::SWITCHER,
                'label_off' => __('No', 'livemesh-el-addons'),
                'label_on' => __('Yes', 'livemesh-el-addons'),
                'return_value' => 'yes',
                'default' => 'yes',
                "description" => __("Should the animation loop?", "livemesh-el-addons"),
                "label" => __("Loop", "livemesh-el-addons"),
            ]
        );

        $this->add_control(
            'autoplay',
            [
                'type' => Controls_Manager::SWITCHER,
                'label_off' => __('No', 'livemesh-el-addons'),
                'label_on' => __('Yes', 'livemesh-el-addons'),
                'return_value' => 'yes',
                'default' => 'yes',
                'label' => __('Autoplay?', 'livemesh-el-addons'),
                'description' => __('Should the slider autoplay as in a slideshow.', 'livemesh-el-addons'),
            ]
        );

        $this->add_control(
            'autoplay_speed',
            [
                'label' => __('Autoplay speed in ms', 'livemesh-el-addons'),
                'type' => Controls_Manager::NUMBER,
                'default' => 3000,
            ]
        );


        $this->add_control(
            'animation_speed',
            [
                'label' => __('Autoplay animation speed in ms', 'livemesh-el-addons'),
                'type' => Controls_Manager::NUMBER,
                'default' => 300,
            ]
        );

        $this->end_controls_section();


        $this->start_controls_section(
            'section_slider_arrows',
            [
                'label' => __('Slider Arrow Settings', 'livemesh-el-addons'),
                'tab' => Controls_Manager::TAB_SETTINGS,
                'condition' => [
                    'arrows' => ['yes']
                ],
            ]
        );

        $this->add_control(
            'arrows_placement',
            [
                'type' => Controls_Manager::SELECT,
                'label' => __('Placement', 'livemesh-el-addons'),
                'options' => array(
                    'middle-center' => __('Middle Center', 'livemesh-el-addons'),
                    'bottom-center' => __('Bottom Center', 'livemesh-el-addons'),
                    'top-left' => __('Top Left', 'livemesh-el-addons'),
                    'top-right' => __('Top Right', 'livemesh-el-addons'),
                    'bottom-left' => __('Bottom Left', 'livemesh-el-addons'),
                    'bottom-right' => __('Bottom Right', 'livemesh-el-addons'),
                ),
                'default' => 'middle-center',
                'prefix_class' => 'lae-slider-arrow-placement-',
            ]
        );

        $this->add_control(
            'arrows_shape',
            [
                'type' => Controls_Manager::SELECT,
                'label' => __('Shape', 'livemesh-el-addons'),
                'options' => array(
                    'square' => __('Square', 'livemesh-el-addons'),
                    'rounded-corners' => __('Square with Rounded Corners', 'livemesh-el-addons'),
                    'circle' => __('Circle', 'livemesh-el-addons'),
                ),
                'default' => 'circle',
                'prefix_class' => 'lae-slider-arrow-shape-',
            ]
        );

        $this->add_control(
            'arrows_color',
            [
                'type' => Controls_Manager::SELECT,
                'label' => __('Color', 'livemesh-el-addons'),
                'options' => array(
                    'dark' => __('Dark', 'livemesh-el-addons'),
                    'light' => __('Light', 'livemesh-el-addons'),
                ),
                'default' => 'dark',
                'prefix_class' => 'lae-slider-arrow-color-',
            ]
        );

        $this->add_control(
            'arrows_visibility',
            [
                'type' => Controls_Manager::SELECT,
                'label' => __('Visibility', 'livemesh-el-addons'),
                'options' => array(
                    'always' => __('Show Always', 'livemesh-el-addons'),
                    'on-hover' => __('Show on Hover', 'livemesh-el-addons'),
                ),
                'default' => 'always',
                'prefix_class' => 'lae-slider-arrow-visibility-',
            ]
        );

        $this->end_controls_section();

        $this->start_controls_section(
            'section_general',
            [
                'label' => __('General', 'livemesh-el-addons'),
                'tab' => Controls_Manager::TAB_STYLE,
            ]
        );

        $this->add_responsive_control(
            'device_width',
            [
                'label' => __('Device Width', 'livemesh-el-addons'),
                'type' => Controls_Manager::SLIDER,
                'size_units' => ['px', '%', 'em'],
                'range' => [
                    'px' => [
                        'min' => 100,
                        'step' => 1,
                        'max' => 1100,
                    ],
                ],
                'selectors'  => array(
                    '{{WRAPPER}} .lae-device-slider' => 'width: {{SIZE}}{{UNIT}};',
                ),
            ]
        );

        $this->add_responsive_control(
            'device_border_radius',
            [
                'label' => __('Slide Image Border Radius', 'livemesh-el-addons'),
                'type' => Controls_Manager::DIMENSIONS,
                'size_units' => ['px', '%', 'em'],
                'selectors'  => array(
                    '{{WRAPPER}} .lae-device-slider .slick-list' => 'border-radius: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
                ),
                'isLinked' => true
            ]
        );

        $this->add_responsive_control(
            'slide_offsets',
            [
                'label' => __('Slide Image Position Values', 'livemesh-el-addons'),
                'type' => Controls_Manager::DIMENSIONS,
                'size_units' => ['px', '%', 'em'],
                'selectors' => [
                    '{{WRAPPER}} .lae-device-slider .lae-device-slides' => 'top: {{TOP}}{{UNIT}}; right: {{RIGHT}}{{UNIT}}; bottom: {{BOTTOM}}{{UNIT}}; left: {{LEFT}}{{UNIT}};',
                ],
                'isLinked' => false
            ]
        );

        $this->end_controls_section();


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

        $settings['slider_id'] = $this->get_id();

        $settings = apply_filters('lae_device_slider_' . $this->get_id() . '_settings', $settings);

        $args['settings'] = $settings;

        lae_get_template_part('addons/device-slider/loop', $args);

    }

    /**
     * Render the widget output in the editor.
     * @return void
     */
    protected function content_template() {
    }

}