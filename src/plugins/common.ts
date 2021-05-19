const formatDate = (milliseconds: number) => {
    if (!milliseconds) {
        return ''
    }
    const date = new Date(milliseconds);
    return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${(date.getDay() + 1).toString().padEnd(2, '0')} ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}:${date.getSeconds().toString().padStart(0, '2')}`
}

const showPrice = (price: Number) => {
    if (!price) {
        return ''
    }
    return '¥ ' + price.toFixed(2).toLocaleString()
}

export { formatDate, showPrice }