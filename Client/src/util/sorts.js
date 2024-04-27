export const mapOrder = (originalArray, orderArray, key) => {
    if (!originalArray || !orderArray || !key) return [];

    const orderMap = new Map();
    orderArray.forEach((item, index) => {
        orderMap.set(item, index);
    });

    return [...originalArray].sort((a, b) => {
        return orderMap.get(a[key]) - orderMap.get(b[key]);
    });
};
