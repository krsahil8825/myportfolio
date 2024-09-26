<?php

/*
Widget Name: Timeline
Description: Display timeline items in a responsive carousel.
Author: LiveMesh
Author URI: https://www.livemeshthemes.com
*/

namespace LivemeshAddons\Widgets;

use Elementor\Repeater;
use Elementor\Widget_Base;
use Elementor\Controls_Manager;
use Elementor\Utils;
use Elementor\Scheme_Color;
use Elementor\Group_Control_Typography;
use Elementor\Group_Control_Image_Size;
use Elementor\Scheme_Typography;
use Elementor\Modules\DynamicTags\Module as TagsModule;

if (!defined('ABSPATH'))
    exit; // Exit if accessed directly

/**
 * Class for Timeline widget that displays timeline items in a responsive carousel.
 */
class LAE_Timeline_Widget extends LAE_Widget_Base {

    static public $timeline_counter = 0;

    /**
     * Get the name for the widget
     * @return string
     */
    public function get_name() {
        return 'lae-timeline';
    }

    /**
     * Get the widget title
     * @return string|void
     */
    public function get_title() {
        return __('Timeline', 'livemesh-el-addons');
    }

    /**
     * Get the widget icon
     * @return string
     */
    public function get_icon() {
        return 'lae-icon-flow-children';
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
        return 'https://livemeshelementor.com/docs/livemesh-addons/timeline/';
    }

    /**
     * Obtain the scripts required for the widget to function
     * @return string[]
     */
    public function get_script_depends() {
        return [
            'jquery-fancybox',
            'lae-jquery-slick',
            'lae-frontend-scripts',
            'lae-carousel-helper-scripts',
            'lae-timeline-scripts'
        ];
    }

    /**
     * Register the controls for the widget
     * Adds fields that help configure and customize the widget
     * @return void
     */
    protected function register_controls() {

        $this->start_controls_section(
            'section_timeline',
            [
                'label' => __('Timeline Items', 'livemesh-el-addons'),
            ]
        );

        $repeater = new Repeater();

        $repeater->add_control(
            'item_label',
            [

                'label' => __('Item Label', 'livemesh-el-addons'),
                'type' => Controls_Manager::TEXT,
                'default' => __('My item name', 'livemesh-el-addons'),
                'description' => __('The label or name for the timeline item.', 'livemesh-el-addons'),
                'dynamic' => [
                    'active' => true,
                ],
            ]
        );

        $repeater->add_control(
            'item_icon',
            [

                'label' => __('Item Icon', 'livemesh-el-addons'),
                'type' => Controls_Manager::ICONS,
                'label_block' => true,
                'default' => [
                    'value' => 'fas fa-home',
                    'library' => 'fa-solid',
                ],
                'fa4compatibility' => 'icon',
            ]
        );

        $repeater->add_control(
            'item_image',
            [

                'label' => __('Timeline Image', 'livemesh-el-addons'),
                'description' => __('The image for the timeline item.', 'livemesh-el-addons'),
                'type' => Controls_Manager::MEDIA,
                'default' => [
                    'url' => Utils::get_placeholder_image_src(),
                ],
                'label_block' => true,
                'dynamic' => [
                    'active' => true,
                ],
            ]
        );

        $repeater->add_control(
            'item_title',
            [

                'label' => __('Item Title', 'livemesh-el-addons'),
                'type' => Controls_Manager::TEXT,
                'default' => __('My item title', 'livemesh-el-addons'),
                'description' => __('The title for the timeline item.', 'livemesh-el-addons'),
                'dynamic' => [
                    'active' => true,
                ],
            ]
        );

        $repeater->add_control(
            'item_link',
            [

                'label' => __('Item Link', 'livemesh-el-addons'),
                'description' => __('The URL of the page to which the image timeline item points to (optional).', 'livemesh-el-addons'),
                'type' => Controls_Manager::URL,
                'label_block' => true,
                'default' => [
                    'url' => '',
                    'is_external' => 'false',
                ],
                'placeholder' => __('http://your-link.com', 'livemesh-el-addons'),
                'dynamic' => [
                    'active' => true,
                ],
            ]
        );

        $repeater->add_control(
            'item_description',
            [

                'label' => __('Item description', 'livemesh-el-addons'),
                'type' => Controls_Manager::TEXTAREA,
                'description' => __('Short description for the timeline item', 'livemesh-el-addons'),
                'label_block' => true,
                'dynamic' => [
                    'active' => true,
                ],
            ]
        );

        $this->add_control(
            'timeline_items',
            [
                'type' => Controls_Manager::REPEATER,
                'fields' => $repeater->get_controls(),
                'title_field' => '{{{ item_label }}}',
            ]
        );

        $this->end_controls_section();

        $this->start_controls_section(
            'section_general',
            [
                'label' => __('General', 'livemesh-el-addons'),
                'tab' => Controls_Manager::TAB_SETTINGS,
            ]
        );

        $this->add_control(
            'timeline_class', [
                'type' => Controls_Manager::TEXT,
                'description' => __('Specify an unique identifier used as a custom CSS class name and lightbox group name/slug for the timeline element.', 'livemesh-el-addons'),
                'label' => __('Timeline Class/Identifier', 'livemesh-el-addons'),
                'default' => '',
                'ai' => [
                    'active' => false,
                ],
            ]
        );

        $this->add_group_control(
            Group_Control_Image_Size::get_type(),
            [
                'name' => 'thumbnail_size',
                'label' => __('Timeline Image Size', 'livemesh-el-addons'),
                'default' => 'large',
                'separator' => 'before',
            ]
        );

        $this->end_controls_section();

        $this->start_controls_section(
            'section_carousel_options',
            [
                'label' => __('Carousel Options', 'livemesh-el-addons'),
                'tab' => Controls_Manager::TAB_SETTINGS,
            ]
        );

        $this->add_control(
            'arrows',
            [
                'type' => Controls_Manager::SWITCHER,
                'label_off' => __('No', 'livemesh-el-addons'),
                'label_on' => __('Yes', 'livemesh-el-addons'),
                'return_value' => 'yes',
                'separator' => 'before',
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
            'autoplay',
            [
                'type' => Controls_Manager::SWITCHER,
                'label_off' => __('No', 'livemesh-el-addons'),
                'label_on' => __('Yes', 'livemesh-el-addons'),
                'separator' => 'before',
                'return_value' => 'yes',
                'default' => 'no',
                'label' => __('Autoplay?', 'livemesh-el-addons'),
                'description' => __('Should the carousel autoplay as in a slideshow.', 'livemesh-el-addons'),
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
            'section_responsive',
            [
                'label' => __('Responsive Options', 'livemesh-el-addons'),
                'tab' => Controls_Manager::TAB_SETTINGS,
            ]
        );

        $this->add_control(
            'heading_desktop',
            [
                'label' => __('Desktop', 'livemesh-el-addons'),
                'type' => Controls_Manager::HEADING,
                'separator' => 'after',
            ]
        );

        $this->add_control(
            'display_columns',
            [
                'label' => __('Columns per row', 'livemesh-el-addons'),
                'type' => Controls_Manager::NUMBER,
                'min' => 1,
                'max' => 5,
                'step' => 1,
                'default' => 3,
            ]
        );


        $this->add_control(
            'scroll_columns',
            [
                'label' => __('Columns to scroll', 'livemesh-el-addons'),
                'type' => Controls_Manager::NUMBER,
                'min' => 1,
                'max' => 5,
                'step' => 1,
                'default' => 3,
            ]
        );


        $this->add_control(
            'gutter',
            [
                'label' => __('Gutter', 'livemesh-el-addons'),
                'description' => __('Space between columns.', 'livemesh-el-addons'),
                'type' => Controls_Manager::NUMBER,
                'default' => 10,
                'selectors' => [
                    '{{WRAPPER}} .lae-horizontal-timeline .lae-timeline-item' => 'padding: {{VALUE}}px;',
                ],
            ]
        );


        $this->add_control(
            'heading_tablet',
            [
                'label' => __('Tablet', 'livemesh-el-addons'),
                'type' => Controls_Manager::HEADING,
                'separator' => 'after',
            ]
        );

        $this->add_control(
            'tablet_display_columns',
            [
                'label' => __('Columns per row', 'livemesh-el-addons'),
                'type' => Controls_Manager::NUMBER,
                'min' => 1,
                'max' => 5,
                'step' => 1,
                'default' => 2,
            ]
        );

        $this->add_control(
            'tablet_scroll_columns',
            [
                'label' => __('Columns to scroll', 'livemesh-el-addons'),
                'type' => Controls_Manager::NUMBER,
                'min' => 1,
                'max' => 5,
                'step' => 1,
                'default' => 2,
            ]
        );

        $this->add_control(
            'tablet_gutter',
            [
                'label' => __('Gutter', 'livemesh-el-addons'),
                'description' => __('Space between columns.', 'livemesh-el-addons'),
                'type' => Controls_Manager::NUMBER,
                'default' => 10,
                'selectors' => [
                    '(tablet-){{WRAPPER}} .lae-horizontal-timeline .lae-timeline-item' => 'padding: {{VALUE}}px;',
                ],
            ]
        );

        $this->add_control(
            'tablet_width',
            [
                'label' => __('Tablet Resolution', 'livemesh-el-addons'),
                'description' => __('The resolution to treat as a tablet resolution.', 'livemesh-el-addons'),
                'type' => Controls_Manager::NUMBER,
                'default' => 800,
            ]
        );

        $this->add_control(
            'heading_mobile',
            [
                'label' => __('Mobile Phone', 'livemesh-el-addons'),
                'type' => Controls_Manager::HEADING,
                'separator' => 'after',
            ]
        );

        $this->add_control(
            'mobile_display_columns',
            [
                'label' => __('Columns per row', 'livemesh-el-addons'),
                'type' => Controls_Manager::NUMBER,
                'min' => 1,
                'max' => 3,
                'step' => 1,
                'default' => 1,
            ]
        );

        $this->add_control(
            'mobile_scroll_columns',
            [
                'label' => __('Columns to scroll', 'livemesh-el-addons'),
                'type' => Controls_Manager::NUMBER,
                'min' => 1,
                'max' => 3,
                'step' => 1,
                'default' => 1,
            ]
        );

        $this->add_control(
            'mobile_gutter',
            [
                'label' => __('Gutter', 'livemesh-el-addons'),
                'description' => __('Space between columns.', 'livemesh-el-addons'),
                'type' => Controls_Manager::NUMBER,
                'default' => 10,
                'selectors' => [
                    '(mobile-){{WRAPPER}} .lae-horizontal-timeline .lae-timeline-item' => 'padding: {{VALUE}}px;',
                ],
            ]
        );

        $this->add_control(
            'mobile_width',
            [
                'label' => __('Tablet Resolution', 'livemesh-el-addons'),
                'description' => __('The resolution to treat as a tablet resolution.', 'livemesh-el-addons'),
                'type' => Controls_Manager::NUMBER,
                'default' => 480,
            ]
        );


        $this->end_controls_section();

        $this->start_controls_section(
            'section_timeline_nav_styling',
            [
                'label' => __('Timeline Navigation', 'livemesh-el-addons'),
                'tab' => Controls_Manager::TAB_STYLE,
            ]
        );

        $this->add_control(
            'icon_color',
            [
                'label' => __('Icon Color', 'livemesh-el-addons'),
                'type' => Controls_Manager::COLOR,
                'selectors' => [
                    '{{WRAPPER}} .lae-timeline-nav .lae-timeline-nav-item .lae-timeline-icon i' => 'color: {{VALUE}};',
                ],
            ]
        );

        $this->add_control(
            'icon_hover_color',
            [
                'label' => __('Icon Hover Color', 'livemesh-el-addons'),
                'type' => Controls_Manager::COLOR,
                'selectors' => [
                    '{{WRAPPER}} .lae-timeline-nav .lae-timeline-nav-item:hover .lae-timeline-icon i' => 'color: {{VALUE}};',
                ],
            ]
        );

        $this->add_control(
            'icon_size',
            [
                'label' => __('Icon Size', 'livemesh-el-addons'),
                'type' => Controls_Manager::SLIDER,
                'size_units' => ['px'],
                'default' => [
                    'size' => 20,
                ],
                'range' => [
                    'px' => [
                        'min' => 12,
                        'max' => 32,
                    ],
                ],
                'selectors' => [
                    '{{WRAPPER}} .lae-timeline-nav .lae-timeline-nav-item .lae-timeline-icon i' => 'font-size: {{SIZE}}{{UNIT}};',
                ],
            ]
        );

        $this->add_control(
            'icon_bg_color',
            [
                'label' => __('Icon Background Color', 'livemesh-el-addons'),
                'type' => Controls_Manager::COLOR,
                'selectors' => [
                    '{{WRAPPER}} .lae-timeline-nav .lae-timeline-nav-item .lae-timeline-icon' => 'background-color: {{VALUE}};',
                ],
            ]
        );

        $this->add_control(
            'icon_bg_hover_color',
            [
                'label' => __('Icon Background Hover Color', 'livemesh-el-addons'),
                'type' => Controls_Manager::COLOR,
                'selectors' => [
                    '{{WRAPPER}} .lae-timeline-nav .lae-timeline-nav-item:hover .lae-timeline-icon' => 'background-color: {{VALUE}};',
                ],
            ]
        );

        $this->add_control(
            'nav_line_color',
            [
                'label' => __('Navigation Line Color', 'livemesh-el-addons'),
                'type' => Controls_Manager::COLOR,
                'selectors' => [
                    '{{WRAPPER}} .lae-timeline-nav:before' => 'background-color: {{VALUE}};',
                ],
            ]
        );

        $this->end_controls_section();

        $this->start_controls_section(
            'section_item_label_styling',
            [
                'label' => __('Timeline Item Label', 'livemesh-el-addons'),
                'tab' => Controls_Manager::TAB_STYLE,
            ]
        );

        $this->add_control(
            'label_color',
            [
                'label' => __('Label Color', 'livemesh-el-addons'),
                'type' => Controls_Manager::COLOR,
                'selectors' => [
                    '{{WRAPPER}} .lae-timeline-nav .lae-timeline-nav-item .lae-timeline-label' => 'color: {{VALUE}};',
                ],
            ]
        );

        $this->add_group_control(
            Group_Control_Typography::get_type(),
            [
                'name' => 'label_typography',
                'selector' => '{{WRAPPER}} .lae-timeline-nav .lae-timeline-nav-item .lae-timeline-label',
            ]
        );

        $this->end_controls_section();

        $this->start_controls_section(
            'section_item_thumbnail_styling',
            [
                'label' => __('Timeline Thumbnail', 'livemesh-el-addons'),
                'tab' => Controls_Manager::TAB_STYLE,
            ]
        );


        $this->add_control(
            'thumbnail_hover_bg_color',
            [
                'label' => __('Hover Background Color', 'livemesh-el-addons'),
                'type' => Controls_Manager::COLOR,
                'selectors' => [
                    '{{WRAPPER}} .lae-timeline-item .lae-timeline-image:after' => 'background-color: {{VALUE}};',
                ],
            ]
        );

        $this->add_responsive_control(
            'thumbnail_hover_opacity',
            [
                'label' => __('Hover Opacity (%)', 'livemesh-el-addons'),
                'type' => Controls_Manager::SLIDER,
                'default' => [
                    'size' => 0.3,
                ],
                'range' => [
                    'px' => [
                        'max' => 1,
                        'min' => 0.10,
                        'step' => 0.01,
                    ],
                ],
                'selectors' => [
                    '{{WRAPPER}} .lae-timeline-item:hover .lae-timeline-image:after' => 'opacity: {{SIZE}};',
                ],
            ]
        );

        $this->add_control(
            'thumbnail_border_radius',
            [
                'label' => esc_html__( 'Border Radius', 'elementor-pro' ),
                'type' => Controls_Manager::SLIDER,
                'selectors' => [
                    '{{WRAPPER}} .lae-timeline-item .lae-timeline-image:after, {{WRAPPER}} .lae-timeline-item .lae-timeline-image img' => 'border-radius: {{SIZE}}{{UNIT}}',
                ],
                'range' => [
                    'px' => [
                        'min' => 0,
                        'max' => 200,
                        'step' => 1,
                    ],
                    '%' => [
                        'min' => 0,
                        'max' => 100,
                        'step' => 1,
                    ],
                ],
                'size_units' => [ 'px', '%', 'em', 'rem' ],
            ]
        );

        $this->end_controls_section();

        $this->start_controls_section(
            'section_item_title_styling',
            [
                'label' => __('Timeline Item Title', 'livemesh-el-addons'),
                'tab' => Controls_Manager::TAB_STYLE,
            ]
        );

        $this->add_control(
            'title_tag',
            [
                'label' => __('Title HTML Tag', 'livemesh-el-addons'),
                'type' => Controls_Manager::SELECT,
                'options' => [
                    'h1' => __('H1', 'livemesh-el-addons'),
                    'h2' => __('H2', 'livemesh-el-addons'),
                    'h3' => __('H3', 'livemesh-el-addons'),
                    'h4' => __('H4', 'livemesh-el-addons'),
                    'h5' => __('H5', 'livemesh-el-addons'),
                    'h6' => __('H6', 'livemesh-el-addons'),
                    'div' => __('div', 'livemesh-el-addons'),
                ],
                'default' => 'h3',
            ]
        );

        $this->add_control(
            'title_color',
            [
                'label' => __('Title Color', 'livemesh-el-addons'),
                'type' => Controls_Manager::COLOR,
                'selectors' => [
                    '{{WRAPPER}} .lae-timeline-item .lae-timeline-title, {{WRAPPER}} .lae-timeline-item .lae-timeline-title a' => 'color: {{VALUE}};',
                ],
            ]
        );

        $this->add_control(
            'title_hover_color',
            [
                'label' => __('Title Hover Color', 'livemesh-el-addons'),
                'type' => Controls_Manager::COLOR,
                'selectors' => [
                    '{{WRAPPER}} .lae-timeline-item .lae-timeline-title a:hover' => 'color: {{VALUE}};',
                ],
            ]
        );

        $this->add_group_control(
            Group_Control_Typography::get_type(),
            [
                'name' => 'title_typography',
                'selector' => '{{WRAPPER}} .lae-timeline-item .lae-timeline-title, {{WRAPPER}} .lae-timeline-item .lae-timeline-title a',
            ]
        );

        $this->end_controls_section();

        $this->start_controls_section(
            'section_item_description_styling',
            [
                'label' => __('Timeline Item Description', 'livemesh-el-addons'),
                'tab' => Controls_Manager::TAB_STYLE,
            ]
        );

        $this->add_control(
            'description_color',
            [
                'label' => __('Description Color', 'livemesh-el-addons'),
                'type' => Controls_Manager::COLOR,
                'selectors' => [
                    '{{WRAPPER}} .lae-timeline-item .lae-timeline-description' => 'color: {{VALUE}};',
                ],
            ]
        );

        $this->add_group_control(
            Group_Control_Typography::get_type(),
            [
                'name' => 'description_typography',
                'selector' => '{{WRAPPER}} .lae-timeline-item .lae-timeline-description',
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

        $settings = apply_filters('lae_timeline_' . $this->get_id() . '_settings', $settings);

        self::$timeline_counter++;

        $settings['timeline_type'] = 'horizontal'; // as of now only horizontal timeline is supported

        $settings['timeline_class'] = !empty($settings['timeline_class']) ? sanitize_title($settings['timeline_class']) : $settings['timeline_type'] . '-timeline-' . self::$timeline_counter;

        $settings['slider_id'] = $this->get_id();

        $args['settings'] = $settings;

        $args['widget_instance'] = $this;

        lae_get_template_part("addons/timeline/loop", $args);


    }

    /**
     * Render the widget output in the editor.
     * @return void
     */
    protected function content_template() {
    }

}