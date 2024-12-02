const apiUrl = 'https://customer-rest-service-frontend-personaltrainer.2.rahtiapp.fi/api/'

export function getCustomers() {
    return fetch(apiUrl + 'customers')
        .then(response => response.json())
}

export function getTrainings() {
    return fetch(apiUrl + 'trainings')
        .then(response => response.json())
}