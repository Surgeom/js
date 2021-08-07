const obj = {
    key1: 'vbnv',
    arr: [1, 2, 3],
    innerObj: {
        key11: 'val1',
        key11: 'val2',
        key11: 'val3'
    }
}
console.log(Array.isArray(obj.arr))
const { key1, innerObj: obj1 } = obj;
console.log(key1)
console.log(obj1)
