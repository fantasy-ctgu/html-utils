/**
 * 格式化时间：将毫秒转为年-月-日
 * @param {timestamp} time 
 */
function tsToDate(time) {
    var timestamp = new Date(time);
    return timestamp.getFullYear() + "-" + (timestamp.getMonth() + 1) + "-" + timestamp.getDate();
}

/**
 * 格式化时间：将毫秒转为年-月-日 时:分:秒
 * @param {timestamp} time 
 */
function tsToDatetime(time) {
    var timestamp = new Date(time);
    return timestamp.getFullYear() + "-" + (timestamp.getMonth() + 1) + "-" + timestamp.getDate() +
        " " + timestamp.getHours() + ":" + timestamp.getMinutes() + ":" + timestamp.getSeconds();
}

/**
 * 在当前界面打开url
 * @param {String} url 
 */
function locationHref(url) {
    window.location.href = url;
}

/**
 * 在新窗口打开url
 * @param {String} url 
 */
function locationOpen(url) {
    window.open(url);
}