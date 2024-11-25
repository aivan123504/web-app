const bannerImages = document.getElementById('banner-images');
        let currentIndex = 0;

        function scrollBanner() {
            currentIndex = (currentIndex + 1) % 3; // Update to match the number of images
            bannerImages.style.transform = `translateX(-${currentIndex * 100}%)`;
        }

        setInterval(scrollBanner, 2000); // Auto-scroll every 2 seconds