var examples = require.context('./examples', false, /.*\.js/);
var Case = require('case');

$(document).ready(function() {

	var select = $('#example-select');
	var canvas = $('#canvas');

	/* Add examples to drop down */
	examples.keys().forEach( ex => {
		var [, file, idxStr, name] = ex.match(/\.\/(([0-9]+)_(.*)\.js)$/);
		var idx = parseInt(idxStr);
		var html = `<option value="${file}">${idx}. ${Case.title(name)}</option>`;
		select.append(html);
	});

	var curExample = null;
	select.change(function(event) {
		/* Teardown */
		canvas.empty();
		if (curExample) curExample.stop();

		var file = this.value;
		curExample = require(`./examples/${file}`);
		curExample.start();
	});

});
