<?php
/**
 * Separator - Marquee Text Template
 *
 * This template can be overridden by copying it to mytheme/addons-for-elementor/addons/marquee-text/separator.php
 *
 */

if (!defined('ABSPATH')) {
    exit; // Exit if accessed directly
}

?>

<span class="lae-separator-icon">

        <?php if ($settings['separator_icon_type'] == 'icon_image' && !empty($settings['separator_icon_image'])) : ?>

            <div class="lae-image-wrapper">

                <?php echo wp_get_attachment_image($settings['separator_icon_image']['id'], 'large', false, array('class' => 'lae-image lae-thumbnail')); ?>

            </div>

        <?php elseif ($settings['separator_icon_type'] == 'icon' && (!empty($settings['separator_icon'])) && (!empty($settings['separator_icon']['value']))) : ?>

            <div class="lae-icon-wrapper">

                <?php Elementor\Icons_Manager::render_icon($settings['separator_icon'], ['aria-hidden' => 'true']); ?>

            </div>

        <?php endif; ?>

</span>