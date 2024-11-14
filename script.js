// script.js

document.addEventListener('DOMContentLoaded', () => {
    console.log("DOMContentLoaded event triggered - Starting the script");

    const galleryContainer = document.getElementById('photo-gallery');
    const images = [
        'butters1.jpg',
        'butters2.png',
        'butters3.jpeg',
        // Add more image filenames here
    ];

    images.forEach((filename) => {
        const img = document.createElement('img');
        img.src = `Images/butters/${filename}`;
        img.alt = 'Butters Image';
        img.classList.add('gallery-image');
        galleryContainer.appendChild(img);
    });

    console.log("Images loaded successfully");
});
