<?php
/**
 * Content - Timeline Template
 *
 * This template can be overridden by copying it to mytheme/addons-for-elementor/addons/timeline/content.php
 *
 */

if (!defined('ABSPATH')) {
    exit; // Exit if accessed directly
}

?>

<div class="lae-timeline-item">

    <?php $image_html = lae_get_image_html($item['item_image'], 'thumbnail_size', $settings); ?>

    <?php if (!empty($item['item_link']['url'])): ?>

        <a class="lae-timeline-image" href="<?php echo esc_url($item['item_link']['url']) ?>"
           title="<?php esc_html($item['item_title']) ?>"><?php echo $image_html ?></a>

    <?php else: ?>

        <div class="lae-timeline-image">

            <?php echo $image_html ?>

        </div><!-- .lae-timeline-image -->

    <?php endif; ?>

    <<?php echo lae_validate_html_tag($settings['title_tag']); ?> class="lae-timeline-title">

        <?php if (!empty($item['item_link']['url'])): ?>

            <?php $target = $item['item_link']['is_external'] ? 'target="_blank"' : ''; ?>

            <a href="<?php echo esc_url($item['item_link']['url']); ?>"
               title="<?php echo esc_html($item['item_title']); ?>" <?php echo $target; ?>><?php echo esc_html($item['item_title']); ?></a>

        <?php else: ?>

            <?php echo esc_html($item['item_title']); ?>

        <?php endif; ?>

    </<?php echo lae_validate_html_tag($settings['title_tag']); ?>>

<div class="lae-timeline-description"><?php echo do_shortcode(wp_kses_post($item['item_description'])); ?></div>

</div><!-- .lae-timeline-item -->