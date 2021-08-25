/*
Array destructuring: utilizing rest parameter
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment
*/
function main () {
    let {d, e, ...rest } = {a: 2, b:20, d:3245, e:453};
    console.log(rest);
}

main();
