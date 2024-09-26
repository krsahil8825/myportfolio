<?php
/**
 * Loop - Device Slider Content Template
 *
 * This template can be overridden by copying it to mytheme/addons-for-elementor/addons/device-slider/content.php
 *
 */

use Elementor\Control_Media;
use Elementor\Group_Control_Image_Size;

if (!defined('ABSPATH')) {
    exit; // Exit if accessed directly
}

?>

<div class="lae-device-slide">

    <?php

    $image_url = Group_Control_Image_Size::get_attachment_image_src($slide['id'], 'full', $settings);

    if (!$image_url && isset($slide['url'])) {
        $image_url = $slide['url'];
    }
    ?>

    <img src="<?php echo esc_attr($image_url); ?>" alt="<?php echo esc_attr(Control_Media::get_image_alt($slide)); ?>"/>

</div>