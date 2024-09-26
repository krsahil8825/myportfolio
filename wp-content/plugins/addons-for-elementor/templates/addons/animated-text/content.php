<?php
/**
 * Content - Animated Text Template
 *
 * This template can be overridden by copying it to mytheme/addons-for-elementor/addons/animated-text/content.php
 *
 */

if (!defined('ABSPATH')) {
    exit; // Exit if accessed directly
}

?>

<div class="lae-animated-text-item<?php echo ($text_visible) ? ' lae-visible': ''; ?>">

    <?php echo $widget_instance->split_string_to_spans($animated_text_item, $split_type); ?>

</div><!-- .lae-animated-text-item -->