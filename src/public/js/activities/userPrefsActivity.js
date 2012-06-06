define([ 'jquery', 'underscore', 'backbone', 'views/userPrefsView' ], function($, _, Backbone, UserPrefsView) {

	return function(models) {

		this.name = "UserPrefsActivity";

		this.start = function() {
			console.log("UserPrefs actitivity started");
			var view = new UserPrefsView({
				loginModel : models.loginModel,
				presenter : {
					updateUserPrefs : function(prefs) {
						// Call update API here, update then poke the user model to trigger
						// re-rendering of the view.
						console.log("Call to update user prefs " + prefs);
					}
				}
			});
			view.render();
			$('.main').empty();
			$('.main').append(view.el);
			var renderFunction = function() {
				view.render();
			};
			models.loginModel.bind("change", renderFunction);
			return [ {
				event : "change",
				model : models.loginModel,
				handler : renderFunction
			} ];
		};

		this.stop = function(callback) {
			callback(true);
		};
	};

});