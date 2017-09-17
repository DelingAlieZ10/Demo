// JavaScript Document
var ga_id = "UA-53245185-8";

var ref = '';
if (location.search.indexOf('referrer=') >= 0) {
  var params = location.search.replace('?', '').split('&');
  for (var i = 0; i < params.length; i++) {
    var kv = params[i].split('=');
    if (kv.length === 2 && kv[0] === 'referrer') {
			ref = decodeURIComponent(kv[1]);
      break;
    }
  }
}


var html_ga = "<script type='text/javascript'>(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)})(window,document,'script','//www.google-analytics.com/analytics.js','ga');";
html_ga += "ga('create', '"+ ga_id +"', 'capcom.co.jp');";
html_ga += "ga('require', 'displayfeatures');";
html_ga += "ga('require', 'linkid', 'linkid.js');";
if(ref !== ""){
	html_ga += "ga('set', 'referrer', '" + ref + "');";
}
html_ga += "ga('send', 'pageview');</script>";
document.write(html_ga);