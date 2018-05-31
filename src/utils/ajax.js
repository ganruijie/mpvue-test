export let ResFlag = {
	// 成功
	"Success": 0,
	// 失败
	"Failed": 1,
	// 登陆超时
	"LoginOut": 2,
	// 没有权限
	"NoRight": 3,
	// 程序异常
	"Error": 4
};
export function Ajax(url = "", data = {}, type = 'post') {
    
	return new Promise((resolve, reject) => {
		url = url;
		let obj = {
			url: url,
			data: JSON.stringify(data),
			beforeSend: function(XHR) {
			},
			type: type,
			dataType: "json",
			contentType: "application/json",
			crossDomain: true,
			success: function(res) {
                let dataJson = JSON.parse(res); //webapi方式直接返回json对象,其它方式返回需处理
                console.log(dataJson,'787878787')
				resolve(dataJson);
			},
			error: function(err) {
                console.log(err,'9999999')
				reject();
			}
        };
       
		$.ajax(obj);
	});
}