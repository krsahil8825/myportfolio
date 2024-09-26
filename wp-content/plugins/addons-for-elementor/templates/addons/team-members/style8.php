<?php
/**
 * Team Member Template 8
 *
 * This template can be overridden by copying it to mytheme/addons-for-elementor/addons/team-members/style8.php
 *
 */

use Elementor\Utils;

if (!defined('ABSPATH')) {
    exit; // Exit if accessed directly
}

$member_uid = 'lae-team-member-uid-' . uniqid();

$has_link = false;

if (!empty($team_member['member_link']['url'])) {

    $has_link = true;

    $link_key = 'link_' . $index;

    $url = esc_url($team_member['member_link']['url']);

    $widget_instance->add_render_attribute($link_key, 'title', $team_member['member_name']);

    $widget_instance->add_render_attribute($link_key, 'href', $url);

    if (!empty($url['is_external'])) {
        $widget_instance->add_render_attribute($link_key, 'target', '_blank');
    }

    if (!empty($url['nofollow'])) {
        $widget_instance->add_render_attribute($link_key, 'rel', 'nofollow');
    }
}
?>

<div class="lae-team-member-wrapper">

    <?php
    $class_attr = $data_attr = '';

    if ($settings['layout'] == 'grid')
        list($class_attr, $data_attr) = lae_get_animation_atts($team_member['widget_animation']);
    ?>

    <a href="#<?php echo $member_uid; ?>" class="lae-popup-trigger">

        <div class="lae-team-member <?php echo esc_attr($class_attr); ?>" <?php echo esc_attr($data_attr); ?>>

            <div class="lae-image-wrapper">

                <?php if (!empty($team_member['member_image'])): ?>

                    <?php $image_html = lae_get_image_html($team_member['member_image'], 'thumbnail_size', $settings); ?>

                    <?php echo $image_html; ?>

                <?php endif; ?>

                <div class="lae-modal-indicator">

                    <div class="lae-view-details-button"><?php echo __('View Details', 'livemesh-el-addons'); ?></div>

                </div>

            </div><!-- .lae-image-wrapper -->

            <div class="lae-team-member-text">

                <?php $title_html = '<' . lae_validate_html_tag($settings['title_tag']) . ' class="lae-title">' . esc_html($team_member['member_name']) . '</' . lae_validate_html_tag($settings['title_tag']) . '>'; ?>

                <?php echo $title_html; ?>

                <div class="lae-team-member-position">

                    <?php echo do_shortcode($team_member['member_position']); ?>

                </div>

            </div><!-- .lae-team-member-text -->

        </div><!-- .lae-team-member -->

    </a>

    <div id="<?php echo $member_uid; ?>" class="mfp-hide lae-popup-content">

        <div class="lae-team-member-modal">

            <div class="lae-team-member">

                <div class="lae-image-wrapper">

                    <?php if (!empty($team_member['member_image'])): ?>

                        <?php $image_html = lae_get_image_html($team_member['member_image'], 'thumbnail_size', $settings); ?>

                        <?php if ($has_link): ?>

                            <a class="lae-image-link" <?php echo $widget_instance->get_render_attribute_string($link_key); ?>><?php echo $image_html; ?></a>

                        <?php else: ?>

                            <?php echo $image_html; ?>

                        <?php endif; ?>

                    <?php endif; ?>

                </div><!-- .lae-image-wrapper -->

                <div class="lae-team-member-text">

                    <?php $title_html = '<' . lae_validate_html_tag($settings['title_tag']) . ' class="lae-title">' . esc_html($team_member['member_name']) . '</' . lae_validate_html_tag($settings['title_tag']) . '>'; ?>

                    <?php if ($has_link): ?>

                        <a class="lae-title-link" <?php echo $widget_instance->get_render_attribute_string($link_key); ?>><?php echo $title_html; ?></a>

                    <?php else: ?>

                        <?php echo $title_html; ?>

                    <?php endif; ?>

                    <div class="lae-team-member-position">

                        <?php echo do_shortcode($team_member['member_position']); ?>

                    </div>

                    <div class="lae-team-member-details">

                        <?php echo do_shortcode($team_member['member_details']); ?>

                    </div>

                    <?php lae_get_template_part("addons/team-members/social-profile", $args); ?>

                </div><!-- .lae-team-member-text -->

            </div><!-- .lae-team-member -->

        </div><!-- .lae-team-member-modal -->

    </div>

</div><!-- .lae-team-member-wrapper -->