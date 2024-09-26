<?php
/**
 * Content - Piecharts Template
 *
 * This template can be overridden by copying it to mytheme/addons-for-elementor/addons/piecharts/content.php
 *
 */

if (!defined('ABSPATH')) {
    exit; // Exit if accessed directly
}

?>

<div class="lae-grid-item lae-piechart">

    <div class="lae-percentage" data-percent="<?php echo round($piechart['percentage_value']); ?>">

        <span><?php echo round($piechart['percentage_value']); ?><sup>%</sup></span>

    </div>

    <div class="lae-label"><?php echo esc_html($piechart['stats_title']); ?></div>

</div><!-- .lae-piechart -->