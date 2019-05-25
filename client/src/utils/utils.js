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

export const showModal = (type, text) => {
    document.getElementsByClassName('cover-div')[0].classList.remove('on');
	document.getElementsByClassName('div-login')[0].classList.remove('on');
    document.getElementsByClassName('container-succesfull')[0].classList.add('on');
    document.getElementsByClassName('container-succesfull')[0].children[1].children[0].innerText = text;
    setTimeout(() => {
        document.getElementsByClassName('container-succesfull')[0].classList.remove('on');
    }, 3000);
}