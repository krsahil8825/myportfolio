( function ( $ ) {


    var WidgetLAECarouselHandler = function ( $scope, $ ) {

        var helper = new LAE_Carousel_Helper( $scope, '.lae-team-members-carousel' );

        helper.init();
    };

    // Make sure you run this code under Elementor..
    $( window ).on( 'elementor/frontend/init', function () {

        elementorFrontend.hooks.addAction( 'frontend/element_ready/lae-team-members.default', WidgetLAECarouselHandler );

    } );


    $( '.lae-popup-trigger' ).magnificPopup( {
        type: 'inline',
        midClick: true,
        gallery: {
            enabled: true, // Enable gallery mode
            loop: false    // Disable looping
        },
        mainClass: 'mfp-fade', // fade effect
        removalDelay: 300, // delay in closing
    } );

} )( jQuery );