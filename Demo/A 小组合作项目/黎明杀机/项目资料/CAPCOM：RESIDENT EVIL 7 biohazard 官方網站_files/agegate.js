
var AgeGate = function() {

	this._notAgeLanguage = ['ja', 'kr', 'tw', 'cn'];
	this._languageSelectElement = null;
	this._isCookieValuePrimary = false;

}

AgeGate.UnderAge = 17;

AgeGate.Languages = ['ja', 'us', 'uk', 'fr', 'it', 'de', 'es', 'tw', 'kr'];

AgeGate.LanguageIndexHash = {
	"us":1,
	"uk":2,
	"en":1,
	"en-us":1,
	"en-gb":2,
	"fr":3,
	"it":4,
	"de":5,
	"es":6,
	"zh":7,
	"tw":7,
	"ko":8,
	"kr":8,
	"ja":9,
};

AgeGate.replaceNumber = function(num){
	return num.replace(/[０-９]/g, function(s) {
		return String.fromCharCode(s.charCodeAt(0) - 0xFEE0);
	});
}

AgeGate.prototype.birthCheck = function(birth){
	"use strict";
	var today = new Date();
	var today_n = parseInt(String(today.getFullYear()) + ("0" + (today.getMonth() + 1)).slice(-2) + ("0" + today.getDate()).slice(-2));
	var age = parseInt((today_n - birth) / 10000);

	if(age >= AgeGate.UnderAge){
		return true;
	}else{
		return false;
	}
}


AgeGate.prototype.browserLanguage = function() {
  var ua = window.navigator.userAgent.toLowerCase();
  var res = "";
  try {
    // chrome
    if( ua.indexOf( 'chrome' ) != -1 ){
      res = ( navigator.languages[0] || navigator.browserLanguage || navigator.language || navigator.userLanguage).toLowerCase();//.substr(0,2);
    }
    // それ以外
    else{
      res = ( navigator.browserLanguage || navigator.language || navigator.userLanguage).toLowerCase();//.substr(0,2);
    }
  }
  catch( e ) {
    res = undefined;
  }
  
  if(res.match(/^en/) == null) {
	res = res.substr(0,2);
  }
  
  return res;
}

AgeGate.prototype.languageFromUrl = function(url) {

	if(url == null || typeof url == "undefined" || url == "") {
		return "";
	}

	// Remove hash.
	url = url.replace(/#.+$/, "");

	// Detect language from url.
	var m = url.match(/(biohazard7|(?:stg\.)?residentevil7\.com)\/(?:sp\/)?((?!sp)[^\/\?]+)/);
	if(m != null && m[2] != undefined && m[2] != "") {
		return m[2];
	}
	
	return "";
}

AgeGate.prototype.selectedLanguage = function() {
	
	// Cookieにリダイレクト先が入ってたらそこから取得する.
	if(this._isCookieValuePrimary) {
		var cookie_language = this.languageFromUrl($.cookie("bio7_agegate_wanturl"));

		if(cookie_language != "") {
			return cookie_language;
		}
	}
	
	if(this._languageSelectElement) {
		return $(this._languageSelectElement).val();
	}
	
	if(this.languageFromUrl(location.href)) {
		//console.log("languageFromLocationHref", this.languageFromUrl(location.href));
		return this.languageFromUrl(location.href);
	}
	
	return "";
}


AgeGate.prototype.languageIndex = function() {
	var language = this.browserLanguage();

	// Cookieにリダイレクト先が入ってたらそこから取得する.
	if(this._isCookieValuePrimary) {
		var cookie_language = this.languageFromUrl($.cookie("bio7_agegate_wanturl"));
		if(cookie_language != "") {
			language = cookie_language;
		}
	}

	for(var languageKey in AgeGate.LanguageIndexHash) {
		if(language == languageKey) {
			return AgeGate.LanguageIndexHash[languageKey];
		}
	}

	return 0;
}


AgeGate.prototype.isNotAgeLanguage = function(language) {
	
	if(typeof language == "undefined") {
		language = this.selectedLanguage();
	}
	for(var ii=0;ii<this._notAgeLanguage.length;ii++) {
		if(language == this._notAgeLanguage[ii]) {
			return true;
		}
	}
	
	return false;
}


AgeGate.prototype.bindEvents = function() {
	var _this = this;
	
	$("select[name=language_sel]").on("change", function() {
		_this.updateBirthDateState();
		var res = _this.determineEnterButtonState();
		_this.setIsActiveEnter(res);
	});
	
	$("#enter").on("click", function() {
		_this.onClickEnter();
	});
	
	$("#enter_gro").on("click", function() {
		_this.onClickEnterGro();
	});
	
	$("#year").on("keyup", function() {
		var res = _this.determineEnterButtonState();
		_this.setIsActiveEnter(res);
	});

	$("#month").on("keyup", function() {
		var res = _this.determineEnterButtonState();
		_this.setIsActiveEnter(res);
	});

	$("#day").on("keyup", function() {
		var res = _this.determineEnterButtonState();
		_this.setIsActiveEnter(res);
	});
}



/*******************************************************
 * Etner button click handler.
 *******************************************************/
AgeGate.prototype.onClickEnter = function() {
	
	// Enterボタンをクリックしてもいい状況か確認する.
	var res = this.determineEnterButtonState();
	if(!res) {
		this.setIsActiveEnter(false);
		return false;
	}

	// 年齢認証.
	var ageCheckState = this.checkPassAge();

	// Cookieへ保存.
	$.cookie('bio7_agegate_birth', ageCheckState.birthday, { expires:9999, path: '/' });
	$.cookie('bio7_agegate_language', this.selectedLanguage(), { expires:9999, path: '/' });
	$.cookie('bio7_agegate_passed', true, { expires:9999, path: '/' });

	if(this.isNotAgeLanguage() || ageCheckState.state) {

		// 該当言語のURLへ飛ばす.
		this.jumpNext();

	}else{

		$('#language').hide();
		$("#age_form").hide();
		$("#enter").hide();
		$("#enter_gro").hide();
		$("#enter_none").hide();
		$("#under").show();

	}

	return false;
}


AgeGate.prototype.checkPassAge = function(params) {

	if(typeof params == "undefined") {
		params = {};
	}

	// 年齢チェック.
	var inYear = $('input#year').val();
	if(params.birthYear) {
		inYear = params.birthYear;
	}
	inYear = AgeGate.replaceNumber(String(inYear));

	var inMonth = $('input#month').val();
	if(params.birthMonth) {
		inMonth = params.birthMonth;
	}
	inMonth = AgeGate.replaceNumber(String(inMonth));

	var inDate = $('input#date').val();
	if(params.birthDate) {
		inDate = params.birthDate;
	}
	inDate = AgeGate.replaceNumber(String(inDate));

	var birthday = inYear + ("0" + inMonth).slice(-2) + ("0" + inDate).slice(-2);

	return {birthday:birthday, state:this.birthCheck(birthday)};
}


AgeGate.prototype.determineEnterButtonState = function() {
	var enterBtn = true;
	var lang     = this.selectedLanguage();

	if(lang === '' || lang === 'select'){
		// language：なし
		enterBtn = false;
	}else if(this.isNotAgeLanguage()){
		// language：認証なし
		enterBtn = (enterBtn) ? true : false;
	}else if(lang !== '' && lang !== 'select'){
		// language：認証あり

		// 誕生日確認（日付チェック&桁数チェック）
		var yearVal = $('input#year').val();
		yearVal = AgeGate.replaceNumber(yearVal);
		
		var monthVal = $('input#month').val();
		monthVal = AgeGate.replaceNumber(monthVal);
		
		var dateVal = $('input#date').val();
		dateVal = AgeGate.replaceNumber(dateVal);
		
		var chkDate = new Date(yearVal + '/' + monthVal + '/' + dateVal);
		
		if(yearVal.length === 4 && monthVal.length <= 2 && dateVal.length <= 2 ){
			enterBtn = (enterBtn) ? true : false;
		}else{
			enterBtn = false;
		}
		if(chkDate.getFullYear() != yearVal || chkDate.getMonth() != monthVal-1 || chkDate.getDate() != dateVal){
			// 正しい日付でない
			enterBtn = false;
		}else{
			// 正しい日付
			enterBtn = (enterBtn) ? true : false;
		}
	}

	return enterBtn;
}

AgeGate.prototype.setIsActiveEnter = function(isActive) {
	
	if(isActive) {
		$("#enter").show();
		$("#enter_none").hide();
		
	}else{
		$("#enter").hide();
		$("#enter_none").show();
		$("#enter_gro").hide();
	}
}

AgeGate.prototype.updateBirthDateState = function(language) {

	// Age gateが必要な言語か判定.
	var isNotAgeLanguage = this.isNotAgeLanguage(language);
	if(!isNotAgeLanguage && this.selectedLanguage() != "select") {
		$("#age_form").show();
	}else{
		$("#age_form").hide();
		this.setIsActiveEnter(true);
	}

}

AgeGate.prototype.restoreSelectedFromCookie = function() {
	var birth    = $.cookie('bio7_agegate_birth');
	var language = $.cookie('bio7_agegate_language');
	var isRestored = {birth:false, lang:false, birthYear:-1, birthMonth:-1, birthDate:-1, lang_str: ""};

	// 生年月日復元.
	if(birth && birth.length == 8) {
		$('input#year').val(birth.substr(0,4));
		$('input#month').val(birth.substr(4,2));
		$('input#date').val(birth.substr(6,2));

		isRestored.birthYear  = birth.substr(0,4);
		isRestored.birthMonth = birth.substr(4,2);
		isRestored.birthDate  = birth.substr(6,2);
		isRestored.birth = true;
	}
	
	// 言語.
	if(language) {
		for(var ii=0;ii<AgeGate.Languages.length;ii++) {
			if(language == AgeGate.Languages[ii]) {
				//this.setActiveLanguageSelect(language);
				isRestored.lang = true;
				isRestored.lang_str = language;
				break;
			}
		}
	}


	if( this.languageFromUrl(location.href) != "" && isRestored.lang_str != this.languageFromUrl(location.href)) {
		isRestored.lang_str = this.languageFromUrl(location.href);
		$.cookie('bio7_agegate_language', isRestored.lang_str, { expires:9999, path: '/' });
	}

	
	return isRestored;

}


AgeGate.prototype.setActiveLanguageSelect = function(lang) {
	
	if(!this._languageSelectElement) {
		return false;
	}

	for(var ii=0;ii<this._languageSelectElement.options.length;ii++) {
		if(lang == this._languageSelectElement.options[ii].value) {
			agegate._languageSelectElement.selectedIndex = ii;
			break;
		}
	}

}

AgeGate.prototype.initialize = function() {

	// Eventのbind.
	this.bindEvents();

	// Agegateを一度も通していない場合は必ず表示.
	var isAgegatePassed = $.cookie('bio7_agegate_passed');
	if(!isAgegatePassed) {
		if(this.languageFromUrl(location.href) != "") {
			this.jumpToAgeGate();
		}
	}

	// Cookieの値を優先開始.
	this._isCookieValuePrimary = true;

	// Selectの初期選択.
	this._languageSelectElement = $("select[name=language_sel]")[0];
	if(this._languageSelectElement) {
		this._languageSelectElement.selectedIndex = this.languageIndex();
		this.updateBirthDateState();
		var res = this.determineEnterButtonState();
		this.setIsActiveEnter(res);
	}

	// Cookieから復元.
	var restoresState = this.restoreSelectedFromCookie();

	// Cookieから復元済み.
	if(restoresState.lang) {

		var ageCheckState = this.checkPassAge(restoresState);

		if(this.isNotAgeLanguage(restoresState.lang_str) == false && !ageCheckState.state) {
			
			/**********
			 * Cookieから復元完了したが、エイジゲートの表示が必要な場合.
			 **********/
			if(this._languageSelectElement) {

				if( restoresState["birthYear"] != "-1" && restoresState["birthMonth"] != "-1" && restoresState["birthDate"] != "-1" ) {
					$('#language').hide();
					$("#age_form").hide();
					$("#enter").hide();
					$("#enter_none").hide();
					$("#enter_gro").hide();
					$("#under").show();
				}

			}else{
				
				this.jumpToAgeGate();
			}

			// Cookieの値を優先終了.
			this._isCookieValuePrimary = false;
			
			return false;
		}else{

			// 該当言語のURLへ飛ばす.
			if(isAgegatePassed){
				this.jumpNext(restoresState.lang_str);
			}
		}
	}else{

		// Cookieの値を優先終了.
		this._isCookieValuePrimary = false;

		this.jumpToAgeGate();
	}


	// Cookieの値を優先終了.
	this._isCookieValuePrimary = false;

}

AgeGate.prototype.jumpNext = function(language) {
	if(this._languageSelectElement) {
		
		// check cookie redirect url.
		var cookie_language = this.languageFromUrl($.cookie("bio7_agegate_wanturl"));
		if(cookie_language == this.selectedLanguage()) {
			var redirect_url = $.cookie("bio7_agegate_wanturl");
			if(redirect_url != "") {
				$.cookie('bio7_agegate_wanturl', "", { expires:9999, path: '/' });
				location.href = redirect_url;
				return;
			}
		}
		
		// If language is ja then.
		if(typeof language == "undefined") {
			language = this.selectedLanguage();
		}
		if(language == "ja") {
			$.cookie('bio7_agegate_wanturl', "", { expires:9999, path: '/' });
			location.href = 'http://www.capcom.co.jp/biohazard7/';
			return;
		}else{
			$.cookie('bio7_agegate_wanturl', "", { expires:9999, path: '/' });
			var redirect_url = './' + language;
			if(Util.isSmartphoneOrTablet()) {
				redirect_url += '/sp';
			}
			location.href = './' + redirect_url + '/index.html';
			return;
		}
	}
}



AgeGate.prototype.jumpToAgeGate = function() {

	if(typeof ROOT_PATH != "undefined") {
		// save redirect url to cookie.
		$.cookie('bio7_agegate_wanturl', location.href, { expires:9999, path: '/' });
		location.href = "/?agegate=true";
	}
	else if(!this._languageSelectElement) {
		// save redirect url to cookie.
		$.cookie('bio7_agegate_wanturl', location.href, { expires:9999, path: '/' });
		location.href = './';
	}
}

var agegate;

$(function() {

	agegate = new AgeGate();
	agegate.initialize();
});