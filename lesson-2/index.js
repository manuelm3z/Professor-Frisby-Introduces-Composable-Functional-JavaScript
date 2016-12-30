/**
 * Lesson 2: Refactor imperative code to a single composed expression using Box
 */
const Box = x =>
({
    map: f => Box(f(x)),
    fold: f => f(x),
    inspect: () => `Box(${x})`
})

const moneyToFloatV1 = str =>
    parseFloat(str.replace(/\$/g, ''))

const moneyToFloat = str =>
    Box(str)
    .map(s => s.replace(/\$/g, ''))
    .map(r => parseFloat(r))

const percentToFloatV1 = str => {
    const replaced = str.replace(/\%/g, '');
    const number = parseFloat(replaced);
    return number * 0.01;
}

const percentToFloat = str =>
    Box(str)
    .map(s => s.replace(/\%/g, ''))
    .map(r => parseFloat(r))
    .map(n => n * 0.01);

const applyDiscountV1 = (price, discount) => {
    const cost = moneyToFloat(price);
    const savings = percentToFloat(discount);
    return cost - cost * savings;
}

const applyDiscount = (price, discount) =>
    moneyToFloat(price)
    .fold(cost => 
        percentToFloat(discount)
        .fold(savings => 
            cost - cost * savings));

const result = applyDiscount('$5.00', '20%');

console.log(result);