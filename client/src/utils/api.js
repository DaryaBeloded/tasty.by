import axios from 'axios';
import Cookies from 'js-cookie';

const apiClient = axios.create({
    headers: {
        'Content-Type': 'application/json',
        'x-access-token': Cookies.get('accessToken'), 
    },
});

apiClient.interceptors.request.use(
    (config) => {
        const newConfig = config;
        const accessToken = Cookies.get('accessToken');
        if (!newConfig.headers.authorization && accessToken) {
            newConfig.headers.Authorization = `Bearer ${accessToken}`;
        }
        return newConfig;
    },
    error => Promise.reject(error),
);

apiClient.interceptors.response.use(
    response => response,
    async (error) => {
        const originalRequest = error.config;
        const refreshToken = Cookies.get('refreshToken');
        if (error.response.status === 401 && !refreshToken) {
            console.log('error Auth');
        } else if (error.response.status === 401 && refreshToken) {
            try {
                const response = await API.refreshToken();
                originalRequest.headers.Authorization = `Bearer ${
                    response.data.accessToken
                    }`;
            } catch (err) {
                console.log('refresh token Error');
            }
            const retryOriginalRequest = new Promise((resolve) => {
                resolve(axios(originalRequest));
            });

            return retryOriginalRequest;
        }
        return Promise.reject(error);
    },
);

const API = {
    login: (email, password) => apiClient.post('/auth/login', { email, password }),
    registration: obj => apiClient.post('/auth/register', { ...obj }),
    loadTop1: () => apiClient.get('/dishes/top1'),
    loadTop5: () => apiClient.get('/dishes/top5'),
    loadFood: id => apiClient.get(`/dishes?id=${id}`),
    loadCafes: () => apiClient.get('/cafes'),
    loadCategories: () => apiClient.get('/categories'),
    loadCuisines: () => apiClient.get('/cuisines'),
    getCafeByFilter: (cafeId, filter, filterId) => apiClient.get(`/cafes?cafeId=${cafeId}&filter=${filter}&filterId=${filterId}`),
    addToFavorites: favorite => apiClient.post('/favorites', { favorite }),
    sendRating: (dishId, rating) => apiClient.post('/rating', { dishId, rating }),
    deleteFromFavorites: favorite => apiClient.delete(`/favorites?id=${favorite}`),
    updateUser: user => apiClient.put('/privateOffice/me', {...user}),
    loadFavorites: () => apiClient.get('/privateOffice/myFavorites'),
    loadHistory: () => apiClient.get('/privateOffice/orders'),
    creteOrder: order => apiClient.post('/orders', {...order}),
};

export default API;