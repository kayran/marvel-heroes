import querystring from 'querystring';
import md5 from 'md5'
const PVTK = '7099f2e0ed5dbee8018aa20a3af9a6e52821c440';
const PUBLIC_KEY = 'c0cb32ba54b8ef3b86528ef75b0218fb';

const BASE_URL = 'http://gateway.marvel.com/v1/public';

const getTs = () => new Date().getTime();

const getHash = ts => md5(ts+PVTK+PUBLIC_KEY);

const getBasicParams = () => {
    const ts = getTs();
    const hash = getHash(ts);
    return {
        ts,
        hash,
        apikey:PUBLIC_KEY
    };
}

async function getHeroById (id) {
    let url = `${BASE_URL}/characters/${id}?`;
    const params = getBasicParams();
    url = `${url}${querystring.stringify(params)}`;
    let results = [];

    try{
        const resource = await fetch(url);
        const json = await resource.json();
        ({results} = json.data);
    } catch(exception){
        console.trace(exception);
    }

    return results;
}

async function getHeroes(nameStartsWith = '', orderBy = 'name') {
    let url = `${BASE_URL}/characters?`;

    const basicParams = getBasicParams();
    let params = {orderBy, ...basicParams};
    if(nameStartsWith){
        params = {...params, nameStartsWith}
    }

    console.log(params)

    url = `${url}${querystring.stringify(params)}`;

    let results = [];

    try{
        const resource = await fetch(url);
        const json = await resource.json();
        ({results} = json.data);
    } catch(exception){
        console.trace(exception);
    }

    return results;
}
function compareResultBySort(sort){
    return sort.startsWith('-') ? -1 : 1; 
}
async function getFavoriteHeroes(favorites, orderBy='name') {
    const heroPromisses = [];
    for(const id of favorites){
        heroPromisses.push(getHeroById(id))
    }
    const promiseResults = await Promise.all(heroPromisses);
    const result = promiseResults.reduce(
        (accum, item) => accum.concat(item),
        []
     ).sort((a, b) => {
         if(a.name > b.name) {
             return compareResultBySort(orderBy);
         }
         if(a.name < b.name) {
             return -1 * compareResultBySort(orderBy);
         }
         return 0;
     })
    console.log(result)

    return result;
}

const api = {
    getHeroes,
    getFavoriteHeroes,
}

export default api;