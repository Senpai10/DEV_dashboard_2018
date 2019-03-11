const mongoose = require('mongoose');

var WidgetSchema = mongoose.Schema({
	type: String,
	url: String,
	config: Object
});

module.exports = mongoose.model('Widget', WidgetSchema);
module.exports.createWidget = function(widget, callback) {
	widget.save(callback);
}