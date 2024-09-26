<?php
/**
 * Loop Start - Posts Carousel Template
 *
 * This template can be overridden by copying it to mytheme/addons-for-elementor/addons/posts-carousel/loop-start.php
 */

if (!defined('ABSPATH')) {
    exit; // Exit if accessed directly
}

$carousel_settings = [
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
    'gutter' => isset($settings['gutter']) ? $settings['gutter'] : ['size' => 10], // Set default value if not set
    'tablet_width' => absint($settings['tablet_width']),
    'tablet_display_columns' => absint($settings['tablet_display_columns']),
    'tablet_scroll_columns' => absint($settings['tablet_scroll_columns']),
    'tablet_gutter' => isset($settings['tablet_gutter']) ? $settings['tablet_gutter'] : ['size' => 10], // Set default value if not set
    'mobile_width' => absint($settings['mobile_width']),
    'mobile_display_columns' => absint($settings['mobile_display_columns']),
    'mobile_scroll_columns' => absint($settings['mobile_scroll_columns']),
    'mobile_gutter' => isset($settings['mobile_gutter']) ? $settings['mobile_gutter'] : ['size' => 10], // Set default value if not set
];

$carousel_settings = array_merge($carousel_settings, $responsive_settings);

?>

<div<?php echo is_rtl() ? ' dir="rtl"' : ''; ?>
        id="lae-posts-carousel-<?php echo uniqid(); ?>"
        class="lae-posts-carousel lae-container <?php echo 'lae-' . str_replace('_', '-', esc_attr($settings['carousel_skin'])); ?>"
        data-settings='<?php echo esc_attr(wp_json_encode($carousel_settings)); ?>'>