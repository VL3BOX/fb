/**
 * 去除对象空值
 * @param {*} obj
 * @returns
 */
export function removeEmptyIncludeZero(obj) {
    const newObj = {};
    for (const key in obj) {
        if (obj[key] !== null && obj[key] !== undefined && obj[key] !== "" && obj[key] !== 0) {
            newObj[key] = obj[key];
        }
    }
    return newObj;
}
