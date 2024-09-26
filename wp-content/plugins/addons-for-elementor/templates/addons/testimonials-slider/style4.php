<?php
/**
 * Testimonials Slider Template 4
 *
 * This template can be overridden by copying it to mytheme/addons-for-elementor/addons/testimonials-slider/style4.php
 *
 */
use Elementor\Utils;

if (!defined('ABSPATH')) {
    exit; // Exit if accessed directly
}

?>

<div class="lae-testimonial lae-<?php echo esc_attr($testimonial['testimonial_rating']); ?>">

    <div class="lae-testimonial-info">

        <div class="lae-testimonial-details">

            <div class="lae-testimonial-text">

                <?php if ($testimonial['testimonial_rating'] !== 'rating-none') : ?>

                    <?php lae_get_template_part("addons/testimonials-slider/star-rating", $args); ?>

                <?php endif; ?>

                <?php echo $widget_instance->parse_text_editor($testimonial['testimonial_text']); ?>

            </div>

            <div class="lae-testimonial-user">

                <div class="lae-user-text">

                    <<?php echo lae_validate_html_tag($settings['title_tag']); ?> class="lae-author-name"><?php echo esc_html($testimonial['client_name']); ?></<?php echo lae_validate_html_tag($settings['title_tag']); ?>>

                    <div class="lae-author-credentials"><?php echo wp_kses_post($testimonial['credentials']); ?></div>

                </div>

            </div><!-- .lae-testimonial-user -->

        </div>

        <?php $client_image = $testimonial['client_image']; ?>

        <?php if (!empty($client_image)): ?>

            <div class="lae-testimonial-image">

                <?php $image_src = wp_get_attachment_image_src($client_image['id'], 'full'); ?>

                <div class="lae-image-bg" style="background-image: url(<?php echo $image_src[0]; ?>);"></div>

            </div>

        <?php endif; ?>

    </div>

</div><!-- .lae-testimonial -->