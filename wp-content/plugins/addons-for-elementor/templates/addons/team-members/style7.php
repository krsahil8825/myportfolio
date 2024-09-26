<?php
/**
 * Team Member Template 7
 *
 * This template can be overridden by copying it to mytheme/addons-for-elementor/addons/team-members/style7.php
 *
 */

use Elementor\Utils;

if (!defined('ABSPATH')) {
    exit; // Exit if accessed directly
}

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

    <div class="lae-team-member <?php echo esc_attr($class_attr); ?>" <?php echo esc_attr($data_attr); ?>>

        <div class="lae-flip-card">

            <div class="lae-flip-card-inner">

                <div class="lae-flip-card-front">

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

                    </div><!-- .lae-team-member-text -->

                </div><!-- .lae-flip-card-front -->

                <div class="lae-flip-card-back">

                    <div class="lae-team-member-info">

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

                        </div><!-- .lae-team-member-text -->

                        <div class="lae-team-member-details">

                            <?php echo do_shortcode($team_member['member_details']); ?>

                        </div>

                        <?php lae_get_template_part("addons/team-members/social-profile", $args); ?>

                    </div><!-- .lae-team-member-info -->

                </div><!-- .lae-flip-card-back -->

            </div><!-- .lae-flip-card-inner -->

        </div><!-- .lae-flip-card -->

    </div><!-- .lae-team-member -->

</div><!-- .lae-team-member-wrapper -->