<?php
/**
 * Loop - Marquee Text Template
 *
 * This template can be overridden by copying it to mytheme/addons-for-elementor/addons/marquee-text/loop.php
 *
 */

if (!defined('ABSPATH')) {
    exit; // Exit if accessed directly
}

$dir = is_rtl() ? ' dir="rtl"' : '';

?>

<div <?php echo esc_attr($dir); ?> class="lae-marquee-text-container <?php echo esc_attr($settings['marquee_text_class']); ?>">

    <div class="lae-marquee-text-content">

        <?php if (!empty($settings['marquee_text_items'])): ?>

            <div class="lae-marquee-text-items">

                <?php foreach ($settings['marquee_text_items'] as $index => $marquee_text): ?>

                    <?php $args['marquee_text_item'] = $marquee_text; ?>

                    <?php lae_get_template_part("addons/marquee-text/content", $args); ?>

                    <?php lae_get_template_part("addons/marquee-text/separator", $args); ?>

                <?php endforeach; ?>

            </div><!-- .lae-marquee-text-items -->

            <div class="lae-marquee-text-items lae-clone">

                <?php foreach ($settings['marquee_text_items'] as $index => $marquee_text): ?>

                    <?php $args['marquee_text_item'] = $marquee_text; ?>

                    <?php lae_get_template_part("addons/marquee-text/content", $args); ?>

                    <?php lae_get_template_part("addons/marquee-text/separator", $args); ?>

                <?php endforeach; ?>

            </div><!-- .lae-marquee-text-items--clone -->

        <?php endif; ?>

    </div>

</div>

<div class="lae-clear"></div>