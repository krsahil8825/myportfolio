<?php
/**
 * Loop - Animated Text Template
 *
 * This template can be overridden by copying it to mytheme/addons-for-elementor/addons/animated-text/loop.php
 *
 */

if (!defined('ABSPATH')) {
    exit; // Exit if accessed directly
}

$dir = is_rtl() ? ' dir="rtl"' : '';

$anchor_tag = false;

$args['text_animation'] = $settings['text_animation'];
$args['split_type'] = $settings['split_type'];

$animation_settings = [
    'textAnimation' => ($settings['text_animation']),
    'animationDelay' => ($settings['animation_delay']),
    'splitType' => ($settings['split_type']),
];

$container_class = 'lae-animated-text' . ' lae-align-' . esc_attr($settings['text_alignment']) . ' ' . esc_attr($settings['animated_text_class']);

?>

<?php $anchor_tag = false; ?>

<?php if (!empty($settings['animated_text_link']) && !empty($settings['animated_text_link']['url'])): ?>

    <?php $target = $settings['animated_text_link']['is_external'] ? 'target="_blank"' : ''; ?>

    <?php $anchor_tag = true; ?>

    <a <?php echo esc_attr($dir); ?> href="<?php echo esc_url($settings['animated_text_link']['url']); ?> " <?php echo $target; ?>
                           class="<?php echo esc_attr($container_class); ?>"
                           data-settings='<?php echo esc_attr(wp_json_encode($animation_settings)); ?>'>

<?php else: ?>

    <div <?php echo esc_attr($dir); ?> class="<?php echo esc_attr($container_class); ?>"
                         data-settings='<?php echo esc_attr(wp_json_encode($animation_settings)); ?>'>

<?php endif; ?>

<?php if (!empty($settings['before_text'])): ?>

    <div class="lae-animated-text-before-text">

        <?php echo $settings['before_text']; ?>

    </div>

<?php endif; ?>

<?php if (!empty($settings['animated_text_items'])): ?>

    <div class="lae-animated-text-items">

        <?php foreach ($settings['animated_text_items'] as $index => $animated_text): ?>

            <?php $args['animated_text_item'] = $animated_text['animated_text_item']; ?>

            <?php
            if ($index === 0)
                $args['text_visible'] = true;
            else
                $args['text_visible'] = false;
            ?>

            <?php lae_get_template_part("addons/animated-text/content", $args); ?>

        <?php endforeach; ?>

    </div><!-- .lae-animated-text-items -->

<?php endif; ?>

<?php if (!empty($settings['after_text'])): ?>

    <div class="lae-animated-text-after-text">

        <?php echo $settings['after_text']; ?>

    </div>

<?php endif; ?>

<?php if ($anchor_tag): ?>
    </a>
<?php else: ?>
    </div>
<?php endif; ?>

<div class="lae-clear"></div>