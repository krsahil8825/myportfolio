<?php
/**
 * Loop - Timeline Navigation
 *
 * This template can be overridden by copying it to mytheme/addons-for-elementor/addons/timeline/loop-nav.php
 *
 */

if (!defined('ABSPATH')) {
    exit; // Exit if accessed directly
}

?>

<div<?php echo is_rtl() ? ' dir="rtl"' : ''; ?>
        id="lae-timeline-nav-<?php echo esc_attr($settings['slider_id']); ?>"
        class="lae-timeline-nav">

    <?php foreach ($settings['timeline_items'] as $item): ?>

        <?php $args['item'] = $item; ?>

        <?php lae_get_template_part("addons/timeline/nav", $args); ?>

    <?php endforeach; ?>

</div><!-- .lae-timeline-nav -->

