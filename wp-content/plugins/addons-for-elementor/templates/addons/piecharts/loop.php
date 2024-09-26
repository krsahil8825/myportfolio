<?php
/**
 * Loop - Piecharts Template
 *
 * This template can be overridden by copying it to mytheme/addons-for-elementor/addons/piecharts/loop.php
 *
 */

if (!defined('ABSPATH')) {
    exit; // Exit if accessed directly
}


$piechart_settings = [
    'bar_color' => esc_attr($settings['bar_color']),
    'track_color' => esc_attr($settings['track_color']),
    'chart_size' => esc_attr($settings['chart_size']['size']),
    'line_width' => esc_attr($settings['line_width']['size']),
];

$data_attr = ' data-settings=' . esc_attr(wp_json_encode($piechart_settings)) . '';


?>

<div class="lae-piecharts  lae-piecharts-<?php echo esc_attr($settings['style']);  ?> lae-uber-grid-container <?php echo lae_get_grid_classes($settings); ?> " <?php echo esc_attr($data_attr); ?>>

    <?php foreach ($settings['piecharts'] as $piechart): ?>

        <?php $args['piechart'] = $piechart; ?>

        <?php lae_get_template_part("addons/piecharts/content", $args); ?>

    <?php endforeach; ?>

</div><!-- .lae-piecharts -->

<div class="lae-clear"></div>