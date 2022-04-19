export const rotatePosition = (arr) => {
    const result = [...arr];
    const last = result.shift();
    result.push(last);

    return result;
}

export const addItemToArray = (arr, newItem) => {
    const newState = [...arr];
    newState.shift();
    newState.push(newItem);

    return newState
}

export const alphabeticSort = (arr) => {
    const copiedArray = [...arr];
    return [...copiedArray.sort((a, b) => a.localeCompare(b))]
}