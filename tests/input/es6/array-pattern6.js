/*
Array destructuring: using rest parameter
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment
*/
function main () {
	let a, b, rest;
	let f = () => {return [10, 20, 30, 40, 50]}
	[a, b, ...rest] = f();
}

main();
