jQuery.formHelper = {
    getObject: function (urlserialize) {
        if (urlserialize) {
            urlserialize = decodeURI(urlserialize);
            var kvs = $.map((urlserialize).split('&'), function (e, i) {
                var kv = (e + '').split('=');
                return { key: kv[0], value: kv[1] };
            });
            var params = {};
            for (var key in kvs) {
                var _key = kvs[key].key;
                var value = null;
                if (typeof (params[_key]) == 'undefined') {
                    if ($.grep(kvs, function (e, i) { return e.key == _key; }).length > 1) {
                        value = [];
                        value.push(kvs[key].value);
                        params[_key] = value;
                    } else {
                        value = kvs[key].value;
                        params[_key] = value;
                    }
                } else if (typeof (params[_key]) == 'object') {
                    value = params[_key] ? params[_key] : [];
                    value.push(kvs[key].value);
                    params[_key] = value;
                } else {
                    value = kvs[key].value;
                    params[_key] = value;
                }
            }
            var resultParams = {};
            var objectParams = [];
            var indexs = {};
            for (var key in params) {
                var lstKey = key.substr(key.length - 6, 6);
                var subKey = key.substr(0, key.length - 6);
                var isIndex = (lstKey == '.index' && (urlserialize.indexOf(subKey + '[') == 0 || urlserialize.indexOf('&' + subKey + '[') > 0));
                var indexArr = key.match(/\[([^\]]+)\]/ig);
                if (indexArr) {
                    var __key = key;
                    for (var i = 0; i < indexArr.length; i++) {
                        var _index = (indexArr[i] + '');//.replace(/[\[\]]/g, '');
                        var indexof = __key.indexOf(indexArr[i]);
                        if (typeof (indexs[__key.substr(0, indexof)]) == 'undefined') {
                            indexs[__key.substr(0, indexof)] = [];
                        }
                        if (indexs[__key.substr(0, indexof)].indexOf(_index) < 0) {
                            indexs[__key.substr(0, indexof)].push(_index);
                        }
                        __key = __key.replace('[', '_').replace(']', '_');
 
                    }
 
                    //console.log(__key);
                    var keys = key.split('.');
                    var path = '';
                    var _path = '';
                    var __path = '';
                    for (var ik in keys) {
                        var ikey = keys[ik];
                        if (path == '') {
                            path = keys[ik];
                        } else {
                            path = path + '.' + keys[ik];
                        }
                        var pathArr = path.match(/\[([^\]]+)\]/ig);
                        if (__path == '') {
                            __path = path;
                        } else {
                            __path = __path + '.' + ikey;
                        }
                        if (_path == '') {
                            _path = path;
                        } else {
                            _path = _path + '.' + ikey;
                        }
                        //_path = path;
                        for (var ip in pathArr) {
                            var ipath = pathArr[ip];
                            var indexof = __path.indexOf(ipath);
                            var _index = __path.substr(0, indexof).replace('[', '_').replace(']', '_');
                            if (indexof > -1) {
                            	  //  var indnum=arrayIndexOf(indexs[_index],ipath);
                          	      //  _path = _path.replace(ipath, '[' + indnum + ']');
                                _path = _path.replace(ipath, '[' + indexs[_index].indexOf(ipath) + ']');
                                _path = _path.replace('[', '{').replace(']', '}');
                            }
                            if (_path.indexOf('[') < 0) {
                                if (!isIndex) {
                                    //初始化定义开始
                                    var evelCode = 'resultParams.' + _path.replace(/\{/g, '[').replace(/\}/g, ']');
                                    if (evelCode.substr(evelCode.length - 1, 1) == ']') {
                                        if (typeof (eval(evelCode.substr(0, evelCode.lastIndexOf('[')))) == 'undefined') {
                                            eval(evelCode.substr(0, evelCode.lastIndexOf('[')) + '=[];');
                                        } else {
                                            //console.log("hv", eval(evelCode.substr(0, evelCode.lastIndexOf('['))));
                                        }
                                    }
                                    try {
                                        if (typeof (eval(evelCode)) == 'undefined') {
                                            eval(evelCode + '={};');
                                        }
                                    } catch (e) {
                                        //console.log('error', evelCode);
                                    }
                                    //定义结束
                                    //赋值
                                    if (typeof (params[key]) != 'undefined') {
                                        var keyArrays = key.split('.');
                                        var codeArrays = evelCode.split('.');
                                        if (keyArrays[keyArrays.length - 1] == codeArrays[codeArrays.length - 1]) {
                                            try {
                                                eval(evelCode + '=params[key];');
                                            } catch (e) {
                                                //console.log(path);
                                            }
                                        }
                                    }
                                }
 
                            }
                        }
                        __path = __path.replace('[', '_').replace(']', '_');
                    }
                } else {
                    if (!isIndex) {
                        var keys = key.split('.');
                        var path = 'resultParams';
                        for (var ik in keys) {
                            path = path + '.' + keys[ik];
                            try {
                                if (typeof (eval(path)) == 'undefined') {
                                    eval(path + '={};');
                                }
                            } catch (e) {
                                //忽略不规则的
                            }
                        }
                        try {
                            eval(path + '=params[key];');
                        } catch (e) {
                            //忽略不规则的
                        }
                    }
                }
            }
            return resultParams;
        }
        return null;
    }
};