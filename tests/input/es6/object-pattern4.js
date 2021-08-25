/*
Array destructuring: using default values
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment
*/
function main () {
    let {d, e, f = 120, g = 2} = { d:3245, e:453 };
    console.log(d);
    console.log(e);
    console.log(f);
    console.log(g);
}

main();
