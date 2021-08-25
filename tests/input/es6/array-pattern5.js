/*
Array destructuring: using default values
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment
*/
function main () {
	let a, b, c;
	let f = () => {return [10, 20]}
	[a, b, c=5] = f();
}

main();
