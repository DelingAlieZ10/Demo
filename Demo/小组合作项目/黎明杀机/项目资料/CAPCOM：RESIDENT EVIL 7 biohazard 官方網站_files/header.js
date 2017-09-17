// JavaScript Document
		var url_in_fb = 'http://residentevil7.com/';
		var url_in_goo = 'http://residentevil7.com/';
		var txt_in_tw = 'CAPCOM%EF%BC%9AResident%20Evil%207%20biohazard%E3%80%80%20http%3a%2f%2fresidentevil7%2ecom%2f';
		var header_html = '<p id="capcom_logo"><a href="http://www.capcom.com/"><img src="http://www.capcom.co.jp/common/logo/tmp/capcom_c_f.png" width="106" height="20" alt="CAPCOM" /></a></p>';


		header_html += '<div class="hMenu">';

		header_html += '<p class="sound"><a href="javascript:void(0);">SOUND</a></p>';

		header_html += '<span id="language">';
		header_html += '<select name="global_sel" class="global_sel" onchange="changeGlobalMenu(this);">';
		header_html += '	<option value="select" selected>Select Language</option>';
		header_html += '	<option value="us">English（US）</option>';
		header_html += '	<option value="uk">English（UK）</option>';
		header_html += '	<option value="fr">French</option>';
		header_html += '	<option value="it">Italian</option>';
		header_html += '	<option value="de">German</option>';
		header_html += '	<option value="es">Spanish</option>';
		header_html += '	<option value="tw">繁體中文</option>';
		header_html += '	<option value="kr">한국어</option>';
		header_html += '</select>';
		header_html += '</span>';


		//google.plus.one
		header_html += '<script type="text/javascript" src="http://www.capcom.co.jp/common/js/google.plusone.js"></script>\n';
		
		
		//twitter
		header_html += '<div id="share"><ul id="snsbtn" class="clearfix"><li><a href="http://twitter.com/intent/tweet?text=' + txt_in_tw + '" target="_blank" onclick="ga(&#39;send&#39;, &#39;event&#39;, &#39;tw&#39;, &#39;share&#39;, &#39;pc&#39;)"><img src="http://www.capcom.co.jp/common/logo/tmp/twitter_b.png" width="22" height="22" alt="Twitter"></a></li>';
		
		//facebook
		header_html += '<li><a href="http://www.facebook.com/share.php?u=' + url_in_fb + '" target="_blank" onclick="ga(&#39;send&#39;, &#39;event&#39;, &#39;fb&#39;, &#39;share&#39;, &#39;pc&#39;)"><img src="http://www.capcom.co.jp/common/logo/tmp/facebook_b.png" width="22" height="22" alt="Facebook"></a></li>';
		
		//google+1
		header_html += '<li><a href="https://plus.google.com/share?url=' + url_in_goo + '" target="_blank" onclick="ga(&#39;send&#39;, &#39;event&#39;, &#39;goo&#39;, &#39;share&#39;, &#39;pc&#39;)"><img src="http://www.capcom.co.jp/common/logo/tmp/googleplus_b.png" width="22" height="22" alt="Share on Google+"></a></li>';
				
		header_html += '</ul></div>';

document.write(header_html);













