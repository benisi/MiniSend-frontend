export default value => {
    if (typeof value === 'string') {
        return `${value
            .toLowerCase()
            .charAt(0)
            .toUpperCase()}${value.substring(1)}`
    }
    return value
}
