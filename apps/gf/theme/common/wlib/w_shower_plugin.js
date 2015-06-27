define([ 'underscore' ], function(_) {
	var WShowerPlugin = {
		init : function() {
			this.ws_plugin = window.ws_plugin;
		},
		trigger : function() {
			var event = arguments[0];
			var newargs = [];
			_.each(arguments, function(value, key) {
				if (key == 0)
					return;
				newargs[key - 1] = value;
			});
			if (_.isUndefined(this.ws_plugin))
				return;
			if (_.isUndefined(this.ws_plugin[event]))
				return;
			if (!_.isFunction(this.ws_plugin[event]))
				return;
			this.ws_plugin[event].apply(this, newargs);
		},
	};
	return WShowerPlugin;
});
