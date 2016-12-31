/**
 * Lesson 7: Semigroup examples
 */
//npm install immutable-ext
const { Map } = require('immutable-ext');

const All = x =>
({
    x,
    concat: ({x: y}) => All(x && y),
    inspect: () => `All(${x})`
})

const Sum = x =>
({
    x,
    concat: ({x: y}) => Sum(x + y),
    inspect: () => `Sum(${x})`
})

const First = x =>
({
    x,
    concat: _ => First(x),
    inspect: () => `First(${x})`
})

//Combine both accounts
const acct1 = Map({
    name: First('Nico'),
    isPaid: All(true),
    points: Sum(10),
    friends: ['Franklin']
});

const acct2 = Map({
    name: First('Nico'),
    isPaid: All(false),
    points: Sum(2),
    friends: ['Gatsby']
});

const res = acct1.concat(acct2);

console.log(res.toJS());