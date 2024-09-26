<?php
/**
 * Loop Start - Posts Multislider Template
 *
 * This template can be overridden by copying it to mytheme/addons-for-elementor/addons/posts-multislider/loop-start.php
 */

if (!defined('ABSPATH')) {
    exit; // Exit if accessed directly
}

$dir = is_rtl() ? ' dir="rtl"' : '';

$slider_style = esc_attr($settings['slider_style']);

$multislider_settings = [
    'arrows' => ('yes' === $settings['arrows']),
    'dots' => ('yes' === $settings['dots']),
    'autoplay' => ('yes' === $settings['autoplay']),
    'autoplay_speed' => absint($settings['autoplay_speed']),
    'animation_speed' => absint($settings['animation_speed']),
    'pause_on_hover' => ('yes' === $settings['pause_on_hover']),
    'adaptive_height' => ('yes' === $settings['adaptive_height']),
];


$responsive_settings = [
    'display_columns' => absint($settings['display_columns']),
    'scroll_columns' => absint($settings['scroll_columns']),
    'tablet_width' => absint($settings['tablet_width']),
    'tablet_display_columns' => absint($settings['tablet_display_columns']),
    'tablet_scroll_columns' => absint($settings['tablet_scroll_columns']),
    'mobile_width' => absint($settings['mobile_width']),
    'mobile_display_columns' => absint($settings['mobile_display_columns']),
    'mobile_scroll_columns' => absint($settings['mobile_scroll_columns']),
];

$multislider_settings = array_merge($multislider_settings, $responsive_settings);

?>

<div class="lae-posts-multislider-wrap">
    <div<?php echo is_rtl() ? ' dir="rtl"' : ''; ?>
            id="lae-posts-multislider-<?php echo esc_attr($settings['slider_id']); ?>"
            class="lae-posts-multislider lae-container <?php echo 'lae-posts-multislider-' . $slider_style; ?>"
            data-settings='<?php echo esc_attr(wp_json_encode($multislider_settings)); ?>'>