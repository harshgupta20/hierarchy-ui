export const getLocal = (key, toParse) => {
    if (toParse) {
        const result = localStorage.getItem(key);
        if (result) {
            return {
                success: true,
                data: JSON.parse(result)
            }
        } else {
            return {
                success: false,
                data: ""
            }
        }
    }
    else {
        return localStorage.getItem(key);
    }
}


export const addLocal = (key, value, toString) => {
    if (toString) {
        return localStorage.setItem(key, JSON.stringify(value));
    }
    else {
        return localStorage.setItem(key, value);
    }
}


export const removeLocal = (key) => {
    localStorage.removeItem(key);
}