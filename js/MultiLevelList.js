/*
 * @Author: Fantasy
 * @Date: 2020-02-21 14:52:20
 * @LastEditors: Fantasy
 * @LastEditTime: 2020-03-07 22:03:45
 * @Descripttion: 
 * @Email: 776474961@qq.com
 */
(function () {
    function MultiLevelList(opts) {
        this.selectList = [];
        this.selectTemplate = $('<select class="multiLevelSelect"></select>'); // select模版
        this.optionTemplate = $('<option class = "multiLevelOption"></option>'); // option模版
        this.target = "#target"; // 容器
        this.isInit = true;
        this.selectSrc;
        this.optionSrc;
        this.dataUrl; // 数据接口
        this.dataExample = {
            id: 1,
            level: 0,
            area_code: "",
            name: ""
        }; // 每个option所需数据的完整示例结构
        this.initData = []; //初始化数据
        this.optionTextField = "name"; //默认option的text值: option:text = dataExample[optionTextField]
        this.optionValueField = "name"; //默认option的value值: option:value = dataExample[optionValueField]
        this.autoSelected = true; //是否自动选择第一项，默认(true)
        this.level = 2; //多少级联动
        this.onInitialized = function () {}; //组件初始化后触发的回调函数
        this.onChoseEnd = function () {}; // 最后一级修改触发
        this.onChoseN = function () {}; // 点击组件选项后触发的回调函数 N是对应的级的回调
        this.init(opts);
    }
    MultiLevelList.prototype = {
        constructor: MultiLevelList,
        init: function (opts) {
            var _this = this;
            for (var key in opts) {
                _this[key] = opts[key];
            };

            // 设置select和option 模版
            if (_this.selectSrc) {
                _this.selectTemplate = $(_this.selectSrc).clone(true);
                $(_this.selectSrc).remove();
            } else {
                _this.selectTemplate = $('<select class="multiLevelSelect"></select>');
            }
            if (_this.optionSrc) {
                _this.optionTemplate = $(_this.optionSrc).clone(true);
                $(_this.optionSrc).remove();
            } else {
                _this.optionTemplate = $('<option class = "multiLevelOption"></option>');
            }

            _this.optionTemplate.empty();
            _this.selectTemplate.empty();
            $(_this.target).empty();


            // 创建level个select
            for (let i = 0; i < _this.level; i++) {
                let selectNode = $(_this.selectTemplate).clone(true);
                selectNode.attr("multiLevel", i);
                $(_this.target).append(selectNode);
                // 绑定选择事件
                _this.selectChangeTrigger(selectNode);
                _this.selectList.push(selectNode);
            }

            // 初始化第一个select
            let initData = _this.getData(_this.dataExample);
            _this.updateSelectOption($(_this.selectList[0]), initData);

            if (_this.initData.length > 0) {
                for (let i in _this.initData) {
                    var flag = $(_this.selectList[i]).find("option[value*='" + _this.initData[i] + "']").length;
                    if (flag) $(_this.selectList[i]).val(_this.initData[i]).trigger("change");
                    else {
                        console.error(_this.selectList[i]);
                        console.error("初始化数据'" + _this.initData[i] + "'在select中不存在");
                        let firstOption = $(_this.selectList[i]).children("option:first");
                        $(_this.selectList[i]).val(firstOption.val()).trigger("change");
                    }
                }
            } else if (_this.autoSelected) {
                $.each(_this.selectList, function (i, object) {
                    let firstOption = $(object).children("option:first");
                    $(object).val(firstOption.val()).trigger("change");
                });
            }
            _this.isInit = false;
            _this.onInitialized.call(this);
        },
        getData: function (data) {
            var _this = this;
            if (!_this.dataUrl) {
                console.error("参数 'dataUrl' 不能为空");
                throw SyntaxError();
            }
            return [{
                id: 1,
                level: 0,
                area_code: "",
                name: "beijing"
            }, {
                id: 2,
                level: 0,
                area_code: "",
                name: "shanghai"
            }];
            let resultData;
            $.ajax({
                url: _this.dataUrl,
                type: "get",
                dataType: "json",
                async: false,
                data: data,
                success: function (respDate) {
                    resultData = respDate;
                },
                /**
                 * 
                 * @param {*} XMLHttpRequest 错误信息、捕获的错误对象
                 * @param {*} textStatus timeout、error、notmodified、parsererror
                 * @param {*} errorThrown 
                 */
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    console.error("数据初始化失败,请检查数据接口");
                    console.error(XMLHttpRequest);
                    return false;
                }
            });
            return resultData;
        },
        updateSelectOption: function (select, dataList) {
            var _this = this;
            let selectObj = $(select);
            selectObj.empty();
            for (let i in dataList) {
                let data = dataList[i];
                let option = $(_this.optionTemplate).clone(true);
                option.attr("value", data[_this.optionValueField]);
                option.attr("data", JSON.stringify(data));
                option.text(data[_this.optionTextField]);
                selectObj.append(option);
            }
            $(select).trigger("change");
        },
        selectChangeTrigger: function (select) {
            var _this = this;
            $(select).bind("change", function () {
                let selectedOption = $(select).children("option:selected");
                let currentData = JSON.parse(selectedOption.attr("data"));
                let currentSelectLevel = Number(select.attr("multiLevel"));
                let nextSelectLevel = currentSelectLevel + 1;
                if (currentSelectLevel < _this.level - 1) {
                    let nextData = _this.getData(currentData);
                    let nextSelector = $(_this.selectList[nextSelectLevel]);
                    _this.updateSelectOption(nextSelector, nextData);
                };

                let choseName = "onChose" + nextSelectLevel;
                if (choseName in _this) {
                    if (_this.isInit) _this[choseName].call(this, "init");
                    else _this[choseName].call(this, "change");
                }
                if (currentSelectLevel == _this.level - 1) {
                    if (_this.isInit) _this.onChoseEnd.call(this, "init");
                    else _this.onChoseEnd.call(this, "change");
                }
            });
        },
    };

    if (typeof exports == "object") {
        module.exports = MultiLevelList;
    } else if (typeof define == "function" && define.amd) {
        define([], function () {
            return MultiLevelList;
        })
    } else {
        window.MultiLevelList = MultiLevelList;
    }
})();