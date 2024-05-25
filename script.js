const app = document.getElementById('app');
const loginContainer = document.getElementById('login-container');
const sellerContainer = document.getElementById('seller-container');
const buyerContainer = document.getElementById('buyer-container');
const loginForm = document.getElementById('login-form');
const postPropertyForm = document.getElementById('post-property-form');
const myProperties = document.getElementById('my-properties');
const propertyList = document.getElementById('property-list');
const filterPlace = document.getElementById('filter-place');
const applyFiltersButton = document.getElementById('apply-filters');
const backToHomeButton = document.getElementById('back-to-home');
const backToHomeBuyerButton = document.getElementById('back-to-home-buyer');

let properties = [];
let user = null;

loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    user = {
        firstName: document.getElementById('firstName').value,
        lastName: document.getElementById('lastName').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        role: document.querySelector('input[name="role"]:checked').value
    };
    loginContainer.style.display = 'none';
    if (user.role === 'seller') {
        sellerContainer.style.display = 'block';
    } else {
        buyerContainer.style.display = 'block';
        renderProperties();
    }
});

postPropertyForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const property = {
        id: Date.now().toString(),
        place: document.getElementById('place').value,
        area: document.getElementById('area').value,
        bedrooms: document.getElementById('bedrooms').value,
        bathrooms: document.getElementById('bathrooms').value,
        nearby: document.getElementById('nearby').value,
        seller: user,
        likes: 0
    };
    properties.push(property);
    renderMyProperties();
    renderProperties();
    postPropertyForm.reset();
});

function renderMyProperties() {
    myProperties.innerHTML = '';
    const userProperties = properties.filter(p => p.seller.email === user.email);
    userProperties.forEach(property => {
        const propertyItem = document.createElement('div');
        propertyItem.className = 'property-item';
        propertyItem.innerHTML = `
            <h4>${property.place}</h4>
            <p>Area: ${property.area}</p>
            <p>Bedrooms: ${property.bedrooms}</p>
            <p>Bathrooms: ${property.bathrooms}</p>
            <p>Nearby: ${property.nearby}</p>
            <button onclick="deleteProperty('${property.id}')">Delete</button>
            <button onclick="editProperty('${property.id}')">Edit</button>
        `;
        myProperties.appendChild(propertyItem);
    });
}

function deleteProperty(id) {
    properties = properties.filter(p => p.id !== id);
    renderMyProperties();
    renderProperties();
}

function editProperty(id) {
    const property = properties.find(p => p.id === id);
    document.getElementById('place').value = property.place;
    document.getElementById('area').value = property.area;
    document.getElementById('bedrooms').value = property.bedrooms;
    document.getElementById('bathrooms').value = property.bathrooms;
    document.getElementById('nearby').value = property.nearby;
    deleteProperty(id);
}

function renderProperties() {
    propertyList.innerHTML = '';
    properties.forEach(property => {
        const propertyItem = document.createElement('div');
        propertyItem.className = 'property-item';
        propertyItem.innerHTML = `
            <h4>${property.place}</h4>
            <p>Area: ${property.area}</p>
            <p>Bedrooms: ${property.bedrooms}</p>
            <p>Bathrooms: ${property.bathrooms}</p>
            <p>Nearby: ${property.nearby}</p>
            <button class="like-button" onclick="likeProperty('${property.id}')">Like</button>
            <span class="likes-count">${property.likes} Likes</span>
            <button onclick="showSellerDetails('${property.seller.email}')">I'm Interested</button>
        `;
        propertyList.appendChild(propertyItem);
    });
}

function likeProperty(id) {
    const property = properties.find(p => p.id === id);
    property.likes++;
    renderProperties();
}

function showSellerDetails(email) {
    const seller = properties.find(p => p.seller.email === email).seller;
    alert(`Contact Seller:\nName: ${seller.firstName} ${seller.lastName}\nEmail: ${seller.email}\nPhone: ${seller.phone}`);
}

applyFiltersButton.addEventListener('click', () => {
    const filteredProperties = properties.filter(property => property.place.includes(filterPlace.value));
    propertyList.innerHTML = '';
    filteredProperties.forEach(property => {
        const propertyItem = document.createElement('div');
        propertyItem.className = 'property-item';
        propertyItem.innerHTML = `
            <h4>${property.place}</h4>
            <p>Area: ${property.area}</p>
            <p>Bedrooms: ${property.bedrooms}</p>
            <p>Bathrooms: ${property.bathrooms}</p>
            <p>Nearby: ${property.nearby}</p>
            <button class="like-button" onclick="likeProperty('${property.id}')">Like</button>
            <span class="likes-count">${property.likes} Likes</span>
            <button onclick="showSellerDetails('${property.seller.email}')">I'm Interested</button>
        `;
        propertyList.appendChild(propertyItem);
    });
});

backToHomeButton.addEventListener('click', () => {
    sellerContainer.style.display = 'none';
    loginContainer.style.display = 'block';
    user = null;
});

backToHomeBuyerButton.addEventListener('click', () => {
    buyerContainer.style.display = 'none';
    loginContainer.style.display = 'block';
    user = null;
});
