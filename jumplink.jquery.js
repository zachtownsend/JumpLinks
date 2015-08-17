$.fn.jumpLink = function(options, callback){
	var settings = $.extend({
		body: $('html, body'),
		window: $('window'),
		speed: this.attr('data-speed') || 900,
		ease: this.attr('data-ease') || 'linear',
		offset_modes: [],
		offset: this.attr('data-offset') || 0
	}, options);

	var the_window = settings.window;
	function getOffset() {

		if(settings.offset_modes.length > 0) {
			var sorted_modes = settings.offset_modes.sort(function(a, b) {
				return a.breakpoint - b.breakpoint;
			});
			var current_window_width = settings.window.width();
			var upperlimit = 0;
			for (var i = 0; i < sorted_modes.length; i++) {
				
				var lowerlimit = sorted_modes[i].breakpoint;
				var upperlimit = (typeof sorted_modes[i + 1] !== 'undefined') ? sorted_modes[i + 1].breakpoint : false;

				if(current_window_width > lowerlimit && (current_window_width < upperlimit || !upperlimit)) {
					console.log('breakpoint: ' + lowerlimit);
					settings.offset = $(sorted_modes[i].element).outerHeight();
					break;
				}
			};
		}
	}
	var data = this.attr('data-target') || this.attr('href');
	var target = $(data);
	var getScrollPos = function() {
		getOffset();
		return target.offset().top - settings.offset;
	}
	var cb = callback || null;
	this.click(function(e){
		e.preventDefault();
		settings.body.stop().animate({
			'scrollTop' : getScrollPos()
		}, settings.speed, settings.ease, cb);
	});
};