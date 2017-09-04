var searchVisible = 0,
    transparent = true,
    transparentBase = true,
    fixedTop = false,
    navbar_initialized = false,
    burger_menu;

$(document).ready(function () {
    var window_width = $(window).width();

    burger_menu = $('nav[role="navigation"]').hasClass('navbar-burger') ? true : false;

    // Init navigation toggle for small screens
    if (window_width < 768 || burger_menu) {
        gsdk.initRightMenu();
    }

    // Activate Morpghing Buttons
    $('[data-toggle="morphing"]').each(function () {
        $(this).morphingButton();
    });

    // Activate the tooltips
    $('[rel="tooltip"]').tooltip();

    // Activate the switches with icons
    if ($('.switch').length != 0) {
        $('.switch')['bootstrapSwitch']();
    }
    // Activate regular switches
    if ($("[data-toggle='switch']").length != 0) {
        $("[data-toggle='switch']").wrap('<div class="switch" />').parent().bootstrapSwitch();
    }

    //    Activate bootstrap-select
    if ($(".selectpicker").length != 0) {
        $(".selectpicker").selectpicker();
    }

    if ($(".tagsinput").length != 0) {
        $(".tagsinput").tagsInput();
    }

    if ($('.tagsinput-autocomplete').length != 0) {
        $(".tagsinput-autocomplete").tagsInput({
            autocomplete_url: [{"value": "Alien", "id": 1}, {"value": "Alex", "id": 2}, {
                "value": "Alexander",
                "id": 3
            }, {"value": "Alejandro", "id": 4}]
            //autocomplete_url:'test/fake_plaintext_endpoint.html' //jquery.autocomplete (not jquery ui)
        });
    }

    if ($('.datepicker').length != 0) {
        $('.datepicker').datepicker({
            weekStart: 1,
            color: '{color}'
        });
    }


    $('.btn-tooltip').tooltip();
    $('.label-tooltip').tooltip();

    // Carousel
    $('.carousel').carousel({
        interval: 4000
    });

    $('.form-control').on("focus", function () {
        $(this).parent('.input-group').addClass("input-group-focus");
    }).on("blur", function () {
        $(this).parent(".input-group").removeClass("input-group-focus");
    });

    if ($('.alert-auto-close').length != 0) {
        setTimeout(function () {
            $('.alert-auto-close').fadeOut(function () {
                $(this).remove();
            });
        }, 5000);
    }

    base.initPickColor();

    // Make the images from the card fill the hole space
    gsdk.fitBackgroundForCards();

    // Init icon search action for the navbar
    gsdk.initNavbarSearch();

    // Init popovers
    gsdk.initPopovers();

    // Init Collapse Areas
    gsdk.initCollapseArea();

    // Init Sliders
    gsdk.initSliders();

    //  Init video card actions
    gsdk.initVideoCards();

    $(window).resize(function () {
        $('.parallax').css('height', $(window).height() + 'px');
    }).trigger('resize');

    initMorphingButtons();
//    initGoogleMaps();

});

$(document).ready(function() {

	$(".tag").tooltip({ tooltipClass: "tooltip-arrowless" });

	$(".prestador-home-content-buttons li").on('click',this, function(){
		$(this).closest(".prestador-home-content-buttons").find("li").removeClass("active");
		$(this).addClass("active");
	});
	//Show Menu
	$("#showMenu").on("click",this,function(){
		currentView = $(".prestador-home-content.active");
		if(currentView.attr("id") != "menuContent" ) {
			currentView.fadeOut("fast",function(){
				currentView.removeClass("active");
				$("#menuContent").addClass("active");
				$("#menuContent").fadeIn('fast');
			})
		}
	});
	// Show Rating
	if($(".prestador-home-content-buttons").length > 0) { //TODO remove when all rests are with avals
		$('.users-numbers').on("click",function(){
			currentView = $(".prestador-home-content.active");
			if(currentView.attr("id") != "ratingContent" ) {
				$("#showRating").addClass("active");
				$("#showMenu").removeClass("active");
				currentView.fadeOut("fast",function(){
					currentView.removeClass("active");
					$("#ratingContent").addClass("active");
					$("#ratingContent").fadeIn("fast");
				})
			}
		});
	} else {
		$('.users-numbers').css({"cursor":"default"});
	}

	/* --- Ratings Tab --- */
	$("#showRating").on("click",this,function(){
		currentView = $(".prestador-home-content.active");
		if(currentView.attr("id") != "ratingContent" ) {
			currentView.fadeOut("fast",function(){
				// If it is the first time that the tab is loaded
				if ($(".user-comment-list").children().size() == 0){
					$('.prestador-home-content .load-more').click();
				}
				currentView.removeClass("active");
				$("#ratingContent").addClass("active");
				$("#ratingContent").fadeIn("fast");
			})
		}
	});

	/* --- See more button from ratings tab --- */
	$('.prestador-home-content .load-more').on("click", this, loadMoreEvaluations);
});


// activate collapse right menu when the windows is resized
$(window).resize(function () {
    if ($(window).width() < 768) {
        gsdk.initRightMenu();
    } else if (!burger_menu && gsdk.misc.navbar_menu_visible) {
        gsdk.toggleSidebarMenu();
    }
});

var gsdk = {
    misc: {
        navbar_menu_visible: 0
    },
    initRightMenu: function () {
        if (!navbar_initialized) {
            var $navbar = $('nav').find('.navbar-collapse').first().clone(true);

            var ul_content = '';

            $navbar.children('ul').each(function () {
                var content_buff = $(this).html();
                ul_content = ul_content + content_buff;
            });

            ul_content = '<ul class="nav navbar-nav">' + ul_content + '</ul>';
            $navbar.html(ul_content);

            $('body').append($navbar);

            var background_image = $navbar.data('nav-image');
            if (background_image != undefined) {
                $navbar.css('background', "url('" + background_image + "')")
                    .removeAttr('data-nav-image')
                    .css('background-size', "cover")
                    .addClass('has-image');
            }


            var $toggle = $('.navbar-toggle');

            $navbar.find('a').removeClass('btn btn-round btn-default');
            $navbar.find('button').removeClass('btn-round btn-fill btn-info btn-primary btn-success btn-danger btn-warning btn-neutral');
            $navbar.find('button').addClass('btn-simple btn-block');

            $toggle.click(gsdk.toggleSidebarMenu);

            navbar_initialized = true;
        }

    },

    toggleSidebarMenu: function () {

        if (gsdk.misc.navbar_menu_visible == 1) {
            $('html').removeClass('nav-open');
            gsdk.misc.navbar_menu_visible = 0;
            $('.body-click').remove();
            setTimeout(function () {
                $toggle.removeClass('toggled');
            }, 400);

        } else {
            setTimeout(function () {
                $toggle.addClass('toggled');
            }, 430);

            div = '<div class="body-click"></div>';
            $(div).appendTo("body").click(function () {
                $('html').removeClass('nav-open');
                gsdk.misc.navbar_menu_visible = 0;
                $('.body-click').remove();
                setTimeout(function () {
                    $toggle.removeClass('toggled');
                }, 400);
            });

            $('html').addClass('nav-open');
            gsdk.misc.navbar_menu_visible = 1;
        }

    },

    checkScrollForTransparentNavbar: debounce(function () {
        if ($(document).scrollTop() > 260) {
            if (transparent) {
                transparent = false;
                $('nav[role="navigation"]').removeClass('navbar-transparent');
            }
        } else {
            if (!transparent) {
                transparent = true;
                $('nav[role="navigation"]').addClass('navbar-transparent');
            }
        }
    }, 17),

    fitBackgroundForCards: function () {
        $('.card').each(function () {
            if (!$(this).hasClass('card-product') && !$(this).hasClass('card-user')) {
                image = $(this).find('.image img');

                image.hide();
                image_src = image.attr('src');

                $(this).find('.image').css({
                    "background-image": "url('" + image_src + "')",
                    "background-position": "center center",
                    "background-size": "cover"
                });
            }
        });
    },
    initPopovers: function () {
        if ($('[data-toggle="popover"]').length != 0) {
            $('body').append('<div class="popover-filter"></div>');

            //    Activate Popovers
            $('[data-toggle="popover"]').popover().on('show.bs.popover', function () {
                $('.popover-filter').click(function () {
                    $(this).removeClass('in');
                    $('[data-toggle="popover"]').popover('hide');
                });
                $('.popover-filter').addClass('in');
            }).on('hide.bs.popover', function () {
                $('.popover-filter').removeClass('in');
            });

        }
    },
    initCollapseArea: function () {
        $('[data-toggle="gsdk-collapse"]').each(function () {
            var thisdiv = $(this).attr("data-target");
            $(thisdiv).addClass("gsdk-collapse");
        });

        $('[data-toggle="gsdk-collapse"]').hover(function () {
                var thisdiv = $(this).attr("data-target");
                if (!$(this).hasClass('state-open')) {
                    $(this).addClass('state-hover');
                    $(thisdiv).css({
                        'height': '30px'
                    });
                }

            },
            function () {
                var thisdiv = $(this).attr("data-target");
                $(this).removeClass('state-hover');

                if (!$(this).hasClass('state-open')) {
                    $(thisdiv).css({
                        'height': '0px'
                    });
                }
            }).click(function (event) {
            event.preventDefault();

            var thisdiv = $(this).attr("data-target");
            var height = $(thisdiv).children('.panel-body').height();

            if ($(this).hasClass('state-open')) {
                $(thisdiv).css({
                    'height': '0px',
                });
                $(this).removeClass('state-open');
            } else {
                $(thisdiv).css({
                    'height': height + 30,
                });
                $(this).addClass('state-open');
            }
        });
    },
    initSliders: function () {
        // Sliders for demo purpose in refine cards section
        if ($('#slider-range').length != 0) {
            $("#slider-range").slider({
                range: true,
                min: 0,
                max: 500,
                values: [75, 300],
            });
        }
        if ($('#refine-price-range').length != 0) {
            $("#refine-price-range").slider({
                range: true,
                min: 0,
                max: 999,
                values: [100, 850],
                slide: function (event, ui) {
                    min_price = ui.values[0];
                    max_price = ui.values[1];
                    $(this).siblings('.price-left').html('&euro; ' + min_price);
                    $(this).siblings('.price-right').html('&euro; ' + max_price)
                }
            });
        }
        if ($('#slider-default').length != 0 || $('#slider-default2').length != 0) {
            $("#slider-default, #slider-default2").slider({
                value: 70,
                orientation: "horizontal",
                range: "min",
                animate: true
            });
        }
    },
    initVideoCards: function () {
        $('[data-toggle="video"]').click(function () {
            id_video = $(this).data('video');
            video = $('#' + id_video).get(0);

            card_parent = $(this).closest('.card');

            if (video.paused) {
                video.play();
                $(this).html('<i class="fa fa-pause"></i> Pause');
                card_parent.addClass('state-play');
            } else {
                video.pause();
                $(this).html('<i class="fa fa-play"></i> Play');
                card_parent.removeClass('state-play');
            }
        });
    },
    initNavbarSearch: function () {
        $('[data-toggle="search"]').click(function () {
            if (searchVisible == 0) {
                searchVisible = 1;
                $(this).parent().addClass('active');
                $('.navbar-search-form').fadeIn(function () {
                    $('.navbar-search-form input').focus();
                });
            } else {
                searchVisible = 0;
                $(this).parent().removeClass('active');
                $(this).blur();
                $('.navbar-search-form').fadeOut(function () {
                    $('.navbar-search-form input').blur();
                });
            }
        });
    }
}

var base = {
    initPickColor: function () {
        $('.pick-class-label').click(function () {
            var new_class = $(this).attr('new-class');
            var old_class = $('#display-buttons').attr('data-class');
            var display_div = $('#display-buttons');
            if (display_div.length) {
                var display_buttons = display_div.find('.btn');
                display_buttons.removeClass(old_class);
                display_buttons.addClass(new_class);
                display_div.attr('data-class', new_class);
            }
        });
    }
}

var data = {
    initContactUsMap: function () {
        var myLatlng = new google.maps.LatLng(-21.1861947, -47.8191111);
        var mapOptions = {
            zoom: 14,
            center: myLatlng,
            scrollwheel: false, //we disable de scroll over the map, it is a really annoing when you scroll through page
        };

        var map = new google.maps.Map(document.getElementById("contactUsMap"), mapOptions);

        var marker = new google.maps.Marker({
            position: myLatlng,
            title: "Hello World!"
        });

        // To add the marker to the map, call setMap();
        marker.setMap(map);
    }
}

// Returns a function, that, as long as it continues to be invoked, will not
// be triggered. The function will be called after it stops being called for
// N milliseconds. If `immediate` is passed, trigger the function on the
// leading edge, instead of the trailing.

function debounce(func, wait, immediate) {
    var timeout;
    return function () {
        var context = this, args = arguments;
        clearTimeout(timeout);
        timeout = setTimeout(function () {
            timeout = null;
            if (!immediate) func.apply(context, args);
        }, wait);
        if (immediate && !timeout) func.apply(context, args);
    };
}
function filterPath(string) {
    return string
        .replace(/^\//, '')
        .replace(/(index|default).[a-zA-Z]{3,4}$/, '')
        .replace(/\/$/, '');
}

function loadMoreEvaluations(){
	$(".loading-dots").show();
	var btn = this;
	var comment = $(btn).data("comment");
	var page = $(btn).data("page")+1;
	var rid = $(btn).data("rid");
	var pageSize = $(btn).data("pagesize");

	$(btn).data("page", page);

	$.ajax({
		type: "GET",
		dataType: "html",
		data: {rid:rid, comment:comment, page:page},
		url:  _ctx + URL_DELIVERY + URL_MORE_EVALUATIONS,
		beforeSend: initLoadingAnimationDots(this)
	}).done(function(html) {
		$(btn).siblings("ul").append(html);
		var len = $(btn).siblings("ul").length;
		var qty = 0;
		var qtyComments = $("#totalQtyComment").val();
		var qtyWoComments = $("#totalQtyWoComment").val();

		if (comment == true){
			qty = qtyComments;
		}
		else{
			qty = qtyWoComments;
		}

		/* --- Last page reached --- */
		if(page * pageSize >= qty){
			$(btn).hide();
		}

		/* --- Restaurants with no ratings --- */
		if (qtyWoComments == 0 && qtyComments == 0){
			$('.no-comments').show();
		}else if (page * pageSize < qty){
			$(btn).show();
		}

	}).always(function(){
		$(btn).removeClass("loadingDots");
		$(".loading-dots").hide();
	});
}