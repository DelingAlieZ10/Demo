var renderEngine;
var scene = null;
var indexPage = null;

$(function() {

	var original_url = location.href;
	if(Util.isSmartphoneOrTablet() == true && original_url.match(/\/sp/) == null) {
		// var match = original_url.match(/^(.*)(biohazard7|residentevil7)\/?(([^#^/]+))\/?(.*?)?$/);
		var match = original_url.match(/^(.*)(biohazard7|(?:stg\.)?residentevil7\.com)\/?(([^#^/]+))\/?(.*?)?$/);
		
		var query = "";
		if(match[5]) {
			query = match[5];
		}
		
		location.href = match[1] + match[2] + "/" + match[4] + "/sp/" + query;
		return;
	}

	indexPage = new IndexPage();

	if(typeof THREE == "undefined") {
		// THREE.js is not supported!
	}

	if(0) {

		renderEngine = new RenderEngine();
		renderEngine.initialize(document.getElementById("canvasArea"));
		scene = new MainScene(renderEngine);
		
		if(scene != null) {
			scene.setup();
			renderEngine.setActiveScene(scene);
			renderEngine.startRender();
		}
		
	}else{
		
		// WEBGL is not supported!
		
	}
	
	indexPage.initialize(scene);
})
