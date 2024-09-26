/* Credit - Image Chooser control by ElementsKit - https://wpmet.com/plugin/elementskit/ */

jQuery( window ).on( "elementor/init", ( function () {
        "use strict";
        var ControlBaseDataView = elementor.modules.controls.BaseData
            , ControlStyleSelectView = ControlBaseDataView.extend( {
            ui: function () {
                var ui = ControlBaseDataView.prototype.ui.apply(this, arguments);
                ui.inputs = '[type="radio"]';
                return ui;
            },
            events: function () {
                return _.extend( ControlBaseDataView.prototype.events.apply( this, arguments ), {
                    "mousedown label": "onMouseDownImage",
                    "mouseover label": "onMouseOverImage",
                    "click @ui.inputs": "onClickInput",
                    "change @ui.inputs": "onBaseInputChange"
                } )
            },
            onMouseOverImage: function ( event ) {
                var imageElement = this.$( event.currentTarget )
                    , windowHeight = jQuery( window ).height()
                    , offset = imageElement.offset()
                    , midHeightOfWindow = windowHeight / 2
                    , largeImageElement = imageElement.find( ".imagelarge" )
                    , newPreviewPosition = {
                    left: offset.left + imageElement.width(),
                    top: 0
                };
                offset.top <= midHeightOfWindow ? ( largeImageElement.removeClass( "preview-top" ),
                    newPreviewPosition.top = offset.top + imageElement.height() + 17 ) : ( largeImageElement.addClass( "preview-top" ),
                    newPreviewPosition.top = offset.top - 7 ),
                    largeImageElement.css( newPreviewPosition )
            },
            onMouseDownImage: function ( e ) {
                var imageElement = this.$( e.currentTarget )
                    , inputElement = this.$( "#" + imageElement.attr( "for" ) );
                inputElement.data( "checked", inputElement.prop( "checked" ) ),
                    this.ui.inputs.removeClass( "checked" ),
                    inputElement.data( "checked", inputElement.addClass( "checked" ) )
            },
            onClickInput: function ( e ) {
                if (this.model.get( "toggle" )) {
                    var inputElement = this.$( e.currentTarget );
                    inputElement.data( "checked" ) && inputElement.prop( "checked", !1 ).trigger( "change" )
                }
            },
            onRender: function () {
                ControlBaseDataView.prototype.onRender.apply( this, arguments );
                var selectedValue = this.getControlValue();
                selectedValue && ( this.ui.inputs.filter( '[value="' + selectedValue + '"]' ).prop( "checked", !0 ),
                    this.ui.inputs.filter( '[value="' + selectedValue + '"]' ).addClass( "checked" ) )
            }
        }, {
            onPasteStyle: function ( e, t ) {
                return "" === t || undefined !== e.options[t]
            }
        } );
        elementor.addControlView( "lae-style-select", ControlStyleSelectView )
    }
) );
