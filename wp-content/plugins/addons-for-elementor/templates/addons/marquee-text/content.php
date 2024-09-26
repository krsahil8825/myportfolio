<?php
/**
 * Content - Marquee Text Template
 *
 * This template can be overridden by copying it to mytheme/addons-for-elementor/addons/marquee-text/content.php
 *
 */

if (!defined('ABSPATH')) {
    exit; // Exit if accessed directly
}

$item_class = 'elementor-repeater-item-' . esc_attr($marquee_text_item['_id']);

?>

<div class="lae-marquee-text-item <?php echo esc_attr($item_class); ?>">

    <?php if (!empty($marquee_text_item['marquee_text_link']) && !empty($marquee_text_item['marquee_text_link']['url'])): ?>

        <?php $target = $marquee_text_item['marquee_text_link']['is_external'] ? 'target="_blank"' : ''; ?>

        <a class="lae-marquee-text" href="<?php echo esc_url($marquee_text_item['marquee_text_link']['url']); ?>"
           title="<?php echo esc_attr($marquee_text_item['marquee_text']); ?>" <?php echo esc_attr($target); ?>><?php echo wp_kses_post(htmlspecialchars_decode($marquee_text_item['marquee_text'])); ?></a>

    <?php else: ?>

        <div class="lae-marquee-text"><?php echo wp_kses_post(htmlspecialchars_decode($marquee_text_item['marquee_text'])); ?></div>

    <?php endif; ?>

    <?php if (!empty($marquee_text_item['marquee_subtext'])): ?>

        <div class="lae-marquee-subtext"><?php echo esc_html($marquee_text_item['marquee_subtext']); ?></div>

    <?php endif; ?>

</div><!-- .lae-marquee-text-item -->