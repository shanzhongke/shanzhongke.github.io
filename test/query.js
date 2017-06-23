import util from './util'
import data from './data'

var db = data.db;

export default {
    "fr": function (data) {
        data.message = "成功";
        return {
            code: 200,
            data: data
        }
    },
    "fa": function (code) {
        return {
            code: code || 400,
            data: {
                msg: "error"
            }
        }
    },
    "getFirst": function (modal) {
        for (var key in db[modal]) {
            return db[modal][key];
        }
    },
    "getModal": function (modal) {
        return  db[modal];
    },
    "getObj": function (modal, id) {
        return db[modal][id];
    },
    "getModalTemplate": function (modal) {
        return $.extend({}, this.getFirst(modal));
    },
    "getByAttr": function (modal, attrs, filter) {
        var data = db[modal];
        c : for (var id in data) {
            var obj = data[id];
            if (attrs)
                for (var key in attrs) {
                    if (obj[key] != attrs[key]) continue c
                }
            if (filter && !filter.call(obj)) continue c;
            return obj;
        }
    },
    "getAllByAttr": function (modal, attrs, filter) {
        var data = $.extend(true, {}, db[modal]),
            list = [];
        c : for (var id in data) {
            var obj = data[id];
            if (attrs)
                for (var i = 0; i < attrs.length; i++) {
                    var key = attrs[i][0],
                        value = attrs[i][1];
                    if (obj[key] != value) continue c
                }
            if (filter && !filter.call(obj)) continue c;
            list.push(obj);
        }
        return list;
    },
    "page": function (modal, args, attrs) {
        var data = $.extend(true, {}, db[modal]),
            list = [],
            filter = function (obj) {
                if (args.search) {
                    if (typeof args.searchType != "undefined") {
                        if (obj.searchType != args.searchType) {
                            return false;
                        }
                    }
                    for (var attrName in obj) {
                        var attr = obj[attrName];
                        if (typeof attr === "string" && attr.indexOf(args.search) >= 0) {
                            return true;
                        }
                    }
                    return false;
                }
                return true;
            };

        c : for (var id in data) {
            var obj = data[id];
            if (filter(obj)) {
                if (attrs)
                    for (var i = 0; i < attrs.length; i++) {
                        var key = attrs[i][0],
                            value = attrs[i][1];
                        if ($.isArray(value)) {
                            var flag = true;
                            value.forEach(function (v) {
                                if (obj[key] == v) {
                                    return flag = false;
                                }
                            });
                            if (flag) {
                                continue c
                            }
                        } else if (obj[key] != value) continue c
                    }
                list.push(obj);
            }
        }

        var start = ((args.currentPage || 1) - 1) * (args.pageSize || 10),
            end = start + (args.pageSize || 10);
        return this.fr({
            currentPage: (args.currentPage || 1),
            totalSize: list.length,
            pageSize: (args.pageSize || 10),
            list: list.slice(start, end)
        });
    },
    "get": function (modal, id) {
        return this.fr({
            object: $.extend(true, {}, db[modal][id])
        });
    },
    //modal为数据文件名 可传数组或字符串  多个页面调用同一接口时可传数组
    "delete": function (modal, id) {
        if (modal instanceof Array) {
            for (var i = 0; i < modal.length; i++) {
                if (db[modal[i]][id]) {
                    delete db[modal[i]][id];
                    return this.fr({});
                }
            }
        } else {
            delete db[modal][id];
            return this.fr({});
        }
    },
    "deletes": function (modal, attrs) {
        var list = this.getAllByAttr(modal, attrs);
        list.forEach(function (obj) {
            delete db[modal][obj.id];
        });
        return this.fr({});
    },
    "save": function (modal, obj, flag) {
        if (obj.id && db[modal][obj.id]) {
            var old = db[modal][obj.id];
            obj = $.extend(old, obj)
        }
        else {
            obj.id = util.uuid();
        }
        db[modal][obj.id] = obj;
        return flag ? {id: obj.id} : this.fr({id: obj.id});
    },
    "getGroupChildren": function (modal, args) {
        var d = this.getAllByAttr('groups', []);
        var arr = [];
        for (var i = 0; i < d.length; i++) {
            if (d[i].parentId == args.id) {
                arr.push(d[i])
            }
        }
        return arr;
    },
    "deleteByIds": function (modal, ids) {
        for (var i = 0; i < ids.length; i++) {
            delete db[modal][ids[i]];
        }
        return this.fr({});
    }
}
