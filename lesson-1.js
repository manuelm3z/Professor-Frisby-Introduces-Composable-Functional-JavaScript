const nextChartForNumberStringV1 = str => {
    const trimmed = str.trim();
    const number = parseInt(trimmed);
    const nextNumber = number + 1;
    return String.fromCharCode(nextNumber);
}

const nextChartForNumberStringV2 = str =>
    String.fromCharCode(parseInt(str.trim()) + 1);
    
const nextChartForNumberStringV3 = str => 
    [str]
    .map(s => s.trim())
    .map(i => i + 1)
    .map(j => String.fromCharCode(j));

const Box = x =>
({
    map: f => Box(f(x)),
    fold: f => f(x),
    inspect: () => `Box(${x})`
})

const nextChartForNumberString = str =>
    Box(str)
    .map(s => s.trim())
    .map(r => new Number(r))
    .map(i => i + 1)
    .map(j => String.fromCharCode(j))
    .fold(c => c.toLowerCase());

const result = nextChartForNumberString(' 64 ');

console.log(result);