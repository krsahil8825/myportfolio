<?php
/**
 * Timeline Nav
 *
 * This template can be overridden by copying it to mytheme/addons-for-elementor/addons/timeline/nav.php
 *
 */

use Elementor\Icons_Manager;

if (!defined('ABSPATH')) {
    exit; // Exit if accessed directly
}

?>

<div class="lae-timeline-nav-item">

    <div class="lae-timeline-icon">

        <?php Icons_Manager::render_icon($item['item_icon'], ['aria-hidden' => 'true']); ?>

    </div>

    <div class="lae-timeline-label"><?php echo $item['item_label']; ?></div>

</div>