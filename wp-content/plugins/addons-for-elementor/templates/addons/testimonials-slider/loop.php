<?php
/**
 * Loop - Testimonials Slider Template
 *
 * This template can be overridden by copying it to mytheme/addons-for-elementor/addons/testimonials-slider/loop.php
 *
 */

if (!defined('ABSPATH')) {
    exit; // Exit if accessed directly
}

$dir = is_rtl() ? ' dir="rtl"' : '';

$styling = is_rtl() ? ' style="direction:rtl"' : '';

$settings = apply_filters('lae_testimonials_slider_' . esc_attr($settings['slider_id']) . '_settings', $settings);

$widget_template = esc_attr($settings['slider_style']);

$carousel_settings = [
    'fade' => ('fade' === $settings['slide_animation']),
    'autoplay' => ('yes' === $settings['autoplay']),
    'autoplay_speed' => absint($settings['slideshow_speed']),
    'animation_speed' => absint($settings['animation_speed']),
    'dots' => ('yes' === $settings['control_nav']),
    'arrows' => ('yes' === $settings['direction_nav']),
    'pause_on_hover' => ('yes' === $settings['pause_on_hover']),
    'pause_on_focus' => ('yes' === $settings['pause_on_action']),
    'adaptive_height' => ('yes' === $settings['smooth_height'])
];

$responsive_settings = [
    'display_columns' => 1,
    'scroll_columns' => 1,
    'tablet_width' => 800,
    'tablet_display_columns' => 1,
    'tablet_scroll_columns' => 1,
    'mobile_width' => 480,
    'mobile_display_columns' => 1,
    'mobile_scroll_columns' => 1,
];

$carousel_settings = array_merge($carousel_settings, $responsive_settings);

?>

<div<?php echo esc_attr($dir . $styling); ?> class="lae-testimonials-slider lae-testimonials-slider-<?php echo $widget_template; ?> lae-container"
                                 data-settings='<?php echo esc_attr(wp_json_encode($carousel_settings)); ?>'>

        <?php foreach ($settings['testimonials'] as $testimonial) : ?>

            <?php $args['testimonial'] = $testimonial; ?>

            <?php lae_get_template_part("addons/testimonials-slider/{$widget_template}", $args); ?>

        <?php endforeach; ?>

</div><!-- .lae-testimonials-slider -->