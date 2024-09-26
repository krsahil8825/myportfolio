( function ( $ ) {

    var WidgetLAEHorizontalTimelineHandler = function ( $scope, $ ) {

        var slider_elem = $scope.find( '.lae-horizontal-timeline' ).eq( 0 );

        var nav_slider = slider_elem.parent().find( '.lae-timeline-nav' );

        if (slider_elem.length > 0) {

            var rtl = slider_elem.attr( 'dir' ) === 'rtl';

            var settings = slider_elem.data( 'settings' );

            var sliderId = settings['slider_id'];

            var arrows = settings['arrows'];

            var dots = settings['dots'];

            var autoplay = settings['autoplay'];

            var autoplay_speed = parseInt( settings['autoplay_speed'] ) || 3000;

            var animation_speed = parseInt( settings['animation_speed'] ) || 300;

            var fade = settings['fade'];

            var pause_on_hover = settings['pause_on_hover'];

            var display_columns = parseInt( settings['display_columns'] ) || 4;

            var scroll_columns = parseInt( settings['scroll_columns'] ) || 4;

            var tablet_width = parseInt( settings['tablet_width'] ) || 1024;

            var tablet_display_columns = parseInt( settings['tablet_display_columns'] ) || 2;

            var tablet_scroll_columns = parseInt( settings['tablet_scroll_columns'] ) || 2;

            var mobile_width = parseInt( settings['mobile_width'] ) || 767;

            var mobile_display_columns = parseInt( settings['mobile_display_columns'] ) || 1;

            var mobile_scroll_columns = parseInt( settings['mobile_scroll_columns'] ) || 1;

            slider_elem.slick( {
                asNavFor: '#lae-timeline-nav-' + sliderId,
                arrows: arrows,
                dots: dots,
                infinite: true,
                autoplay: autoplay,
                autoplaySpeed: autoplay_speed,
                speed: animation_speed,
                fade: false,
                pauseOnHover: pause_on_hover,
                rtl: rtl,
                slidesToShow: display_columns,
                slidesToScroll: scroll_columns,
                responsive: [
                    {
                        breakpoint: tablet_width,
                        settings: {
                            slidesToShow: tablet_display_columns,
                            slidesToScroll: tablet_scroll_columns
                        }
                    },
                    {
                        breakpoint: mobile_width,
                        settings: {
                            slidesToShow: mobile_display_columns,
                            slidesToScroll: mobile_scroll_columns
                        }
                    }
                ]
            } );

            nav_slider.slick( {
                asNavFor: '#lae-horizontal-timeline-' + sliderId,
                dots: false,
                arrows: false,
                infinite: true,
                focusOnSelect: true,
                speed: animation_speed,
                slidesToShow: display_columns,
                slidesToScroll: scroll_columns,
                responsive: [
                    {
                        breakpoint: tablet_width,
                        settings: {
                            slidesToShow: tablet_display_columns,
                            slidesToScroll: tablet_scroll_columns
                        }
                    },
                    {
                        breakpoint: mobile_width,
                        settings: {
                            slidesToShow: mobile_display_columns,
                            slidesToScroll: mobile_scroll_columns
                        }
                    }
                ]
            } );

        }

    };

    // Make sure you run this code under Elementor..
    $( window ).on( 'elementor/frontend/init', function () {

        elementorFrontend.hooks.addAction( 'frontend/element_ready/lae-timeline.default', WidgetLAEHorizontalTimelineHandler );

    } );

} )( jQuery );