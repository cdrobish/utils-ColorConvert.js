/**
 * @author Chad Drobish http://chadandrewdrobish.com/
 */

var RGBObject = function RGBObject(r,g,b){
	this.r = r;
	this.g = g;
	this.b = b;
};
var HSBObject = function HSBObject(h,s,b){
	this.h = h;
	this.s = s;
	this.b = b;
};

var ColorConvert = {};

/**
 * Converts an RGBObject into a hexidecimal number
 */

ColorConvert.rgb2hex = function(rgbObject) {
	if(!rgbObject) return null;
	if (rgbObject.r > 255) rgbObject.r = 255;
	if (rgbObject.r < 0) rgbObject.r = 0;
	if (rgbObject.g > 255) rgbObject.g = 255;
	if (rgbObject.g < 0) rgbObject.g = 0;
	if (rgbObject.b > 255) rgbObject.b = 255;
	if (rgbObject.b < 0) rgbObject.b = 0;
	return ((rgbObject.r << 16) | (rgbObject.g << 8) | rgbObject.b);
};

ColorConvert.rgbStr2rgb = function(str) {
	str = str.replace('rgb(','');
	str = str.replace(')','');
	var arr = str.split(',');
	var rgb = new RGBObject(arr[0],arr[1],arr[2]);
	return rgb;
}

ColorConvert.rgbStr2hex = function(str) {
	return ColorConvert.rgb2hex(ColorConvert.rgbStr2rgb(str));
}

ColorConvert.rgbStr2hexStr = function(str) {
	return ColorConvert.rgb2hexStr(ColorConvert.rgbStr2rgb(str));
}

ColorConvert.rgbStr2hsb = function(str) {
	return ColorConvert.rgb2hsb(ColorConvert.rgbStr2rgb(str));
}

/**
*  Converts a hexidecimal number into an RGBObject
*/

ColorConvert.hex2rgb = function(hex) {
	var r,g,b,gb;
	r = hex>>16 ;
	gb = hex ^ r << 16 ;
	g = gb>>8 ;
	b = gb^g<<8 ;
	return new RGBObject(r,g,b);
}

/**
*  Converts a RGBObject number into a HSBObject
*/

ColorConvert.rgb2hsb = function (rgbObject) {
	if (rgbObject.r > 255) rgbObject.r = 255;
	if (rgbObject.r < 0) rgbObject.r = 0;
	if (rgbObject.g > 255) rgbObject.g = 255;
	if (rgbObject.g < 0) rgbObject.g = 0;
	if (rgbObject.b > 255) rgbObject.b = 255;
	if (rgbObject.b < 0) rgbObject.b = 0;
	var max = Math.max(Math.max(rgbObject.r, rgbObject.g), rgbObject.b);
	var min = Math.min(Math.min(rgbObject.r, rgbObject.g), rgbObject.b);
	var b = Math.round(max*20/51);
	if (min == max) return new HSBObject(0, 0, b);
	var s = Math.round((1 - min/max)*100);
	var d = max - min;
	var h = Math.round((
	max == rgbObject.r ? 6 + (rgbObject.g - rgbObject.b)/d :
	max == rgbObject.g ? 2 + (rgbObject.b - rgbObject.r)/d :
	4 + (rgbObject.r - rgbObject.g)/d)
	*60) % 360;
	return new HSBObject(h,s,b);
}

/**
*  Converts a HSBObject number into a RGBObject
*/

ColorConvert.hsb2rgb = function (hsbObject) {
	if (hsbObject.h > 360) hsbObject.h = 360;
	if (hsbObject.h < 0) hsbObject.h = 0;
	if (hsbObject.s > 100) hsbObject.s = 100;
	if (hsbObject.s < 0) hsbObject.s = 0;
	if (hsbObject.b > 100) hsbObject.b = 100;
	if (hsbObject.b < 0) hsbObject.b = 0;
	var max = Math.round(hsbObject.b*51/20);
	var min = Math.round(max*(1 - hsbObject.s/100));
	var d = max - min;
	var h6 = hsbObject.h/60;
	if (h6 <= 1) return new RGBObject(max, Math.round(min + h6*d), min);
	if (h6 <= 2) return new RGBObject(Math.round(min - (h6 - 2)*d), max, min);
	if (h6 <= 3) return new RGBObject(min, max, Math.round(min + (h6 - 2)*d));
	if (h6 <= 4) return new RGBObject(min, Math.round(min - (h6 - 4)*d), max);
	if (h6 <= 5) return new RGBObject(Math.round(min + (h6 - 4)*d), min, max);
	return new RGBObject(max, min, Math.round(min - (h6 - 6)*d));
}

/**
*  Converts a HSBObject into a hexidecimal number
*/
ColorConvert.hsb2hex = function (hsbObject) {
	return ColorConvert.rgb2hex(ColorConvert.hsb2rgb(hsbObject));
}
/**
 *  Converts a HSBObject into a hexidecimal string
 */
ColorConvert.hsb2hexStr = function (hsbObject) {
	return ColorConvert.hex2hexStr(ColorConvert.hsb2hex(hsbObject));
}

/**
*  Converts a hexidecimal number into a HSBObject
*/
ColorConvert.hex2hsb = function(hex){
	return ColorConvert.rgb2hsb(ColorConvert.hex2rgb(hex));
}

/**
*  Converts a hexidecimal string into a RGBObject
*/
ColorConvert.hexStr2rgb = function(hexStr) {
	return ColorConvert.hex2rgb(ColorConvert.hexStr2hex(hexStr));
}

/**
 *  Converts a hexidecimal string into a HSBObject
 */
ColorConvert.hexStr2hsb = function(hexStr) {
	return ColorConvert.hex2hsb(ColorConvert.hexStr2hex(hexStr));
}

/**
*  Converts a RGBObject into a hexidecimal string
*/
ColorConvert.rgb2hexStr = function(rgbObject){
	return ColorConvert.hex2hexStr(ColorConvert.rgb2hex(rgbObject));
}

/**
*  Converts a hexidecimal number into a hexidecimal string
*/
ColorConvert.hex2hexStr = function(hex){
	hex = Math.round(hex);
	var h = hex.toString(16);
	var toFill = 6 - h.length;
	while (toFill--) h = "0" + h ;
	return "#" + h.toUpperCase();
}

/**
*  Converts a hexidecimal string into a hexidecimal number
*/
ColorConvert.hexStr2hex = function(hexStr) {
	return parseInt(hexStr.substr(-6, 6), 16);
}