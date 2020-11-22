(function () {
    var lastId = 0;
    var isFirstLoad = true; //是否是第一次加载，推送
    var timer = null;
    clearInterval(timer);
    timer = setInterval(function () {
        var xhr = new XMLHttpRequest();
        xhr.open("post", "http://api.globalinsp.com/api/u_is/orderCount");
        xhr.send();
        xhr.onreadystatechange = function () {
            if (this.readyState === 4 && this.status === 200) {
                var result = JSON.parse(this.responseText);
                let {
                    code,
                    data
                } = result;

                if (code === 200) {
                     if(lastId < data.count){
                         if(!isFirstLoad){
                              //不是第一次，推送消息
                              postMessage({ status:'update',lastId:data.count });
                              lastId = data.count;
                         }else{
                            isFirstLoad=false;
                            lastId = data.count;
                         }
                    
                    } 
                }

            }
        }
    }, 3000)

})();