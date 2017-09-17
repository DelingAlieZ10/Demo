/****
 * ユーティリティクラス.
 ****/
var Util = function() {
};

Util.isSmartphoneOrTablet = function() {
	var ua = navigator.userAgent;

	var flgSp = (ua.match(/iPhone/i)!=null)
	 || (ua.match(/Android/i)!=null &&  ua.match(/Mobile/i)!=null &&  !ua.match(/SC-01C/i)!=null)
	 || (ua.match(/BlackBerry/i)!=null)
	 || (ua.match(/Windows Phone/i)!=null);

	var flgTablet = (ua.match(/iPad/i)!=null)
	 || (ua.match(/Android/i)!=null &&  (!ua.match(/Mobile/i)!=null || ua.match(/SC-01C/i)!=null));

	return (flgSp || flgTablet);
}