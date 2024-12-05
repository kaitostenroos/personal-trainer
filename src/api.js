const apiUrl = 'https://customer-rest-service-frontend-personaltrainer.2.rahtiapp.fi/api/'

export function getCustomers() {
    return fetch(apiUrl + 'customers')
        .then(response => response.json())
}

export function getCustomersFull() {
    return fetch(apiUrl + 'getcustomers')
        .then(response => response.json())
}

export function getTrainings() {
    return fetch(apiUrl + 'gettrainings')
        .then(response => response.json())
}

export function saveCustomer(newCustomer) {
    return fetch(apiUrl + 'customers', {
        method: 'POST',
        headers: {"Content-Type" : "application/json"},
        body: JSON.stringify(newCustomer)
    })
    .then(response => {
        if (!response.ok)
          throw new Error("Error in saving: " + response.statusText);
    
        return response.json();
      })
}

export function saveTraining(newTraining) {
    return fetch(apiUrl + 'trainings', {
        method: 'POST',
        headers: {"Content-Type" : "application/json"},
        body: JSON.stringify(newTraining)
    })
    .then(response => {
        if (!response.ok)
          throw new Error("Error in saving: " + response.statusText);
    
        return response.json();
      })
}

export function deleteCustomer(url) {
    return fetch(url, { method: "DELETE"})
  .then(response => {
    if (!response.ok)
      throw new Error("Error in delete: " + response.statusText);

    return response.json();
  })
}

export function deleteTraining(id) {
    return fetch(apiUrl + "trainings/" + id, { method: "DELETE"})
  .then(response => {
    if (!response.ok)
      throw new Error("Error in delete: " + response.statusText);

    return response.json();
  })
}

export function updateCustomer(url, customer) {
    return fetch(url, {
        method: 'PUT',
        headers: {"Content-Type" : "application/json"},
        body: JSON.stringify(customer)
    })
    .then(response => {
        if (!response.ok)
          throw new Error("Error in updating: " + response.statusText);
        
        return response.json();
    })
}