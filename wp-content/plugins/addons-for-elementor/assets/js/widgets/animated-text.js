( function ( $ ) {

    /* Credit for text effects - https://tympanus.net/codrops/2016/10/18/inspiration-for-letter-effects/ */

    /**
     * Equation of a line.
     */
    function lineEq( y2, y1, x2, x1, currentVal ) {
        // y = mx + b
        var m = ( y2 - y1 ) / ( x2 - x1 ),
            b = y1 - m * x1;

        return m * currentVal + b;
    }

    var LAE_Animate_Text = function ( $scope ) {

        let $element = $scope.find( '.lae-animated-text' ).eq( 0 );

        this._init( $element );
    };

    LAE_Animate_Text.prototype = {

        self: null,
        wrapperElement: null,
        textItems: null,
        settings: null,
        currentIndex: 0,
        symbols: null,
        animation: null,
        delay: null,
        timeout: null,

        effects: {
            'fx1': {
                in: {
                    duration: 1000,
                    delay: function ( el, index ) {
                        return 75 + index * 40;
                    },
                    easing: 'easeOutElastic',
                    elasticity: 650,
                    opacity: {
                        value: 1,
                        easing: 'easeOutExpo',
                    },
                    translateY: [ '50%', '0%' ]
                },
                out: {
                    duration: 400,
                    delay: function ( el, index ) {
                        return index * 40;
                    },
                    easing: 'easeOutExpo',
                    opacity: 0,
                    translateY: '-100%'
                }
            },
            'fx2': {
                in: {
                    duration: 700,
                    delay: function ( el, index ) {
                        return index * 50;
                    },
                    easing: 'easeOutCirc',
                    opacity: 1,
                    translateX: function ( el, index ) {
                        return [ ( 50 + index * 10 ), 0 ]
                    }
                },
                out: {
                    duration: 0,
                    opacity: 0
                }
            },
            'fx3': {
                in: {
                    duration: 800,
                    delay: function ( el, index ) {
                        return index * 50;
                    },
                    easing: 'easeOutElastic',
                    opacity: 1,
                    translateY: function ( el, index ) {
                        return index % 2 === 0 ? [ '-80%', '0%' ] : [ '80%', '0%' ];
                    }
                },
                out: {
                    duration: 800,
                    delay: function ( el, index ) {
                        return index * 50;
                    },
                    easing: 'easeOutExpo',
                    opacity: 0,
                    translateY: function ( el, index ) {
                        return index % 2 === 0 ? '80%' : '-80%';
                    }
                }
            },
            'fx4': {
                in: {
                    duration: 700,
                    delay: function ( el, index ) {
                        return ( el.parentNode.children.length - index - 1 ) * 80;
                    },
                    easing: 'easeOutElastic',
                    opacity: 1,
                    translateY: function ( el, index ) {
                        return index % 2 === 0 ? [ '-80%', '0%' ] : [ '80%', '0%' ];
                    },
                    rotateZ: [ 90, 0 ]
                },
                out: {
                    duration: 500,
                    delay: function ( el, index ) {
                        return ( el.parentNode.children.length - index - 1 ) * 80;
                    },
                    easing: 'easeOutExpo',
                    opacity: 0,
                    translateY: function ( el, index ) {
                        return index % 2 === 0 ? '80%' : '-80%';
                    },
                    rotateZ: function ( el, index ) {
                        return index % 2 === 0 ? -25 : 25;
                    }
                }
            },
            'fx5': {
                perspective: 1000,
                in: {
                    duration: 700,
                    delay: function ( el, index ) {
                        return 550 + index * 50;
                    },
                    easing: 'easeOutQuint',
                    opacity: {
                        value: 1,
                        easing: 'linear',
                    },
                    translateY: [ '-150%', '0%' ],
                    rotateY: [ 180, 0 ]
                },
                out: {
                    duration: 700,
                    delay: function ( el, index ) {
                        return index * 60;
                    },
                    easing: 'easeInQuint',
                    opacity: {
                        value: 0,
                        easing: 'linear',
                    },
                    translateY: '150%',
                    rotateY: -180
                }
            },
            'fx6': {
                in: {
                    duration: 600,
                    easing: 'easeOutQuart',
                    opacity: 1,
                    translateY: function ( el, index ) {
                        return index % 2 === 0 ? [ '-40%', '0%' ] : [ '40%', '0%' ];
                    },
                    rotateZ: [ 10, 0 ]
                },
                out: {
                    duration: 0,
                    opacity: 0
                }
            },
            
        },

        stopAnimation: function () {
            anime.remove( this.symbols );
            this.symbols.each( function ( index, symbol ) {
                symbol.style.transform = '';
            } );
        },

        hideText: function ( $element, effect, callback ) {
            this.symbols = $element.find( 'span' );
            this.stopAnimation();
            arguments.length ? this.animateText( $element, 'out', effect, callback ) : this.symbols.each( function ( index, symbol ) {
                symbol.style.opacity = 0;
            } );
        },

        showText: function ( $element, effect, callback ) {
            this.symbols = $element.find( 'span' );
            this.stopAnimation();
            arguments.length ? this.animateText( $element, 'in', effect, callback ) : this.symbols.each( function ( index, symbol ) {
                symbol.style.opacity = 1;
            } );
        },

        animateText: function ( $element, direction, effect, callback ) {

            let effectSettings = ( typeof effect === 'string' ) ? this.effects[effect] : effect;

            if (effectSettings.perspective != undefined) {
                $element.css( { "perspective": effectSettings.perspective + 'px' } );
            }
            if (effectSettings.origin != undefined) {
                this.symbols.each( function ( index, symbol ) {
                    symbol.style.transformOrigin = effectSettings.origin;
                } );
            }

            let $symbols = this.symbols;

            $symbols.each( function ( index, current ) {
                if (current.innerHTML === ' ') {
                    $symbols.splice( index, 1 ); // remove the span that is empty space
                }
            } );

            let animationOptions = effectSettings[direction];

            animationOptions.targets = $symbols.toArray();

            animationOptions.complete = callback;

            anime( animationOptions );
        },
        textChanged: function () {

            let self = this;

            /* The text that is being animated currently */
            let prevText = self.textItems.eq( self.currentIndex );

            self.currentIndex++;
            if (self.currentIndex >= self.textItems.length) {
                self.currentIndex = 0;
            }

            if (self.timeout) {
                clearTimeout( self.timeout );
            }

            /* The text that needs to be animated next */
            let nextText = self.textItems.eq( self.currentIndex );

            self.hideText( prevText, self.animation, function () {
                nextText.addClass( 'lae-visible' );
                prevText.removeClass( 'lae-visible' );
                self.showText( nextText, self.animation, function () {
                    self.timeout = setTimeout( function () {
                        self.textChanged(); // show next text after the delay and the cycle repeats
                    }, self.delay );
                } );
            } )

        },
        _init: function ( $element ) {

            let self = this;

            self.textItems = $element.find( '.lae-animated-text-item' );
            self.settings = $element.data( 'settings' );

            self.animation = self.settings.textAnimation;
            self.delay = self.settings.animationDelay;

            let firstElement = self.textItems.eq( 0 );
            firstElement.addClass( 'lae-visible' ); // optional but good to have just in case the first element is hidden as well

            this.showText( firstElement, self.animation, function () {
                    self.timeout = setTimeout( function () {
                        self.textChanged(); // show next text after the delay
                    }, self.delay );
                }
            );
        },
    };

    var WidgetLAEAnimatedTextHandler = function ( $scope, $ ) {

        new LAE_Animate_Text( $scope );

    };

    // Make sure you run this code under Elementor..
    $( window ).on( 'elementor/frontend/init', function () {

        elementorFrontend.hooks.addAction( 'frontend/element_ready/lae-animated-text.default', WidgetLAEAnimatedTextHandler );

    } );

} )( jQuery );