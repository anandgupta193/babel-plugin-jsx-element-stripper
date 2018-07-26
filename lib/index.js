'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (babel) {
    var t = babel.types;

    return {
        visitor: {
            Program: function Program(path, state) {
                state.classMethods = {};
                Object.assign(state, {
                    mainPlace: path,
                    classMethods: {}
                });
            },
            Class: function Class(path, state) {
                path.traverse({
                    ClassMethod: function ClassMethod(path) {
                        state.classMethods[path.node.key.name] = path;
                    }
                });

                Object.keys(state.classMethods).forEach(function (element) {
                    if (element === 'render') {

                        console.log(element);

                        // state.mainPlace.replaceWith(t.Program([t.expressionStatement(renderReturn)]));
                    }
                });
            }
        }
    };
};