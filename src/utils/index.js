export const rotateRight = (arr) => {
    const result = [...arr];
    const last = result.pop();
    result.unshift(last);

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