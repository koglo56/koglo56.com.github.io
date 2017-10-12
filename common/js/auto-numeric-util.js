var App = App || {}, AutoNumericUtils = {
    /** 默认配置 */
    defaultConfig: {
        aSep: '', aDec: '.', vMin: '0.00000000', vMax: '999999999.99999999', mDec:'8'
    },

    /** 只能输入整型数字，不能输入小数 */
    getIntConfig: function () {
        return {
            aSep: '', aDec: '.', vMin: '0', vMax: '999999999'
        }
    },
    /** 只能输入小数数字，不能输入整数 */
    getDecimalConfig: function () {
        return {
            aSep: '', aDec: '.', vMin: '1.00000000', vMax: '0.99999999', mDec:'8'
        }
    },

    /**
     * 正整数最大100 配置
     * @returns {{aSep: string, aDec: string, vMin: string, vMax: string}}
     */
    getIntHundredConfig: function () {
        return {
            aSep: '', aDec: '.', vMin: '0', vMax: '100', mDec:'0'
        }
    },

    /**
     * 正数单价 配置
     * @returns {{aSep: string, aDec: string, vMin: string, vMax: string}}
     */
    getPriceConfig: function () {
        return {
            aSep: '', aDec: '.', vMin: '0.00', vMax: '100000.00'
        }
    },

    /**
     * 正数总额 配置
     * @returns {{aSep: string, aDec: string, vMin: string, vMax: string}}
     */
    getAmtConfig: function () {
        return {
            aSep: '', aDec: '.', vMin: '0.00', vMax: '999999999.99', mDec:'2'
        }
    },
    /**
     * 金额配置，包含负数
     * @returns {{aSep: string, aDec: string, vMin: string, vMax: string}}
     */
    getMoneyConfig: function () {
        return {
            aSep: '', aDec: '.', vMin: '-999999999.99', vMax: '999999999.99'
        }
    },

    /**
     * 折扣 配置
     * @returns {{aSep: string, aDec: string, vMin: string, vMax: string}}
     */
    getDiscountConfig: function () {
        return {
            aSep: '', aDec: '.', vMin: '0.00', vMax: '10.00'
        }
    },


    /**
     * 渲染所有数字控件
     */
    renderComponent: function () {
        //
        $("input[componentType='auto-numeric']").each(function (index, inputEl) {
            var $inputEl = $(inputEl),
                configName = $inputEl.attr("componentConfig"),
                configArg = $inputEl.attr("componentConfigArg"),
                config,
                _config;
            //如果是取 AutoNumericUtils 已有配置
            if (AutoNumericUtils.hasOwnProperty(configName)) {
                config = AutoNumericUtils[configName];
            } else {
                config = eval(configName);
            }
            //如果是 function
            if ($.isFunction(config)) {
                //如果有配参数
                if (configArg) {
                    _config = config(configArg);
                } else {
                    _config = config();
                }
            }
            //如果是 {} JSON对象
            else if ($.isPlainObject(config)) {
                _config = config;
            }
            //至少有默认的
            if (_config) {
            } else {
                _config = AutoNumericUtils.defaultConfig;
            }
            //渲染控件
            $inputEl.autoNumeric(_config);
        });
    }

};