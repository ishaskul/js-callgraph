const astutil = require('./astutil');

exports.countCallbacks = function (ast) {
    const callbacks = [];
    const enclosingFunctionParameters = [];

    let callbackUses = 0;
    let functionDeclarationParameter = 0;
    let functionExpressionParameter = 0;

    astutil.visit(ast, function (node) {
        switch (node.type) {
            case 'CallExpression' :
                //FIND ARGUMENT AS PARAMETER IN ENCLOSING FUNCTION.
                const callee = node.callee;
                const functionName = callee.name;
                const enclosingFunctionParameter = findEnclosingFunctionParameter(callee, functionName);
                if (enclosingFunctionParameter !== null) {
                    callbackUses++;
                    if (enclosingFunctionParameters.indexOf(enclosingFunctionParameter) === -1) {
                        callbacks.push(node);
                        enclosingFunctionParameters.push(enclosingFunctionParameter);
                    }
                }
                break;

            case 'FunctionDeclaration' :
                functionDeclarationParameter += node.params.length;
                break;

            case 'FunctionExpression' :
                functionExpressionParameter += node.params.length;
                break;
        }
    });
    const totalParameters = functionDeclarationParameter + functionExpressionParameter;
    const callbackPercentage = callbacks.length / totalParameters * 100;
    console.log("I found " + callbacks.length + " callbacks and " + callbackUses + " call back uses. In total we have " + functionDeclarationParameter + " function declaration parameters and " + functionExpressionParameter + " function expression parameters.");
    console.log("This makes a total of " + totalParameters + " parameters. Which means that (counting each function once as a callback) " + callbackPercentage + " percent of parameters are callbacks.");
};

function findEnclosingFunctionParameter(node, functionName) {
    const enclosingFunction = node.attr.enclosingFunction;
    if (!enclosingFunction) {
        return null;
    }

    const matchingParameter = findFirst(enclosingFunction.params, isParameterWithName(functionName));
    if (matchingParameter !== null) {
        return matchingParameter;
    }

    return findEnclosingFunctionParameter(enclosingFunction, functionName);
}

function findFirst(array, predicate) {
    let soughtElement = null;
    array.forEach(function (element) {
        if (predicate(element) === true) {
            soughtElement = element;
            return false;
        }
    });
    return soughtElement;
}

function isParameterWithName(functionName) {
    return function (parameter) {
        return parameter.name === functionName;
    };
}
