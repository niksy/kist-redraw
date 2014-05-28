/*! kist-redraw 0.2.0 - Redraw elements on page for IE. | Author: Ivan Nikolić, 2014 | License: MIT */
;(function ( $, window, document, undefined ) {

	var plugin = {
		classNs: 'KistRedraw',
		eventNs: '.kist.redraw'
	};

	/**
	 * Detect IE
	 *
	 * Ref. https://gist.github.com/padolsey/527683
	 *
	 * @return {Number}
	 */
	var ie = (function () {

		var undef;
		var v   = 3;
		var div = document.createElement('div');
		var all = div.getElementsByTagName('i');

		while (
			div.innerHTML = '<!--[if gt IE ' + (++v) + ']><i></i><![endif]-->',
			all[0]
		);

		return v > 4 ? v : undef;

	}());

	/**
	 * Determine if redraw is needed
	 *
	 * @return {Boolean}
	 */
	function isRedrawNeeded () {
		if ( ie && ie < 9 ) {
			return true;
		}
		return false;
	}

	if ( isRedrawNeeded() ) {
		// Attach necessary styles if redraw is needed
		$('<style type="text/css">.KistRedraw:before,.KistRedraw:after {position:absolute !important;display:block !important;content:"x" !important;width:0 !important;overflow:hidden !important;}</style>')
			.appendTo('head');
	}

	function Redraw () {}

	$.extend(Redraw.prototype,{

		/**
		 * Redraw element
		 *
		 * @param  {ELement} el
		 *
		 * @return {Ui}
		 */
		redraw: function ( el ) {

			var timeout = this.defaults.timeout;
			el = $(el);

			setTimeout(function () {

				el.addClass(plugin.classNs);

				setTimeout(function () {

					el.removeClass(plugin.classNs);
					el.trigger('complete' + plugin.eventNs);

				}, timeout);

			}, timeout);

		},

		defaults: {
			timeout: 15
		}

	});

	var o = new Redraw();

	$.kist = $.kist || {};

	$.kist.redraw = {
		defaults: Redraw.prototype.defaults
	};

	$.fn.redraw = function ( options ) {

		// If redraw is not needed, don’t run plugin
		if ( !isRedrawNeeded() ) {
			return;
		}

		this.each(function () {
			o.redraw(this);
		});

		return this;

	};

})( jQuery, window, document );
