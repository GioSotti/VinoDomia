function userSearchEngine(searchString: string, userList: object[]) {
    return userList.filter((obj) => {
        if (Object.hasOwn(obj, searchString)) {
            return obj;
        }
    })
}

/*
W.I.P
function filterEngineSortByNameAsc(userList: object[na]) {
    return userList.sort((a,b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0))
}

 */

export { userSearchEngine };