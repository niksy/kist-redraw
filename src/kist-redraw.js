;(function ( $, window, document, undefined ) {

	var plugin = {
		name: 'redraw',
		ns: {
			css: 'kist-Redraw',
			event: '.kist.redraw'
		},
		error: function ( message ) {
			throw new Error(plugin.name + ': ' + message);
		}
	};

	// http://browserhacks.com/#hack-e2cb1ecfc2d67744c30566414042c53c
	var ie = document.all && !document.addEventListener;

	// Attach necessary styles if redraw is needed
	if ( ie ) {
		$('<style>.'+plugin.ns.css+':before,.'+plugin.ns.css+':after {position:absolute !important;display:block !important;content:"x" !important;width:0 !important;height:0 !important;overflow:hidden !important;}</style>')
			.appendTo('head');
	}

	var redraw = {

		/**
		 * Redraw element
		 *
		 * @param  {ELement} el
		 *
		 * @return {}
		 */
		init: function ( el ) {

			var timeout = this.defaults.timeout;
			el = $(el);

			setTimeout(function () {

				el.addClass(plugin.ns.css);

				setTimeout(function () {

					el.removeClass(plugin.ns.css);
					el.trigger('complete' + plugin.ns.event);

				}, timeout);

			}, timeout);

		},

		defaults: {
			timeout: 15
		}

	};

	$.kist = $.kist || {};

	$.kist[plugin.name] = {
		defaults: redraw.defaults
	};

	$.fn[plugin.name] = function ( options ) {

		if ( !ie ) {
			return this;
		}

		return this.each(function () {
			redraw.init(this);
		});

	};

})( jQuery, window, document );
