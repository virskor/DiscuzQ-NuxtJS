/**
 * 检测要打开的域名和当前域名是否同源
 * @param {*} url 
 */
const isOrigin = (url) => {
    const origin = window.location.origin;
    console.log(url.indexOf(origin), origin, url);
    return url.indexOf(origin) >= 0 ? true : false;
}

const urlParser = async (element) => {
    if (element.href) {
        if (isOrigin(element.href)) {
            window.location.href = element.href;
            return;
        }

        const result = await swal({
            title: "是否打开该连接?",
            text: `您即将打开外部连接，我们不确定该连接是否安全，请谨慎继续！\r\n ${element.href}`,
            icon: "info",
            buttons: {
                cancel: "取消",
                catch: {
                    text: "仍然打开",
                },
            },
            dangerMode: true,
        });

        if (result) {
            let win = window.open();
            win.location.href = element.href;
        }
        return true;
    }
}

export default urlParser;