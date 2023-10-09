export const getStoredUserId = () => {
    return localStorage.getItem('user');
}

export const storeUserId = (id) => {
    if (id) localStorage.setItem('user', id);
    else localStorage.removeItem('user');
}