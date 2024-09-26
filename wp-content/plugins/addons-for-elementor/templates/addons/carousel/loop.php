<?php
/**
 * Loop - Carousel Template
 *
 * This template can be overridden by copying it to mytheme/addons-for-elementor/addons/carousel/loop.php
 *
 */

if (!defined('ABSPATH')) {
    exit; // Exit if accessed directly
}

$elements = $settings['elements'];

$dir = is_rtl() ? ' dir="rtl"' : '';

$carousel_settings = [
    'arrows' => ('yes' === $settings['arrows']),
    'dots' => ('yes' === $settings['dots']),
    'autoplay' => ('yes' === $settings['autoplay']),
    'autoplay_speed' => absint($settings['autoplay_speed']),
    'animation_speed' => absint($settings['animation_speed']),
    'pause_on_hover' => ('yes' === $settings['pause_on_hover']),
];

$responsive_settings = [
    'display_columns' => absint($settings['display_columns']),
    'scroll_columns' => absint($settings['scroll_columns']),
    'gutter' => isset($settings['gutter']) ? $settings['gutter'] : ['size' => 10], // Set default value if not set
    'tablet_width' => absint($settings['tablet_width']),
    'tablet_display_columns' => absint($settings['tablet_display_columns']),
    'tablet_scroll_columns' => absint($settings['tablet_scroll_columns']),
    'mobile_width' => absint($settings['mobile_width']),
    'mobile_display_columns' => absint($settings['mobile_display_columns']),
    'mobile_scroll_columns' => absint($settings['mobile_scroll_columns']),
];

$carousel_settings = array_merge($carousel_settings, $responsive_settings);

?>

<?php if (!empty($elements)) : ?>

    <div<?php echo esc_attr($dir); ?> id="lae-carousel-<?php echo esc_attr($widget_instance->get_id()); ?>"
                                      class="lae-carousel lae-container"
                                      data-settings='<?php echo esc_attr(wp_json_encode($carousel_settings)); ?>'>

        <?php foreach ($elements as $element) : ?>

            <?php $args['element'] = $element; ?>

            <?php lae_get_template_part("addons/carousel/content", $args); ?>

        <?php endforeach; ?>

    </div><!-- .lae-carousel -->

<?php endif; ?>