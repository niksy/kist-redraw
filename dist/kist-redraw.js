/* kist-redraw 0.0.0 - Redraw elements on page (particularly for IE) | Author: Ivan Nikolić, 2014 | License: MIT */
;(function ( $, window, document, undefined ) {

	var o                    = {};
	var pluginName           = 'KistRedraw';
	var pluginDomNamespace   = 'kist-redraw';
	var pluginEventNamespace = 'kist.redraw';

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
	var isRedrawNeeded = function () {
		if ( ie && ie < 9 ) {
			return true;
		}
		return false;
	};

	var PluginModule = function ( element, options ) {

		this._element = element;
		this.settings = $.extend( {}, this.defaults, options );

	};

	/**
	 * Default options
	 *
	 * @type {Object}
	 */
	o.defaults = {
		timeout: 50
	};

	/**
	 * Initialize plugin
	 *
	 * @return {Plugin}
	 */
	o.init = function () {

		this.getDomRefs();
		this.redrawElement();

		return this;

	};

	/**
	 * Get DOM references
	 *
	 * @return {Plugin}
	 */
	o.getDomRefs = function () {

		this.domRefs         = {};
		this.domRefs.element = $( this._element );

	};

	/**
	 * Redraw element
	 *
	 * @return {Ui}
	 */
	o.redrawElement = function () {

		setTimeout($.proxy(function () {
			this.domRefs.element.addClass(pluginDomNamespace);

			setTimeout($.proxy(function () {

				this.domRefs.element.removeClass(pluginDomNamespace);
				this.domRefs.element.trigger( 'redrawComplete.' + pluginEventNamespace );

			}, this), this.settings.timeout);

		}, this), this.settings.timeout);

	};

	$.extend( PluginModule.prototype, o );

	$[ pluginName ]          = {};
	$[ pluginName ].defaults = PluginModule.prototype.defaults;

	$.fn[ pluginName ] = function ( options ) {

		// Exit early if redraw is not needed
		if ( isRedrawNeeded() === false ) {
			return;
		}

		this.each(function () {
			if ( !$.data( this, pluginName ) ) {
				$.data( this, pluginName, new PluginModule( this, options ).init() );
			}
		});

		return this;
	};

})( jQuery, window, document );
