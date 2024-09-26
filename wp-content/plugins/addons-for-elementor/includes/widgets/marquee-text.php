<?php

/*
Widget Name: Marquee Text
Description: Display text that continuously scrolls across the page horizontally
Author: LiveMesh
Author URI: https://www.livemeshthemes.com
*/

namespace LivemeshAddons\Widgets;

use Elementor\Repeater;
use Elementor\Utils;
use Elementor\Widget_Base;
use Elementor\Controls_Manager;
use Elementor\Scheme_Color;
use Elementor\Group_Control_Typography;
use Elementor\Scheme_Typography;

if (!defined('ABSPATH'))
    exit; // Exit if accessed directly

/**
 * Class for Marquee Text widget that displays headings with animated text
 */
class LAE_Marquee_Text_Widget extends LAE_Widget_Base {

    /**
     * Get the name for the widget
     * @return string
     */
    public function get_name() {
        return 'lae-marquee-text';
    }

    /**
     * Get the widget title
     * @return string|void
     */
    public function get_title() {
        return __('Marquee Text', 'livemesh-el-addons');
    }

    /**
     * Get the widget icon
     * @return string
     */
    public function get_icon() {
        return 'lae-icon-text_rotation_none';
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
        return 'https://livemeshelementor.com/docs/livemesh-addons/marquee-text/';
    }

    /**
     * Obtain the scripts required for the widget to function
     * @return string[]
     */
    public function get_script_depends() {
        return [
            'lae-frontend-scripts',
        ];
    }

    /**
     * Register the controls for the widget
     * Adds fields that help configure and customize the widget
     * @return void
     */
    protected function register_controls() {

        $this->start_controls_section(
            'section_marquee_text',
            [
                'label' => __('Marquee Text', 'livemesh-el-addons'),
            ]
        );

        $this->add_control(
            'marquee_text_class', [
                'type' => Controls_Manager::TEXT,
                'label' => __('Container Class', 'livemesh-el-addons'),
                'description' => __('The CSS class for the marquee text container DIV element.', 'livemesh-el-addons'),
                'ai' => [
                    'active' => false,
                ],
            ]
        );

        $repeater = new Repeater();

        $repeater->add_control(
            'marquee_text',
            [

                'label' => __('Marquee Text', 'livemesh-el-addons'),
                'default' => __('My Marquee Text', 'livemesh-el-addons'),
                'type' => Controls_Manager::TEXTAREA,
                'label_block' => true,
                'dynamic' => [
                    'active' => true,
                ],
            ]
        );

        $repeater->add_control(
            'marquee_subtext',
            [

                'label' => __('Marquee Subtext', 'livemesh-el-addons'),
                'default' => __('My Marquee Subtext', 'livemesh-el-addons'),
                'type' => Controls_Manager::TEXT,
                'label_block' => true,
                'dynamic' => [
                    'active' => true,
                ],
            ]
        );

        $repeater->add_control(
            'marquee_text_link',

            [
                'label' => __('Marquee Text Item URL', 'livemesh-el-addons'),
                'description' => __('The link for the page linked from the marquee text.', 'livemesh-el-addons'),
                'type' => Controls_Manager::URL,
                'label_block' => true,
                'default' => [
                    'url' => '',
                    'is_external' => 'true',
                ],
                'placeholder' => __('https://www.mysite.com', 'livemesh-el-addons'),
                'dynamic' => [
                    'active' => true,
                ],
            ]
        );

        $repeater->add_control(
            'marquee_text_color',
            [
                'label' => __('Color', 'livemesh-el-addons'),
                'type' => Controls_Manager::COLOR,
                'selectors' => [
                    '{{WRAPPER}} .lae-marquee-text-content .lae-marquee-text-items .lae-marquee-text-item{{CURRENT_ITEM}} .lae-marquee-text' => 'color: {{VALUE}};',
                ],
            ]
        );

        $repeater->add_control(
            'marquee_text_hover_color',
            [
                'label' => __('Hover Color', 'livemesh-el-addons'),
                'type' => Controls_Manager::COLOR,
                'selectors' => [
                    '{{WRAPPER}} .lae-marquee-text-content .lae-marquee-text-items .lae-marquee-text-item{{CURRENT_ITEM}} .lae-marquee-text:hover' => 'color: {{VALUE}};',
                ],
            ]
        );

        $repeater->add_group_control(
            Group_Control_Typography::get_type(),
            [
                'name' => 'marquee_text_typography',
                'selector' => '{{WRAPPER}} .lae-marquee-text-content .lae-marquee-text-items .lae-marquee-text-item{{CURRENT_ITEM}} .lae-marquee-text',
            ]
        );

        $this->add_control(
            'marquee_text_items',
            [
                'type' => Controls_Manager::REPEATER,
                'default' => [
                    [
                        'marquee_text' => 'Creatively Express',
                    ],
                    [
                        'marquee_text' => 'Stay Productive',
                    ],
                    [
                        'marquee_text' => 'Endless Customization',
                    ],
                ],
                'fields' => $repeater->get_controls(),
                'title_field' => '{{{ marquee_text }}}',
            ]
        );

        $this->end_controls_section();

        $this->start_controls_section(
            'section_widget_settings',
            [
                'label' => __('Settings', 'livemesh-el-addons'),
                'tab' => Controls_Manager::TAB_SETTINGS,
                'show_label' => false,
            ]
        );

        $this->add_control(
            'separator_icon_type',
            [

                'label' => __('Separator Icon Type', 'livemesh-el-addons'),
                'type' => Controls_Manager::SELECT,
                'default' => 'icon',
                'options' => [
                    'none' => __('None', 'livemesh-el-addons'),
                    'icon' => __('Icon', 'livemesh-el-addons'),
                    'icon_image' => __('Icon Image', 'livemesh-el-addons'),
                ],
            ]
        );

        $this->add_control(
            'separator_icon_image',
            [

                'label' => __('Separator Image', 'livemesh-el-addons'),
                'type' => Controls_Manager::MEDIA,
                'default' => [
                    'url' => Utils::get_placeholder_image_src(),
                ],
                'label_block' => true,
                'condition' => [
                    'separator_icon_type' => 'icon_image',
                ],
                'dynamic' => [
                    'active' => true,
                ],
            ]
        );

        $this->add_control(
            'separator_icon',
            [

                'label' => __('Separator Icon', 'livemesh-el-addons'),
                'type' => Controls_Manager::ICONS,
                'label_block' => true,
                'default' => [
                    'value' => 'far fa-bookmark',
                    'library' => 'fa-regular',
                ],
                'condition' => [
                    'separator_icon_type' => 'icon',
                ],
                'fa4compatibility' => 'icon',
            ]
        );

        $this->add_control(
            'marquee_duration',
            [
                'label' => __('Marquee Duration (Seconds)', 'livemesh-el-addons'),
                'type' => Controls_Manager::NUMBER,
                'default' => 20,
                'min' => 5,
                'step' => 1,
                'selectors' => array(
                    '{{WRAPPER}} .lae-marquee-text-content .lae-marquee-text-items' => 'animation-duration: {{VALUE}}s;',
                ),
            ]
        );

        $this->add_control(
            'reverse_direction',
            [
                'type' => Controls_Manager::SWITCHER,
                'label_off' => __('No', 'livemesh-el-addons'),
                'label_on' => __('Yes', 'livemesh-el-addons'),
                'return_value' => 'yes',
                'default' => 'no',
                'label' => __('Reverse Direction?', 'livemesh-el-addons'),
                'selectors_dictionary' => array(
                    'yes' => 'lae-horizontal-reverse-scroll',
                    'no' => 'lae-horizontal-scroll',
                ),
                'selectors' => array(
                    '{{WRAPPER}} .lae-marquee-text-content .lae-marquee-text-items:not(.lae-clone)' => 'animation-name: {{VALUE}};',
                    '{{WRAPPER}} .lae-marquee-text-content .lae-marquee-text-items.lae-clone' =>  'animation-name: {{VALUE}}-alt;',
                ),
            ]
        );

        $this->add_responsive_control(
            'item_spacing',
            [
                'label' => __('Spacing Between Marquee Text Items', 'livemesh-el-addons'),
                'type' => Controls_Manager::SLIDER,
                'size_units' => ['px', '%', 'em'],
                'default' => [
                    'unit' => 'px',
                    'size' => 50,
                ],
                'range' => [
                    'px' => [
                        'min' => 0,
                        'step' => 1,
                        'max' => 250,
                    ],
                ],
                'selectors' => [
                    '{{WRAPPER}} .lae-marquee-text-content .lae-marquee-text-items .lae-marquee-text-item' => 'margin-right: calc({{SIZE}}{{UNIT}}/2); margin-left: calc({{SIZE}}{{UNIT}}/2);',
                ],
            ]
        );

        $this->end_controls_section();

        $this->start_controls_section(
            'section_marquee_text_items',
            [
                'label' => __('Marquee Text', 'livemesh-el-addons'),
                'tab' => Controls_Manager::TAB_STYLE,
            ]
        );

        $this->add_control(
            'marquee_text_color',
            [
                'label' => __('Default Color', 'livemesh-el-addons'),
                'type' => Controls_Manager::COLOR,
                'selectors' => [
                    '{{WRAPPER}} .lae-marquee-text-content .lae-marquee-text-items .lae-marquee-text-item .lae-marquee-text' => 'color: {{VALUE}};',
                ],
            ]
        );

        $this->add_control(
            'marquee_text_hover_color',
            [
                'label' => __('Default Hover Color', 'livemesh-el-addons'),
                'type' => Controls_Manager::COLOR,
                'selectors' => [
                    '{{WRAPPER}} .lae-marquee-text-content .lae-marquee-text-items .lae-marquee-text-item .lae-marquee-text:hover' => 'color: {{VALUE}};',
                ],
            ]
        );

        $this->add_group_control(
            Group_Control_Typography::get_type(),
            [
                'name' => 'marquee_text_typography',
                'selector' => '{{WRAPPER}} .lae-marquee-text-content .lae-marquee-text-items .lae-marquee-text-item .lae-marquee-text',
            ]
        );

        $this->end_controls_section();

        $this->start_controls_section(
            'section_marquee_subtext',
            [
                'label' => __('Marquee Subtext', 'livemesh-el-addons'),
                'tab' => Controls_Manager::TAB_STYLE,
            ]
        );

        $this->add_control(
            'marquee_subtext_color',
            [
                'label' => __('Default Color', 'livemesh-el-addons'),
                'type' => Controls_Manager::COLOR,
                'selectors' => [
                    '{{WRAPPER}} .lae-marquee-text-content .lae-marquee-text-items .lae-marquee-text-item .lae-marquee-subtext' => 'color: {{VALUE}};',
                ],
            ]
        );

        $this->add_responsive_control(
            'subtext_spacing',
            [
                'label' => __('Spacing Between Marquee Text and Subtext', 'livemesh-el-addons'),
                'type' => Controls_Manager::SLIDER,
                'size_units' => ['px', '%', 'em'],
                'default' => [
                    'unit' => 'px',
                    'size' => 10,
                ],
                'range' => [
                    'px' => [
                        'min' => 0,
                        'step' => 1,
                        'max' => 64,
                    ],
                ],
                'selectors' => [
                    '{{WRAPPER}} .lae-marquee-text-content .lae-marquee-text-items .lae-marquee-text-item .lae-marquee-subtext' => 'margin-top: calc({{SIZE}}{{UNIT}}/2);',
                ],
            ]
        );

        $this->add_group_control(
            Group_Control_Typography::get_type(),
            [
                'name' => 'marquee_subtext_typography',
                'selector' => '{{WRAPPER}} .lae-marquee-text-content .lae-marquee-text-items .lae-marquee-text-item .lae-marquee-subtext',
            ]
        );

        $this->end_controls_section();

        $this->start_controls_section(
            'section_separator_icon',
            [
                'label' => __('Separator Icon', 'livemesh-el-addons'),
                'tab' => Controls_Manager::TAB_STYLE,
                'condition' => [
                    'separator_icon_type!' => 'none',
                ],
            ]
        );

        $this->add_responsive_control(
            'separator_icon_size',
            [
                'label' => __('Icon or Icon Image size', 'livemesh-el-addons'),
                'type' => Controls_Manager::SLIDER,
                'size_units' => ['px', '%', 'em'],
                'range' => [
                    'px' => [
                        'min' => 10,
                        'step' => 1,
                        'max' => 300,
                    ],
                ],
                'selectors' => [
                    '{{WRAPPER}} .lae-marquee-text-content .lae-marquee-text-items .lae-image-wrapper img' => 'max-width: {{SIZE}}{{UNIT}};',
                    '{{WRAPPER}} .lae-marquee-text-content .lae-marquee-text-items .lae-icon-wrapper i, {{WRAPPER}} .lae-marquee-text-content .lae-marquee-text-items .lae-icon-wrapper svg' => 'font-size: {{SIZE}}{{UNIT}};',
                ],
            ]
        );

        $this->add_control(
            'separator_icon_color',
            [
                'label' => __('Icon Custom Color', 'livemesh-el-addons'),
                'type' => Controls_Manager::COLOR,
                'condition' => [
                    'separator_icon_type' => 'icon',
                ],
                'selectors' => [
                    '{{WRAPPER}} .lae-marquee-text-content .lae-marquee-text-items .lae-icon-wrapper i, {{WRAPPER}} .lae-marquee-text-content .lae-marquee-text-items .lae-icon-wrapper svg' => 'color: {{VALUE}}; fill: {{VALUE}};',
                ],
            ]
        );

        $this->add_control(

            'separator_icon_alignment', [
                'type' => Controls_Manager::SELECT,
                'label' => __('Choose Alignment', 'livemesh-el-addons'),
                'default' => 'center',
                'options' => [
                    'start' => __('Top', 'livemesh-el-addons'),
                    'end' => __('Bottom', 'livemesh-el-addons'),
                    'center' => __('Center', 'livemesh-el-addons'),
                ],
                'selectors' => [
                    '{{WRAPPER}} .lae-marquee-text-content .lae-marquee-text-items .lae-separator-icon' => 'align-self: {{VALUE}};',
                ],
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

        $settings = apply_filters('lae_marquee_text_' . $this->get_id() . '_settings', $settings);

        $args['settings'] = $settings;

        $args['widget_instance'] = $this;

        lae_get_template_part("addons/marquee-text/loop", $args);

    }

    /**
     * Render the widget output in the editor.
     * @return void
     */
    protected function content_template() {
    }

}