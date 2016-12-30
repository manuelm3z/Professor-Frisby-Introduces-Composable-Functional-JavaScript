/**
 * Lesson 5: A collection of Either examples compared to imperative code
 */
// openSite
const openSiteImperative = () => {
    if (current_user) {
        return renderPage(current_user);
    } else {
        return showLogin();
    }
}

const openSiteFunctional = () =>
    fronNullable(current_user)
    .fold(showLogin, renderPage);

//getPrefs
const getPrefsImperative = user => {
    if (user.premium) {
        return loadPrefs(user.preferences);
    } else {
        return defaultPrefs;
    }
}

const getPrefsFunctional = user =>
    (user.premium ? Right(user) : Left('not premium'))
    .map(u => u.preferences)
    .fold(() => defaultPrefs, prefs => loadPrefs(prefs));

//streetName
const streetNameImperative = user => {
    const address = user.address;

    if (address) {
        const street = address.street;

        if (street) {
            return street.name;
        }
    }

    return 'no street';
}

const streetNameFunctional = user =>
    fronNullable(user.address)
    .chain(a => fromNullable(a.street))
    .map(s => s.name)
    .fold(e => 'no street', n => n);

//concatUniq
const concatUniqImperative = (x, ys) => {
    const found = ys.filter(y => y === x)[0];

    return found ? ys : ys.concat(x);
}

const concatUniqFunctional = (x, ys) =>
    fromNullable(ys.filter(y => y === x)[0])
    .fold(() => ys.concat(x), y => ys);

//wrapExample
const wrapExampleImperative = example => {
    if (example.previewPath) {
        try {
            example.preview = fs.readFileSync(example.previewPath);
        } catch(e) {}
    }

    return example;
}

const readFile = x => tryCatch(() => fs.readFileSync(x))

const wrapExampleFunctional = example =>
    fromNullable(example.previewPath)
    .chain(readFile)
    .fold(() => example, preview => Object.assign({preview}, example));

//parseDbUrl
const parseDbUrlImperative = cfg => {
    try {
        const c = JSON.parse(cfg);

        if (c.url) {
            return c.url.match(/postgres:\/\/([^:]+):([^@]+)@([^:]+):(\d+)\/(.+)/)
        }
    } catch(e) {
        return null;
    }
}

const parseDbUrlFunctional = cfg =>
    tryCatch(() => JSON.parse(cfg))
    .chain(c => fromNullable(c.url))
    .fold(e => null, u => u.match(/postgres:\/\/([^:]+):([^@]+)@([^:]+):(\d+)\/(.+)/))