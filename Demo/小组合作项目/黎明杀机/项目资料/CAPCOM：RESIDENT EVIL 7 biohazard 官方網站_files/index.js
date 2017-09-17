
// 文字コード UTF-8.
var IndexPage = function() {
	this._mainScene = null;
	this._currentPage = IndexPage.Page.Top;
	this._isTransition = false;
	
	// Page counter.
	this._sectionIndex = 0;
	this._sectionMaxIndex = 0;

	// Video.
	this._videoSources = ["top", "top2"];
	this._videos = [];
	this._video = null;
	this._videoLoadedCount = 0;
	this._currentVideoIndex = 0;
	
	// Audio.
	this._audio = null;
	this._audioVolume = 1;
	
	// Sound state.
	this._isMute = false;
	
	// First view reserved navi.
	this._reservedNavi = null;
	
	// Hashchange que.
	this._hashChangedQue = [];

	// Video enable flag.
	this._videoEnabled = false;

	this._videoForceStopped = false;
	this._ignoreVideoPauseClick = false;

	// Jump and scroll.
	this._scrollToQue = [];

	// Date of release.
	this._dateOfRelease = "2017026";

	// Is animating countdonw.
	this._isAnimatingCountdown = false;
};

IndexPage.HeaderHeight = 30;

IndexPage.FadeOutDuration = 500;
IndexPage.FadeInDuration = 500;

IndexPage.Page 			= {};
IndexPage.Page.Top 		= 0;
IndexPage.Page.About 	= 10;
IndexPage.Page.Media 	= 20;
IndexPage.Page.Ambassador = 30;
IndexPage.Page.Demo 	  = 40;
IndexPage.Page.System 	  = 50;
IndexPage.Page.Products   = 60;
IndexPage.Page.Dlc 	  = 70;

IndexPage.PageIndices = {};
IndexPage.PageIndices["top"] 		= IndexPage.Page.Top;
IndexPage.PageIndices["about"] 		= IndexPage.Page.About;
IndexPage.PageIndices["media"] 		= IndexPage.Page.Media;
IndexPage.PageIndices["ambassador"] = IndexPage.Page.Ambassador;
IndexPage.PageIndices["demo"] 		= IndexPage.Page.Demo;
IndexPage.PageIndices["system"] 	= IndexPage.Page.System;
IndexPage.PageIndices["products"] 	= IndexPage.Page.Products;
IndexPage.PageIndices["dlc"] 		= IndexPage.Page.Dlc;

IndexPage.PageArticles = {};
IndexPage.PageArticles[IndexPage.Page.Top] 		= null;
IndexPage.PageArticles[IndexPage.Page.About] 	= null;
IndexPage.PageArticles[IndexPage.Page.Media] 	= null;
IndexPage.PageArticles[IndexPage.Page.Ambassador] = null;
IndexPage.PageArticles[IndexPage.Page.Demo] 	= null;
IndexPage.PageArticles[IndexPage.Page.System] 	= null;
IndexPage.PageArticles[IndexPage.Page.Products] = null;
IndexPage.PageArticles[IndexPage.Page.Dlc] 	= null;


IndexPage.prototype.initialize = function(scene) {
	if(scene != null) {
		this._mainScene = scene;
	}
	for(var key in IndexPage.PageIndices) {
		IndexPage.PageArticles[IndexPage.PageIndices[key]] = $("#" + key);
	}

	// Setup video.
	this._video = $("video");
	

	var _this = this;

	// Mouse wheel event.
	$("#contents").on('mousewheel', function(event) {

		// 遷移中は何もさせない.
		if(_this._isTransition) {
			return false;
		}

		// MediaページとAboutページの場合は何もさせない.
		//if(_this._currentPage == IndexPage.Page.Media || _this._currentPage == IndexPage.Page.About) {
		{
			return true;
		}

		// 上向きスクロールでscrollTopが0でない場合は普通にスクロールさせる.
		var scrollTop = $(window).scrollTop();
		if(scrollTop > 0 && event.deltaY >= 0) {
			return true;
		}

		// スクロールがキャッチ出来たかどうかのフラグ.
		var canCatchScroll = true;

		if(event.deltaY < 0) {
			canCatchScroll = _this.nextSection();
		}else{
			canCatchScroll = _this.prevSection();
		}

		return !canCatchScroll;
	});

	$("#pause").on("click", function() {
		_this.unPause.call(_this);
	});

	// Window blur event.
	$(window).on("blur",function(){
		_this.pause.call(_this);
	});

	// Window blur event.
	$(window).on("focus",function(){
		_this.unPause.call(_this);
		_this._ignoreVideoPauseClick = true;
		setTimeout(function() {
			_this._ignoreVideoPauseClick = false;
		}, 500)

	});

	if(1) {
		// Start video preloading.
		for(var ii=0;ii<this._videoSources.length;ii++) {
			var videoTag = $(document.createElement('video'));

			var sourceTagWebm = $(document.createElement('source'));
			sourceTagWebm.attr("src", "../assets/video/" + this._videoSources[ii] + ".webm");

			var sourceTag = $(document.createElement('source'));
			sourceTag.attr("src", "../assets/video/" + this._videoSources[ii] + ".mp4");

			videoTag.append(sourceTag);
			videoTag.append(sourceTagWebm);
			videoTag.attr("preload", "auto");
			videoTag.on("loadeddata", function() {

				_this._videoLoadedCount++;
				var percentage = Math.ceil(_this._videoLoadedCount / (_this._videoSources.length + 1) * 100);
				$("#loader-percentage").text(percentage);
				if(_this._videoLoadedCount == _this._videoSources.length) {

					// Start audio preloading.
					_this._audio = $(document.createElement('audio'));
					_this._audio.attr("src", "../assets/audio/bgm2.mp3");
					_this._audio.attr("preload", "auto");
					_this._audio.attr("loop", "true");
					_this._audio.on("loadeddata", function(){
						$("#loader-percentage").text(100);
						_this.loadDataComplete();
					});

				}

			});


			this._videos.push(videoTag);
		}
	}else{
		// Audio preloading.
		$("#loader-percentage").text(100);
		// Start audio preloading.
		_this._audio = $(document.createElement('audio'));
		_this._audio.attr("src", "../assets/audio/bgm2.mp3");
		_this._audio.attr("preload", "auto");
		_this._audio.attr("loop", "true");
		_this._audio.on("loadeddata", function(){
			$("#loader-percentage").text(100);
			_this.loadDataComplete();
		});
	}


	// Sound button.
	$(".sound").on("click", function() {
		_this._isMute = !_this._isMute;
		_this.updateMuteStatus();
	});

	// Update sound state from cookie.
	var muteState = $.cookie('bio7_sound_state');
	if(muteState != null) {
		if(muteState == "false") {
			_this._isMute = false;
		}else{
			_this._isMute = true;
		}
		_this.updateMuteStatus();
	}

	// Decide first view page.
	var hashStr = location.hash;
	if(hashStr != "") {
		hashStr = hashStr.substr(2).replace(/\?.+$/, "");
		for(var key in IndexPage.PageIndices) {
			if(key == hashStr) {
				var targetNavi = $("#wrapper nav ul li a[data-id="+key+"]");
				if(targetNavi.length == 1) {
					this._reservedNavi = targetNavi;
				}
			}
		}
	}else{
		this.updateHash("top");
	}

	// Video thumbnail button.
	$(".btnVideo").on("click", function() {
		_this.pause();
	});

	// Hash change event.
	$(window).on("hashchange", function(e) {

		var hashStr = location.hash;
		if(hashStr != "") {
			hashStr = hashStr.substr(2).replace(/\?.+$/, "");
			for(var key in IndexPage.PageIndices) {
				if(key == hashStr) {
					var targetNavi = $("#wrapper nav ul li a[data-id="+key+"]");
					if(targetNavi.length == 1) {
						//_this.navigationClick(targetNavi);
						_this._hashChangedQue.push(targetNavi);
					}
				}
			}
		}

	});

	setInterval(function() {
		if(_this._hashChangedQue.length > 0) {

			// 最後の要素を取得する.
			var naviElem = _this._hashChangedQue[_this._hashChangedQue.length - 1];
			if(_this.navigationClick(naviElem)) {
				_this._hashChangedQue.pop();
			}
		}
	}, 500);

	// Shoplink buttons.
	$("#linkPs4,#linkXbox,#linkWin,#linkSteam").on("click", function() {
		var id_str = $(this).attr("id").replace(/link/, "buy");

		if($("#" + id_str).find(".lead").length == 0) {
			return false;
		}

		_this.removeSelectClassShopLink();
		_this.hideShopLinkDiv();
		$(this).addClass("select");
		$("#" + id_str).addClass("boxSelect");
	})

	// MainTop area click.
	$("#mainTop").on("click", function() {
		if(_this._ignoreVideoPauseClick) {
			return false;
		}

		if(_this._video[0]) {
			if(_this._video[0].paused) {
				_this._video[0].play();
			}else{
				_this._video[0].pause();
			}

			_this._videoForceStopped = _this._video[0].paused;
		}
	})

}



IndexPage.prototype.removeSelectClassShopLink = function() {
	$("#linkPs4,#linkXbox,#linkWin,#linkSteam").removeClass("select");
}

IndexPage.prototype.hideShopLinkDiv = function() {
	$("#buyPs4,#buyXbox,#buyWin,#buySteam").removeClass("boxSelect");
}


IndexPage.prototype.loadDataComplete = function() {
	var _this = this;
	$("#load_cover .loaderInner .img img").fadeOut();
	setTimeout(function() {
		_this.start();
	}, 1000);

}

IndexPage.prototype.start = function() {
	if(this._isMute) {
		this._audio[0].muted = true;
	}

	// Check is there reserved navi.
	if(this._reservedNavi != null) {
		// if(this._reservedNavi.data("id") == "top") {
		this._audio[0].play();
		// }
		IndexPage.FadeOutDuration = 10;
		this.navigationClick(this._reservedNavi[0]);
		IndexPage.FadeOutDuration = 500;
	}else{
		this._audio[0].play();
	}
	
	$("#load_cover").fadeOut();
	
}


IndexPage.prototype.updateMuteStatus = function() {

	if(this._isMute) {
		$(".sound a").addClass("off");
		if(this._videoEnabled && this._video[0]) {
			this._video[0].muted = true;
		}
		if(this._audio){
			this._audio[0].muted = true;
		}
	}else{
		$(".sound a").removeClass("off");
		if(this._videoEnabled && this._video[0]) {
			//this._video[0].muted = false;
		}
		if(this._audio){
			this._audio[0].muted = false;
		}
	}

	// Save sound state to cookie.
	$.cookie('bio7_sound_state',this._isMute , { expires:9999, path: '/' });
}


IndexPage.prototype.playNextVideo = function(requestedPage) {

	var _this = this;
	$("#canvasArea").empty();
	this._video = this._videos[this._currentVideoIndex];
	$("#canvasArea").append(this._video);
	this._video[0].load();
	
	this._video.on("loadeddata", function() {
		_this._video.show();
		_this._video[0].muted = true; //_this._isMute;
		_this._video[0].play();
		_this._video.off("ended");
		_this._video.on("ended", function() {
			// _this._currentVideoIndex = Math.floor(Math.random() * 8);
			_this._currentVideoIndex = ++_this._currentVideoIndex % (_this._videos.length);
			_this.playNextVideo(requestedPage);
		});

		// 最後のVIDEOはDEMO用になる.
		// _this._currentVideoIndex = ++_this._currentVideoIndex % (_this._videos.length);

	});
}

IndexPage.prototype.pause = function() {

	// Stop webgl.
	if(this._mainScene != null) {
		this._mainScene._renderEngine.stopRender();
	}

	// Stop video.
	if(this._video[0]) {
		this._video[0].pause()
	}

	// Stop Audio.
	if(this._audio) {
		this._audio[0].pause();
	}

	$("#pause").show();

}


IndexPage.prototype.unPause = function() {

	// Resume webgl.
	if(this._mainScene != null && this._currentPage == IndexPage.Page.Top) {
		this._mainScene._renderEngine.startRender();
	}

	// Resume video.
	if(this._currentPage == IndexPage.Page.Top) {
		// Play video.
		if(!this._videoForceStopped && this._video[0] && this._video[0].ended == false) {
			this._video[0].play()
		}
	}
	// Resume audio.
	// else{
	this._audio[0].play();
	// }

	$("#pause").hide();

}

IndexPage.prototype.updateHash = function(id_str) {
	location.hash = "_" + id_str;
}

IndexPage.prototype.setActiveNavigationMenu = function(id_str) {
	$("nav li").removeClass("current");
	var targetATag = $("a[data-id=" + id_str + "]");
	if(targetATag) {
		targetATag.parent().addClass("current");
	}
}

IndexPage.prototype.setRightNaviCount = function(page) {

	if(!IndexPage.PageArticles[page]) {
		return false;
	}
	var _this = this;
	var count = IndexPage.PageArticles[page].find("section").length;

	// ナビが1つだけになる場合、Topページの場合は非表示にする.
	if(count == 1 || page == IndexPage.Page.Top) {
		$("#scrollNav").fadeOut();
	}else{
		$("#scrollNav").fadeIn();
	}

	// 表示するページがMediaの場合は非表示にする.
	//if(page == IndexPage.Page.Media || page == IndexPage.Page.About) {
	{
		$("#scrollNav").hide();
	}

	// 右ナビを追加する.
	if(count > 1) {
		$("#scrollNav ul").empty();
		for(var ii=0;ii<count;ii++) {
			var li = $(document.createElement('li'));
			li.data("index", ii);

			// 最初の1つ目を有効にしておく.
			if(ii == 0) {
				li.addClass("act");
			}

			// クリックで該当セクションへjump..
			li.on("click", function() {
				_this.gotoSection($(this).data("index"));
			});

			$("#scrollNav ul").append(li);
		}
	}

	this._sectionMaxIndex = count - 1;
}

IndexPage.prototype.initializeRightNavi = function(page) {

	var count = this.setRightNaviCount(page);
	this._sectionIndex = 0;

}

IndexPage.prototype.hideAllContents = function() {
	$("#contents article").hide()
	$("#contents article").css("opacity", 0)
}

IndexPage.prototype.showLoading = function() {
	$("#load_cover").show();
}

IndexPage.prototype.hideLoading = function() {
	$("#load_cover").hide();
}


IndexPage.prototype.navigationClick = function(elm) {
	var _this = this;

	if(this._isTransition) {
		return false;
	}

	var id_str = $(elm).data("id");
	var requestedPage = IndexPage.PageIndices[id_str];

	// ナビ更新.
	this.setActiveNavigationMenu(id_str);
	this.initializeRightNavi(requestedPage);
	this.updateHash(id_str);

	// 現在閲覧中のページと同じなら何もしない.
	if(this._currentPage == requestedPage) {

		// 初回表示でTOPページの場合は動画再生.
		if(_this._video.find("source").length == 0 && requestedPage == IndexPage.Page.Top) {
			_this.playNextVideo(requestedPage);
		}

		return true;
	}

	// GA通知.
	var currentLanguage = agegate.languageFromUrl(location.href);
	ga('send', 'pageview', '/' + currentLanguage + '/' + id_str + '/');

	this._isTransition = true;

	// Top表示中ならScene, BGMを止める.
	if(this._currentPage == IndexPage.Page.Top && this._mainScene != null) {
		this._mainScene._renderEngine.stopRender();
	}
	// Top以外表示中でTop指定ならScene, BGMを再生させる.
	if(requestedPage == IndexPage.Page.Top && this._mainScene != null) {
		this._mainScene._renderEngine.startRender();
		/*
		 this._audio[0].currentTime = 0
		 this._audio[0].play();
		 */
	}

	// 初回表示時で、Top以外指定なら、Topは予め非表示にしておく.
	if(requestedPage != IndexPage.Page.Top && this._reservedNavi != null && this._reservedNavi.data("id") != "top") {
		$("#top").css("opacity", 0);
		this._reservedNavi = null;
	}


	// オーディオボリュームのフェード.
	/*
	 if(requestedPage == IndexPage.Page.Demo) {
	 $(this._audio[0]).animate({volume: 0});
	 }else{
	 $(this._audio[0]).animate({volume: 1});
	 }
	 */
	if(1) {
		$("#canvasArea video").fadeOut(IndexPage.FadeOutDuration);
	}
	IndexPage.PageArticles[this._currentPage].animate({opacity:0}, IndexPage.FadeOutDuration, function() {

		IndexPage.PageArticles[_this._currentPage].hide();
		_this.hideAllContents();

		if(requestedPage == IndexPage.Page.Top) {
			$("#contents").hide();
		}else{
			$("#contents").show();

			// MediaページとAboutページの場合は#contentsのheightをautoにする.
			if(requestedPage == IndexPage.Page.Media || requestedPage == IndexPage.Page.About || requestedPage == IndexPage.Page.Dlc || requestedPage == IndexPage.Page.Products || requestedPage == IndexPage.Page.Demo || requestedPage == IndexPage.Page.System) {
				$("#contents").css("height", "auto");
			}else{
				$("#contents").css("height", $(window).height() - IndexPage.HeaderHeight);
			}

			IndexPage.PageArticles[requestedPage].find("section").hide();
			$(IndexPage.PageArticles[requestedPage].find("section").get(0)).show();
		}

		IndexPage.PageArticles[requestedPage].show();
		IndexPage.PageArticles[requestedPage].animate({opacity: 1}, IndexPage.FadeInDuration);

		// ビデオを再生させる.
		// Topページ指定の場合は再生しない.
		// Topページの場合のみ再生へ変更 2017-01-10.
		// if(requestedPage != IndexPage.Page.Top) {
		if(requestedPage == IndexPage.Page.Top) {
			// if(_this._videoEnabled) {
			if(1) {
				_this.playNextVideo(requestedPage);
			}
		}else{
			if(_this._video[0]) {
				_this._video[0].pause()
			}

			if(_this._mainScene) {
				_this._mainScene.onWindowResizeHandler()
			}
		}

		if(1) {
			$("#canvasArea video").fadeIn(IndexPage.FadeInDuration);
		}

		_this._currentPage = requestedPage;
		_this._isTransition = false;

		// Top表示指定の場合はnewsSliderをredrawする.
		// Top表示指定の場合は<nav>に.fixed付ける.
		if(requestedPage == IndexPage.Page.Top) {
			if(newsSlider.length > 0) {
				newsSlider.redrawSlider()
			}
			$("nav").removeClass("fixed");
		}else{
			$("nav").addClass("fixed");
		}

		// Media表示指定の場合はmediaSliderをredrawする.
		if(requestedPage == IndexPage.Page.Media) {
			if(mediaSlider.length > 0) {
				mediaSlider.redrawSlider();
			}
		}
				
		// スクロール位置を先頭にする.
		//  スクロール位置指定がある場合は優先する 20161220.
		if(_this._scrollToQue.length > 0) {
			var que = _this._scrollToQue.splice(0, 1);
			if($(que[0]).length > 0) {
				var top = $(que[0]).offset().top;
				$(window).scrollTop(top);
			}

		}else{
			$(window).scrollTop(0);
		}

		// About表示時にLazy効果を付与する.
		if(requestedPage == IndexPage.Page.About) {
			$("#about .inner").removeClass("lazyAnimated");
			setUpLazy();
			$("#about .lazy, #about .lazyStep").css("opacity", 0);
		}

		if(requestedPage == IndexPage.Page.System) {
			$("#system .inner").removeClass("lazyAnimated");
			setUpLazy();
			$("#system .lazy, #system .lazyStep").css("opacity", 0);
		}

	});

	return true;
}


IndexPage.prototype.nextSection = function() {

	if(this._isTransition) {
		return false;
	}

	if(this._sectionIndex == this._sectionMaxIndex) {
		return false;
	}

	this._isTransition = true;

	var currentArticle = IndexPage.PageArticles[this._currentPage];
	var currentSection = $(currentArticle.find("section").get(this._sectionIndex));
	var nextSection    = $(currentArticle.find("section").get(this._sectionIndex + 1));


	var _this = this;
	_this.updateActiveRightNavi(this._sectionIndex + 1);
	currentSection.fadeOut(IndexPage.FadeOutDuration, function() {
		nextSection.fadeIn(IndexPage.FadeInDuration, function() {
			_this._isTransition = false;
			_this._sectionIndex++;
		});
		_this.beforeChangeSection(_this._sectionIndex + 1);

	});

	return true;
}


IndexPage.prototype.prevSection = function() {

	if(this._isTransition) {
		return false;
	}

	if(this._sectionIndex == 0) {
		return false;
	}

	this._isTransition = true;

	var currentArticle = IndexPage.PageArticles[this._currentPage];
	var currentSection = $(currentArticle.find("section").get(this._sectionIndex));
	var nextSection    = $(currentArticle.find("section").get(this._sectionIndex - 1));



	var _this = this;
	_this.updateActiveRightNavi(this._sectionIndex-1);
	currentSection.fadeOut(IndexPage.FadeOutDuration, function() {
		nextSection.fadeIn(IndexPage.FadeInDuration, function() {
			_this._isTransition = false;
			_this._sectionIndex--;
		});
		_this.beforeChangeSection(_this._sectionIndex - 1);

	});

	return true;
}

IndexPage.prototype.gotoSection = function(index) {

	if(this._isTransition) {
		return false;
	}

	if(index < 0 || index > this._sectionMaxIndex) {
		return false;
	}

	this._isTransition = true;

	var currentArticle = IndexPage.PageArticles[this._currentPage];
	var currentSection = $(currentArticle.find("section").get(this._sectionIndex));
	var nextSection    = $(currentArticle.find("section").get(index));

	var _this = this;
	_this.updateActiveRightNavi(index);
	currentSection.fadeOut(IndexPage.FadeOutDuration, function() {
		nextSection.fadeIn(IndexPage.FadeInDuration, function() {
			_this._isTransition = false;
			_this._sectionIndex = index;
		});

		_this.beforeChangeSection(index);
	});

	return true;
}

IndexPage.prototype.beforeChangeSection = function(sectionIndex) {
	if(this._currentPage == IndexPage.Page.Media && sectionIndex == 1) {
		if(mediaSlider.length > 0) {
			mediaSlider.redrawSlider();
		}
	}
}

IndexPage.prototype.updateActiveRightNavi = function(index) {
	$("#scrollNav li").removeClass("act");
	$($("#scrollNav li").get(index)).addClass("act");
}


IndexPage.prototype.jumpAndScroll = function(hash, scrolToId) {
	location.hash = hash;
	this._scrollToQue.push(scrolToId);

	return false;
}