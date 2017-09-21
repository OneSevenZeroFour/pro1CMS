function sendAjax() {
	var formData = new FormData();

	//构造表单数据
	formData.append('username', 'john');
	formData.append('id', 123);

	//创建xhr对象
	var xhr = new XMLHttpRequest();

	//设置xhr请求的超时时间
	xhr.timeout = 3000;

	//设置响应返回的数据格式
	xhr.responseType = 'text';

	//创建一个 post 请求，采用异步
	xhr.open('post', '/server', true);

	//注册相关事件回调处理函数
	xhr.onload = function (e) {
		if (this.status == 200 || this.status == 304) {
			alert(this.responseText);
		}
	}
	xhr.ontimeout = function (e) {}
	xhr.onerror = function (e) {}

	//上传进度
	xhr.upload.onprogress = function (e) {}

	//发送数据
	xhr.send();

	/**
	 * 设置request header
	 * 	 setRequestHeader(DOMString header, DOMString value)
	 * 		content-type
	 * 			1.如果data是 Document 类型，同时也是HTML Document类型，则content-type默认值为text/html;charset=UTF-8;
	 * 			  否则为application/xml;charset=UTF-8；
	 * 			2.如果data是 DOMString 类型，content-type默认值为text/plain;charset=UTF-8；
	 * 			3.如果data是 FormData 类型，content-type默认值为multipart/form-data; boundary=[xxx]
	 * 			4.如果data是其他类型，则不会设置content-type的默认值
	 */

	/**
	  * 获取response header
			  1.getAllResponseHeaders();
			  2.getResponseHeader(DOMString header);
	  */
}

/**
 * xhr.responseType 设置返回数据类型
 * 值				xhr.response 数据类型	  		说明
	""			 	String字符串				   默认值(在不设置responseType时)
	"text"			String字符串
	"document"		Document对象			 		希望返回 XML 格式数据时使用
	"json"			javascript 对象			 	存在兼容性问题，IE10/IE11不支持
	"blob"			Blob对象
	"arrayBuffer"	ArrayBuffer对象
 */
function ajax01() {
	var xhr = new XMLHttpRequest();
	xhr.open('GET', '/path/to/image.png', true);
	//可以将`xhr.responseType`设置为`"blob"`也可以设置为`" arrayBuffer"`
	//xhr.responseType = 'arrayBuffer';
	xhr.responseType = 'blob';

	xhr.onload = function (e) {
		if (this.status == 200) {
			var blob = this.response;
		}
	};

	xhr.send();
}

/**
 * 获取上传、下载的进度
 * 		1.上传触发的是xhr.upload对象的 onprogress事件
 * 		2.下载触发的是xhr对象的onprogress事件
 */
function ajax02() {
	xhr.onprogress = updateProgress;
	xhr.upload.onprogress = updateProgress;

	function updateProgress(event) {
		if (event.lengthComputable) {
			var completedPercent = event.loaded / event.total;
		}
	}
}

/**
 * 若在断网状态下调用xhr.send(data)方法，则会抛错：Uncaught NetworkError: Failed to execute 'send' on 'XMLHttpRequest'。
 * 一旦程序抛出错误，
 * 如果不 catch 就无法继续执行后面的代码，所以调用 xhr.send(data)方法时，应该用 try-catch捕捉错误。
 */
function ajax03() {
	try {
		xhr.send(data)
	} catch (e) {
		//doSomething...
	};
}

/**
 * 在CORS标准中做了规定，默认情况下，浏览器在发送跨域请求时，不能发送任何认证信息（credentials）
 * 如"cookies"和"HTTP authentication schemes"。
 * 除非xhr.withCredentials为true（xhr对象有一个属性叫withCredentials，默认值为false）。
 */

/**
 * 在跨域请求中，client端必须手动设置xhr.withCredentials=true，
 * 且server端也必须允许request能携带认证信息
 * （即response header中包含Access-Control-Allow-Credentials:true），
 * 这样浏览器才会自动将cookie加在request header中。
 */

 /**
  * 特别注意一点，一旦跨域request能够携带认证信息，
  * server端一定不能将Access-Control-Allow-Origin设置为*，而必须设置为请求页面的域名。
  */

  /**
   * XMLHttpRequestEventTarget接口定义了7个事件：
		onloadstart
		onprogress
		onabort
		ontimeout
		onerror
		onload
		onloadend
	每一个XMLHttpRequest里面都有一个upload属性，而upload是一个XMLHttpRequestUpload对象
	XMLHttpRequest和XMLHttpRequestUpload都继承了同一个XMLHttpRequestEventTarget接口，所以xhr和xhr.upload都有第一条列举的7个事件
	onreadystatechange是XMLHttpRequest独有的事件
	所以这么一看就很清晰了：
	xhr一共有8个相关事件：7个XMLHttpRequestEventTarget事件+1个独有的onreadystatechange事件；而xhr.upload只有7个XMLHttpRequestEventTarget事件。
   */

/**
 * 事件	触发条件
	onreadystatechange		每当xhr.readyState改变时触发；但xhr.readyState由非0值变为0时不触发。

	onloadstart				调用xhr.send()方法后立即触发，若xhr.send()未被调用则不会触发此事件。

	onprogress				xhr.upload.onprogress在上传阶段(即xhr.send()之后，xhr.readystate=2之前)触发，
							每50ms触发一次；xhr.onprogress在下载阶段（即xhr.readystate=3时）触发，每50ms触发一次。

	onload					当请求成功完成时触发，此时xhr.readystate=4

	onloadend				当请求结束（包括请求成功和请求失败）时触发

	onabort					当调用xhr.abort()后触发

	ontimeout				xhr.timeout不等于0，由请求开始即onloadstart开始算起，
							当到达xhr.timeout所设置时间请求还未结束即onloadend，则触发此事件。

	onerror					在请求过程中，若发生Network error则会触发此事件（若发生Network error时，上传还没有结束，
							则会先触发xhr.upload.onerror，再触发xhr.onerror；若发生Network error时，上传已经结束，
							则只会触发xhr.onerror）。注意，只有发生了网络层级别的异常才会触发此事件，
							对于应用层级别的异常，如响应返回的xhr.statusCode是4xx时，并不属于Network error，
							所以不会触发onerror事件，而是会触发onload事件。
 */

 