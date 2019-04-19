////////////////////////////////////////////////////////////////////////////////////////
var CurrentEChartsTheme = null;
function PageLoadECharts(basePath,echartTypes,requireCallback){
	var skin = GetCookie("miniuiSkin");
	var themePath = "";
	if(skin == "wsd-tobacco-yellow") themePath = "echarts/theme/wsdyellow";
	else if(skin == "wsd-tobacco-skyblue") themePath = "echarts/theme/wsdskyblue";
	else if(skin == "wsd-tobacco-deepGreen" || skin == "wsd-tobacco-green") themePath = "echarts/theme/wsdgreen";
	else themePath = "echarts/theme/default";
	require.config({
        paths: {
            echarts:  basePath +'/pages/sdswl/echarts/js'
        }
    });
	var rs = ['echarts',themePath];
	for(var i  = 0; i < echartTypes.length; i++){
		rs.push('echarts/chart/' + echartTypes[i]);
	}
	require(
		rs,
        requireCallback
  	);
	CurrentEChartsTheme = null;
  	require([themePath], function(theme) {
  		CurrentEChartsTheme = theme;
	});
}
function GetCookie(name) {
    var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
    if (arr = document.cookie.match(reg)) {
        return unescape(arr[2]);
    }
    else {
        if (name == "wsdSessionId") {
            return GetCookie("wsdSessionIdClone");
        }
    }
    return null;
}
function SetCookie(name, value, expires, domain) {
    var LargeExpDate = new Date();
    if (expires != null) {
        LargeExpDate = new Date(LargeExpDate.getTime() + (expires * 1000 * 3600 * 24));
    }
    document.cookie = name + "=" + escape(value) + ((expires == null) ? "" : ("; expires=" + LargeExpDate.toGMTString())) + ";path=/" + (domain ? "; domain=" + domain : "");
}