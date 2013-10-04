'use strict';

(function (exports) {

    var Unspect = {};


    /*Main aspect Class*/
    Unspect.baseAspect = function () {

    }

    /*Main aspect Class*/
    Unspect.baseAspect.prototype = {

        mainFunctionContext: undefined,

        addRunner: function (runner) {
            this.runner = runner;
        },

        addAspectCallback: function (callback) {
            this.aspectCallback = callback;
        },

        addAspectParams: function (params) {
            this.aspectParams = params;
        },


        addAspectArgsMap: function (argsMap) {
            this.aspectArgsMap = argsMap;
        },

        getAspectParams: function () {
            return this.aspectParams;
        },

        getAspectCallback: function () {

            return this.aspectCallback;
        },

        getAspectArgsMap: function () {
            return this.aspectArgsMap;
        },

        run: function () {

            var map = this.getAspectArgsMap();
            var resultArgs = this._argumentMapping(arguments,map);

            this.runNext = function () {
                var callback = this.context.getAspectCallback();
                this.context.getAspectCallback().apply(this.context.mainFunctionContext, this.args);
            }.bind({context: this, args: arguments})

            this.runner.apply(this, resultArgs);
        },

        _argumentMapping: function (agrs,map) {
            var resultArgs = [];

            //function
            if (typeof map === 'function') {
                resultArgs = map(agrs);

            }
            //array
            else if (map) {
                var mapIndex = 0,
                    mapLen = map.length;

                while (mapLen--) {
                    resultArgs.push(agrs[map[mapIndex] - 1]);
                    mapIndex += 1;
                }
            }
            //std
            else {
                var argIndex = 0,
                    mapLen = agrs.length;
                while (mapLen--) {
                    resultArgs.push(agrs[argIndex]);
                    argIndex += 1;
                }
            }

            return resultArgs;
        }




    }

    /*Function extend*/
    var aspect = function (aspect, params, args_map) {

        var aspectedObj = new Unspect.baseAspect();

        aspectedObj.addRunner(aspect);
        aspectedObj.addAspectCallback(this);
        aspectedObj.addAspectParams(params);
        aspectedObj.addAspectArgsMap(args_map);


        var runner = aspectedObj.run.bind(aspectedObj);
        runner.unspectObj = aspectedObj;

        var contextedRunner = function () {

            if (runner.unspectObj.mainFunctionContext == undefined) {
                runner.unspectObj.mainFunctionContext = this;
            }

            runner.apply(runner.unspectObj, Array.prototype.slice.call(arguments, 0));
        }



        return contextedRunner;

    }

    Function.prototype.aspect = aspect;


    exports.Unspect = Unspect;

})(typeof exports === 'undefined' ? this : exports);

