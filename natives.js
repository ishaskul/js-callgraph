if(typeof define !== 'function') {
  var define = require('amdefine')(module);
}

define(function(require, exports) {
  var flowgraph = require('./flowgraph');

  function addNativeFlowEdges(nativeFlows, flow_graph) {
  	for(var native in nativeFlows) {
  		if(!nativeFlows.hasOwnProperty(native))
  			continue;
  		var target = nativeFlows[native];
  		flow_graph.addEdge(flowgraph.nativeVertex(native), flowgraph.propVertex({ type: 'Identifier',
  			                                                                      name: target }));
  	}
  	return flow_graph;
  }

  exports.addNativeFlowEdges = addNativeFlowEdges;
  return exports;
});