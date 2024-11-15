// script.js

document.addEventListener('DOMContentLoaded', () => {
    console.log("DOMContentLoaded event triggered - Starting the script");

    const galleryContainer = document.getElementById('photo-gallery');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const closeBtn = document.querySelector('.close');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');
    let currentImageIndex = 0;
    let images = [];

    fetch('/images/butters')
        .then(response => response.json())
        .then(data => {
            images = data;
            images.forEach((filename, index) => {
                const img = document.createElement('img');
                img.src = `Images/butters/${filename}`;
                img.alt = 'Butters Image';
                img.classList.add('gallery-image');
                img.dataset.index = index;
                galleryContainer.appendChild(img);
            });
            console.log("Images loaded successfully");
        })
        .catch(error => console.error('Error loading images:', error));

    const showLightbox = (index) => {
        lightbox.style.display = 'block';
        lightboxImg.src = `Images/butters/${images[index]}`;
        currentImageIndex = index;
    };

    const hideLightbox = () => {
        lightbox.style.display = 'none';
    };

    const showPrevImage = () => {
        currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
        lightboxImg.src = `Images/butters/${images[currentImageIndex]}`;
    };

    const showNextImage = () => {
        currentImageIndex = (currentImageIndex + 1) % images.length;
        lightboxImg.src = `Images/butters/${images[currentImageIndex]}`;
    };

    galleryContainer.addEventListener('click', (e) => {
        if (e.target.classList.contains('gallery-image')) {
            showLightbox(e.target.dataset.index);
        }
    });

    closeBtn.addEventListener('click', hideLightbox);
    prevBtn.addEventListener('click', showPrevImage);
    nextBtn.addEventListener('click', showNextImage);

    document.addEventListener('keydown', (e) => {
        if (lightbox.style.display === 'block') {
            if (e.key === 'ArrowLeft') {
                showPrevImage();
            } else if (e.key === 'ArrowRight') {
                showNextImage();
            } else if (e.key === 'Escape') {
                hideLightbox();
            }
        }
    });
});
