export const FILTERS = {
    CAFE: 'cafe',
    CATEGORY: 'category',
    CUISINE: 'cuisine',
}

export const addFavoritesToFood = food => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) return food;
    const { 
        user: {
            favorites,
        }
    } = user;
    if (!favorites) return food;
    return favorites.indexOf(food._id) === -1 ? food : {...food, favorites: true};
}