const assert = require('assert');
const astutil = require('./astutil');
const _ = require('underscore');
const fs = require('fs');


function makeRequireJsGraph(ast) {
    assert.strictEqual(ast.programs.length, 1, "Can only have one starting point at the moment.");

    const rx = /^.*\\(.+\\)*(.+)\.(.+)$/g;
    const regexParse = rx.exec(ast.programs[0].attr.filename);
    const partialFileName = regexParse[2] + ".js";
    const fileName = "./" + partialFileName;
    const folder = regexParse[0].split(/[a-zA-Z]+\.js/)[0].replace(/\/$/, "\\");
    let dependencyGraph = [];

    astutil.visit(ast, function (node) {
        switch (node.type) {
            case 'CallExpression' :
                if (node.callee.name === "define" || node.callee.name === "require") {
                    const dependencies = [];
                    const argument = node.arguments[0];
                    if (argument.type === "ArrayExpression") {
                        argument.elements.forEach(function (element) {
                            dependencies.push(element.value + ".js");
                        });
                    } else if (argument.type === "Literal") {
                        dependencies.push(argument.value + ".js");
                    }
                    dependencies.forEach(function (dependency) {
                        dependencyGraph.push(new Dependency(fileName, dependency));
                    });
                }
                break;
        }
    });
    dependencyGraph.map(function (dep) {
        return dep.to
    }).forEach(function (outgoingDep) {
        let normOutgoingDep = outgoingDep.replace(/^.\//, "");
        normOutgoingDep = normOutgoingDep.replace(/^\//, "");
        normOutgoingDep = normOutgoingDep.replace(/\//, "\\");
        const newStart = folder + normOutgoingDep;
        if (fs.existsSync(newStart)) {
            const referencedAST = astutil.astFromFiles([newStart]);
            dependencyGraph = dependencyGraph.concat(makeRequireJsGraph(referencedAST))
        }
    });
    return _.uniq(dependencyGraph, function (edge) {
        return edge.toString();
    });
}

function Dependency(from, to) {
    this.from = from;
    this.to = to;

    this.toString = function () {
        return removeLeadingPointSlash(this.from) + " -> " + removeLeadingPointSlash(this.to);
    };

    function removeLeadingPointSlash(path) {
        return path.replace(/^\.?\//, "");
    }
}

exports.makeRequireJsGraph = makeRequireJsGraph;
