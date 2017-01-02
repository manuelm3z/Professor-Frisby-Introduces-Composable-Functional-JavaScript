/**
 * Lesson 8: Ensure failsafe combination using monoids
 */
// 1 + 0 = 1
// 2 + 0 = 2
// x + 0 = x
//In this cases the monoid is the zero wich is the neutral element

const Sum = x =>
({
    x,
    concat: ({x: y}) => Sum(x + y),
    inspect: () => `Sum(${x})`
})

Sum.empty = () => Sum(0)

const resV1 = Sum.empty().concat(Sum(1).concat(Sum(2)));

const All = x =>
({
    x,
    concat: ({x: y}) => All(x && y),
    inspect: () => `All(${x})`
})

All.empty = () => All(true)

const resV2 = All(false).concat(All(true)).concat(All.empty())

const First = x =>
({
    x,
    concat: _ => First(x),
    inspect: () => `First(${x})`
})

//In this case we dont have a neutral element.

const sum = xs =>
    xs.reduce((acc, x) => acc + x, 0)
//sum([1,2,3]) 6
//sum([]) 0

cons all = xs =>
    xs.reduce((acc, x) => acc && x, true)

cons first = xs =>
    xs.reduce((acc, x) => acc)
// first([1,2,3]) 1
// first([]) blow up