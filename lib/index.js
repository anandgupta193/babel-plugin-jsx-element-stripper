'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (babel) {

    return {
        visitor: {
            Program: function Program(path, state) {
                state.classMethods = {};
                Object.assign(state, {
                    mainPlace: path,
                    classMethods: {}
                });
            },
            CallExpression: function (path, state) {
                if (path.node.callee.name === 'h') {
                    console.log(path);
                    path.node.arguments.forEach(function (elem) {
                        if (elem.type === 'ObjectExpression') {
                            elem.properties.forEach(function (props) {
                                if (props.key.name === 'mobile') {
                                    path.remove();
                                }
                            });
                        }
                    });
                }
            },
            AssignmentExpression: function (path) {
                if (path.node.left.type === "MemberExpression"
                    && path.node.left.property
                    && path.node.left.property.name
                    && path.node.left.property.name.endsWith('_mobile')) {
                    path.remove();
                }
            }
        }
    };
};