function updateTime() {
  const now = new Date();
  const hours = now.getHours().toString().padStart(2, '0');
  const minutes = now.getMinutes().toString().padStart(2, '0');
  const seconds = now.getSeconds().toString().padStart(2, '0');

  document.querySelector('[data-time="hours"]').textContent = hours;
  document.querySelector('[data-time="minutes"]').textContent = minutes;
  document.querySelector('[data-time="seconds"]').textContent = seconds;
}

setInterval(updateTime, 1000);

updateTime();



async function fetchWeather() {
  const apiKey = 'e96016a4b23b8d1aa30ab63941cd6edc';
  const city = 'Westlands';
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Failed to fetch weather data');
    const data = await response.json();

    let temperatureCelsius = data.main.temp.toFixed(1); 
    const description = data.weather[0].description; 
    const location = data.name; 

    const weatherElement = document.getElementById('weather');
    weatherElement.textContent = `Weather in ${location} is ${temperatureCelsius}°C with ${description}`;

    const celsiusRadio = document.getElementById('celsius');
    const fahrRadio = document.getElementById('fahr');

    celsiusRadio.addEventListener('change', () => {
      if (celsiusRadio.checked) {
        weatherElement.textContent = `Weather in ${location}is ${temperatureCelsius}°C with ${description}`;
      }
    });

    fahrRadio.addEventListener('change', () => {
      if (fahrRadio.checked) {
        const temperatureFahrenheit = (temperatureCelsius * 9) / 5 + 32;
        weatherElement.textContent = `Weather in ${location} is ${temperatureFahrenheit.toFixed(1)}°F with ${description}`;
      }
    });
  } catch (error) {
    console.error(error);
    document.getElementById('weather').textContent = 'Unable to retrieve weather information.';
  }
}

fetchWeather();

  function setGreeting() {
    const now = new Date();
    const hours = now.getHours();
    const greetingElement = document.getElementById('greeting');
  
    if (hours >= 0 && hours < 12) {
      greetingElement.textContent = 'Good Morning';
    } else if (hours >= 12 && hours < 18) {
      greetingElement.textContent = 'Good Afternoon';
    } else {
      greetingElement.textContent = 'Good Evening';
    }
  }
  
  setGreeting();

  const date = new Date();
  function formatDate(date) {
    const year = date.getFullYear();
    document.querySelector('[data-date="year"]').textContent = year;
  }

    formatDate(date);

const openNavMenu = document.getElementById('open-nav-menu');
const closeNavMenu = document.getElementById('close-nav-menu');
const navWrapper = document.querySelector('.wrapper');

openNavMenu.addEventListener('click', () => {
  navWrapper.classList.add('nav-open');
});

closeNavMenu.addEventListener('click', () => {
  navWrapper.classList.remove('nav-open');
});

async function loadGallery() {
  try {
    const response = await fetch('./assets/json/gallery.json');
    if (!response.ok) throw new Error('Failed to load gallery data');
    const images = await response.json();

    const displayedImage = document.getElementById('displayed-image');
    const thumbnailsContainer = document.getElementById('thumbnails');

    if (!images || images.length === 0) {
      throw new Error('No images found in the gallery data');
    }

    displayedImage.src = images[0].src;
    displayedImage.alt = images[0].alt;

    images.forEach((image) => {
      const thumbnail = document.createElement('img');
      thumbnail.src = image.src;
      thumbnail.alt = image.alt;
      thumbnail.classList.add('thumbnail');
      thumbnail.addEventListener('click', () => {
        displayedImage.src = image.src;
        displayedImage.alt = image.alt;
      });
      thumbnailsContainer.appendChild(thumbnail);
    });
  } catch (error) {
    console.error('Error loading gallery:', error);
  }
}
loadGallery();

async function loadProducts() {
  try {
    const response = await fetch('./assets/json/products.json');
    if (!response.ok) throw new Error('Failed to load products data');
    const products = await response.json();

    const productsArea = document.getElementById('products-area');

    const allRadio = document.getElementById('all');
    const paidRadio = document.getElementById('paid');
    const freeRadio = document.getElementById('free');

    const allCount = document.getElementById('all-count');
    const paidCount = document.getElementById('paid-count');
    const freeCount = document.getElementById('free-count');

    allCount.textContent = products.length;
    paidCount.textContent = products.filter((product) => product.price > 0).length;
    freeCount.textContent = products.filter((product) => product.price === 0).length;

    function renderProducts(filterType) {
      productsArea.innerHTML = ''; 
      const filteredProducts =
        filterType === 'all'
          ? products
          : filterType === 'paid'
          ? products.filter((product) => product.price > 0)
          : products.filter((product) => product.price === 0);

      filteredProducts.forEach((product) => {
        const productCard = document.createElement('div');
        productCard.classList.add('product-card');

        const productImage = document.createElement('img');
        productImage.src = product.image;
        productImage.alt = product.title;
        productCard.appendChild(productImage);

        const productInfo = document.createElement('div');
        productInfo.classList.add('product-info');

        const productTitle = document.createElement('h4');
        productTitle.classList.add('product-title');
        productTitle.textContent = product.title;
        productInfo.appendChild(productTitle);

        const productAuthor = document.createElement('p');
        productAuthor.classList.add('product-author');
        productAuthor.textContent = `Author: ${product.author}`;
        productInfo.appendChild(productAuthor);

        const productPrice = document.createElement('p');
        productPrice.classList.add('product-price');
        productPrice.textContent =
          product.price === 0 ? 'Free' : `$${product.price.toFixed(2)}`;
        productInfo.appendChild(productPrice);

        productCard.appendChild(productInfo);

        productsArea.appendChild(productCard);
      });
    }

    renderProducts('all');

    allRadio.addEventListener('change', () => renderProducts('all'));
    paidRadio.addEventListener('change', () => renderProducts('paid'));
    freeRadio.addEventListener('change', () => renderProducts('free'));
  } catch (error) {
    console.error('Error loading products:', error);
  }
}

loadProducts();



git init
git add .
git commit -m "first commit"
git branch -M main
git remote add origin https://github.com/mgklvn06/javascript3.git
git push -u origin main