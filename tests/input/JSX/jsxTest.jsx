const x = Math.random();
function teszt(arg1) {
    if (arg1 && !x) {
        return "igaz";
    }
    else {
        return "hamis";
    }
}
const myElement = <h1>{teszt(true)}</h1>;
