/**
 * Lesson 6: Create types with Semigroups
 */
const resV1 = "a".concat("b").concat("c");

const resV2 = [1, 2].concat([3, 4]).concat([5, 6]);

const resv3 = [1, 2].concat([3, 4].concat([5, 6]));

const resV4 = "a".concat("b".concat("c"));

const SumV1 = x =>
({
    x,
    concat: o => Sum(x + o.x),
    inspect: () => `Sum(${x})`
})

const Sum = x =>
({
    x,
    concat: ({x: y}) => Sum(x + y),
    inspect: () => `Sum(${x})`
})

const resV5 = Sum(1).concat(Sum(2));

//Another semigroup
true && false // false
true && true // true

const All = x =>
({
    x,
    concat: ({x: y}) => All(x && y),
    inspect: () => `All(${x})`
})

const resV6 = All(true).concat(All(false)); //All(false)

const First = x =>
({
    x,
    concat: _ => First(x),
    inspect: () => `First(${x})`
})

const resV7 = First("blah").concat(First("ice cream")); //First(blah)

const res = First("blah").concat(First("ice cream")).concat(First("meta programming")); //First(blah)

console.log(res);

//the name Semigroups came from algebra