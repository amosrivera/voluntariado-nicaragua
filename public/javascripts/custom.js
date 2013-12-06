jQuery(document).on({
    orientationchange: function () {
        if (navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i)) {
            var viewportmeta = document.querySelector('meta[name="viewport"]');
            if (viewportmeta) {
                viewportmeta.content = 'width=device-width, minimum-scale=1.0, maximum-scale=1.0';
                document.body.addEventListener('gesturestart', function() {
                    viewportmeta.content = 'width=device-width, minimum-scale=0.25, maximum-scale=1.6';
                }, false);
            }
        }
    }

});

function device_detection() {
    devices = new Array();
    devices[0] = new Array();

    devices[0]['min'] = 0;
    devices[0]['max'] = 649;
    devices[0]['device'] = 'phone';

    devices[1] = new Array();
    devices[1]['min'] = 650;
    devices[1]['max'] = 1154;
    devices[1]['device'] = 'tablet';

    devices[2] = new Array();
    devices[2]['min'] = 1155;
    devices[2]['max'] = 99999;
    devices[2]['device'] = 'desktop';

    found = false;
    for(i = 0; i < devices.length; i++) {
    device = devices[i];
    if ((screen.width >= device['min']) && (screen.width <= device['max'])) {
    found = device['device'];
    break;
    }
    }

    return found;
}

jQuery(document).ready(function(){
    $(".grid-row a").on('click', function(e){
        e.preventDefault();
    });

    $("#read_more").on('click',function(){
        $(this).hide();
        $(this).nextAll(".show-more").show();
    });

    var device = device_detection();

    if ( device != 'phone' && device != 'tablet' ){

   			   // --

   $("[data-animation='animation']").each( function(){
    var _this       = $( this),
        animUp      = _this.data('anup'),
        animDown    = _this.data('andown'),
        animTrigger = _this.data('trigger')
    ;
        _this.waypoint( function( direction ) {
        if( direction === 'down' ) {
            _this.addClass(animDown);
            if ( _this.hasClass( animUp ) ){
                _this.removeClass(animUp);
            }
        }   else if( direction === 'up' ){
            _this.addClass(animUp);
            if ( _this.hasClass( animDown ) ){
                _this.removeClass(animDown);
            }
        }
        }, {
        //triggerOnce: animTrigger ? true : false,
        offset: '100%'
        });
    });


    $( '[class^="knob-"]' ).each( function(i) {
        var $el = $( this ),
            $rel= $el.data('rel')
        ;
    $el.knob().waypoint( function( direction ) {
            if( $el.val() == 0 ){
                $({value: 0}).animate({value: $rel }, {
                    duration: 2000,
                    easing:'swing',
                    step: function () {
                        $el.val(Math.ceil(this.value)).trigger('change');
                    },
                    complete: function() {
                        $el.val($rel);
                    }
                });
            }
        },
        {
            offset: '100%',
            triggerOnce: true
        }
    );
    });

   	var $head = $( '#ha-header' );
			   $( '.ha-waypoint' ).each( function(i) {
			    var $el = $( this ),
			     animClassDown = $el.data( 'animateDown' ),
			     animid = $el.attr( 'id' ),
			     animClassUp = $el.data( 'animateUp'),
			                    activeItem = $('[data-number='+ animid +']'),
			                    animSectionDown = $el.data( 'animservicesdown'),
			                    animSectionUp = $el.data( 'animservicesup')
			                ;
			    $el.waypoint( function( direction ) {
			     if( direction === 'down' && animClassDown ) {
			                        $('[data-number^=section_]').removeClass('active');
			                        $('[data-number='+ animid +']').addClass('active');
			                        //dropdown_menu
			                        $('.dropdown_menu > a').text( activeItem.text() );
			      $head.attr('class', 'ha-header ' + animClassDown);
			                        $el.addClass(animSectionDown);
			                        $el.removeClass(animSectionUp);
			     }
			     else if( direction === 'up' && animClassUp ){
			                        $('[data-number^=section_]').removeClass('active');
			                        $('[data-number='+ animid +']').addClass('active');
			                        //dropdown_menu
			                        $('.dropdown_menu > a').text( activeItem.text() );
			      $head.attr('class', 'ha-header ' + animClassUp);
			                        $el.removeClass(animSectionDown);
			                        $el.addClass(animSectionUp);
			     }
			    }, { offset: '20%' } );
			                activeItem.click(function(){
			                    $.scrollTo('#'+animid, 1000);
			                    return false;
			                });
			   } );

  } else {
        $( '.ha-waypoint' ).each( function(i) {
            var $el = $( this ),
                animid = $el.attr( 'id' ),
                activeItem = $('[data-number='+ animid +']')
            ;
            activeItem.click(function(){
                $.scrollTo('#'+animid, 1000);
                return false;
            });
        } );
    }

 });

function initialize() {
    var mapOptions = {
      center: new google.maps.LatLng(12.1305, -86.2695),
      zoom: 16
    };
    var map = new google.maps.Map(document.getElementById("google-maps"),
        mapOptions);
}
google.maps.event.addDomListener(window, 'load', initialize);
