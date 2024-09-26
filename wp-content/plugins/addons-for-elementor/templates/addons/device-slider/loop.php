<?php
/**
 * Loop - Device Slider Template
 *
 * This template can be overridden by copying it to mytheme/addons-for-elementor/addons/device-slider/loop.php
 *
 */

if (!defined('ABSPATH')) {
    exit; // Exit if accessed directly
}

$dir = is_rtl() ? ' dir="rtl"' : '';

$slider_options = [
    'slide_animation' => $settings['slide_animation'],
    'arrows' => ('yes' === $settings['arrows']),
    'dots' => ('yes' === $settings['dots']),
    'pause_on_hover' => ('yes' === $settings['pause_on_hover']),
    'pause_on_action' => ('yes' === $settings['pause_on_action']),
    'loop' => ('yes' === $settings['loop']),
    'autoplay' => ('yes' === $settings['autoplay']),
    'autoplay_speed' => absint($settings['autoplay_speed']),
    'animation_speed' => absint($settings['animation_speed']),
];

$device_type = $settings['device_type'];

$custom_device = $settings['custom_device'];
?>

<div <?php echo esc_attr($dir); ?>
        class="lae-device-slider lae-container <?php echo esc_attr($settings['device_slider_class']); ?>"
        data-settings='<?php echo esc_attr(wp_json_encode($slider_options)); ?>'>

    <div class="lae-device-image">
        <?php if ('mobile' === $device_type) { ?>

            <img src="<?php echo esc_url(LAE_PLUGIN_URL . 'assets/images/devices/phone.svg'); ?>"
                 alt="<?php esc_attr_e('Phone device', 'livemesh-el-addons'); ?>">

        <?php } elseif ('tablet' === $device_type) { ?>

            <img src="<?php echo esc_url(LAE_PLUGIN_URL . 'assets/images/devices/tablet.svg'); ?>"
                 alt="<?php esc_attr_e('Tablet device', 'livemesh-el-addons'); ?>">

        <?php } elseif ('laptop' === $device_type) { ?>

            <img src="<?php echo esc_url(LAE_PLUGIN_URL . 'assets/images/devices/laptop.svg'); ?>"
                 alt="<?php esc_attr_e('Laptop device', 'livemesh-el-addons'); ?>">

        <?php } elseif ('custom' === $device_type) { ?>

            <?php if (!empty($custom_device)): ?>

                <?php echo wp_get_attachment_image($custom_device['id'], 'full', false, array('class' => 'lae-image full')); ?>

            <?php endif; ?>

        <?php } ?>

    </div>

    <div class="lae-device-slides">

        <?php foreach ($settings['device_slides'] as $slide): ?>

            <?php $args['slide'] = $slide; ?>

            <?php lae_get_template_part("addons/device-slider/content", $args); ?>

        <?php endforeach; ?>

    </div>

</div><!-- .lae-device-slider -->
    