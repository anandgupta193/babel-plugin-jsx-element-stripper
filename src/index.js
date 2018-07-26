'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (babel) {
    var t = babel.types;

    /**
   *
   * Implemented Generic Traverse method for traversing tree recursively
   * 
   * @param {*} path
   * @param {*} state
   * 
   */
    function genericTraverse(path) {

        /**
         * Traversing AST and transforming expressions and custom components.
         */
        path.traverse({

            JSXElement: function JSXOpeningElement(path) {
                path.node.openingElement.attributes.forEach(function (elem) {
                    if (elem.name.name === 'mobile') {
                        path.remove();
                    }
                });

            }
        });

    }

    return {
        visitor: {
            Program: function Program(path, state) {
                state.classMethods = {};
                Object.assign(state, {
                    mainPlace: path,
                    classMethods: {}
                });
            },
            Class: function (path, state) {
                path.traverse({
                    ClassMethod: function ClassMethod(path) {
                        state.classMethods[path.node.key.name] = path;
                    }
                });

                Object.keys(state.classMethods).forEach(element => {

                    genericTraverse(state.classMethods[element], state);

                });
            }
        }
    };
};