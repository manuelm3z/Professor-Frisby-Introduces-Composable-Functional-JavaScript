/**
 * Lesson 4: Use chain for composable error handling with nested Eithers
 */
const RightV1 = x =>
({
    map: f => Right(f(x)),
    fold: (f, g) => g(x),
    inspect: () => `Right(${x})`
})
// Related to getPortV4
const Right = x =>
({
    chain: f => f(x),
    map: f => Right(f(x)),
    fold: (f, g) => g(x),
    inspect: () => `Right(${x})`
})

const LeftV1 = x =>
({
    map: f => Left(x),
    fold: (f, g) => f(x),
    inspect: () => `Left(${x})`
})

//Related to getPortV4
const Left = x =>
({
    chain: f => Left(x),
    map: f => Left(x),
    fold: (f, g) => f(x),
    inspect: () => `Left(${x})`
})

const fromNullable = x =>
    x != null ? Right(x) : Left(null)

const fs = require('fs');

const tryCatch = f => {
    try {
        return Right(f());
    } catch(e) {
        return Left(e);
    }
}

const getPortV1 = () => {
    try {
        const str = fs.readFileSync('config.json');
        const config = JSON.parse(str);
        return config.port;
    } catch(e) {
        return 3000;
    }
}

const getPortV2 = () =>
    tryCatch(() => fs.readFileSync('config.json'))
    .map(c => JSON.parse(c))
    .fold(e => 3000, c => c.port)

const getPortV3 = () =>
    tryCatch(() => fs.readFileSync('config.json'))
    .map(c => tryCatch(() => JSON.parse(c)))
    .fold(e => 3000, c => c.port)

const getPort = () =>
    tryCatch(() => fs.readFileSync('config.json'))
    .chain(c => tryCatch(() => JSON.parse(c)))
    .fold(e => 3000, c => c.port)

const result = getPort();

console.log(result);

//fold is going to remove a value of his context, taking outer of box.
//chain expect a function to run another one