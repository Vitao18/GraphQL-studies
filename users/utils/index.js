export const prop = (name, obj) => obj[name];
export const update = (name, newValue, obj) => ({ ...obj, [name]: newValue });
