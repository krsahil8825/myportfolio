<?php
/**
 * Loop -  Timeline
 *
 * This template can be overridden by copying it to mytheme/addons-for-elementor/addons/timeline/loop-timeline.php
 *
 */

if (!defined('ABSPATH')) {
    exit; // Exit if accessed directly
}

$dir = is_rtl() ? ' dir="rtl"' : '';

$data_attr = '';

if ($settings['timeline_type'] == 'horizontal') {

    $carousel_settings = [
        'slider_id' => $settings['slider_id'],
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
        'tablet_gutter' => isset($settings['tablet_gutter']) ? $settings['tablet_gutter'] : ['size' => 10], // Set default value if not set
        'mobile_width' => absint($settings['mobile_width']),
        'mobile_display_columns' => absint($settings['mobile_display_columns']),
        'mobile_scroll_columns' => absint($settings['mobile_scroll_columns']),
        'mobile_gutter' => isset($settings['mobile_gutter']) ? $settings['mobile_gutter'] : ['size' => 10], // Set default value if not set
    ];

    $carousel_settings = array_merge($carousel_settings, $responsive_settings);

    $data_attr = ' data-settings= ' . esc_attr(wp_json_encode($carousel_settings));

}

?>

<div<?php echo esc_attr($data_attr); ?><?php echo esc_attr($dir); ?>
        id="lae-<?php echo esc_attr($settings['timeline_type']); ?>-timeline-<?php echo esc_attr($settings['slider_id']); ?>"
        class="lae-<?php echo esc_attr($settings['timeline_type']); ?>-timeline lae-container <?php echo esc_attr($settings['timeline_class']); ?>">

    <?php foreach ($settings['timeline_items'] as $item): ?>

        <?php $args['item'] = $item; ?>

        <?php lae_get_template_part("addons/timeline/content", $args); ?>

    <?php endforeach; ?>

</div>