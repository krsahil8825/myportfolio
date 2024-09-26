<?php
/**
 * Loop - Timeline Template
 *
 * This template can be overridden by copying it to mytheme/addons-for-elementor/addons/timeline/loop.php
 *
 */

if (!defined('ABSPATH')) {
    exit; // Exit if accessed directly
}

?>

<div class="lae-<?php echo esc_attr($settings['timeline_type']); ?>-timeline-wrap">

    <?php $args['settings'] = $settings; ?>

    <?php lae_get_template_part("addons/timeline/loop-nav", $args); ?>

    <?php lae_get_template_part("addons/timeline/loop-timeline", $args); ?>

</div>