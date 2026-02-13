document.addEventListener('DOMContentLoaded', function() {
  "use strict";

  console.log("Main.js loaded - Portfolio Website");

  // Current year in footer
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Mobile nav toggle
  var toggle = document.querySelector(".nav-toggle");
  var navLinks = document.querySelector(".nav-links");
  if (toggle && navLinks) {
    toggle.addEventListener("click", function () {
      var open = navLinks.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", open);
    });
  }

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(function (a) {
    var id = a.getAttribute("href");
    if (id === "#") return;
    var target = document.querySelector(id);
    if (target) {
      a.addEventListener("click", function (e) {
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth" });
        navLinks && navLinks.classList.remove("is-open");
        toggle && toggle.setAttribute("aria-expanded", "false");
      });
    }
  });

  // Lightbox functionality
  // Updated selector to include slideshow images if desired, or just project gallery
  var galleryImages = document.querySelectorAll('.project-gallery img, .project-gallery-image, .slide img');
  console.log("Found gallery images:", galleryImages.length);

  if (galleryImages.length > 0) {
    // Create lightbox elements
    var lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    
    var img = document.createElement('img');
    img.className = 'lightbox-content';
    
    var close = document.createElement('button');
    close.className = 'lightbox-close';
    close.innerHTML = '&times;';
    
    // Add navigation buttons to lightbox
    var prevBtn = document.createElement('button');
    prevBtn.className = 'lightbox-nav lightbox-prev';
    prevBtn.innerHTML = '&#10094;';
    
    var nextBtn = document.createElement('button');
    nextBtn.className = 'lightbox-nav lightbox-next';
    nextBtn.innerHTML = '&#10095;';
    
    lightbox.appendChild(img);
    lightbox.appendChild(close);
    lightbox.appendChild(prevBtn);
    lightbox.appendChild(nextBtn);
    document.body.appendChild(lightbox);
    
    var currentLightboxIndex = 0;

    // Function to show specific image in lightbox
    function showLightboxImage(index) {
      if (index >= galleryImages.length) index = 0;
      if (index < 0) index = galleryImages.length - 1;
      
      currentLightboxIndex = index;
      img.src = galleryImages[index].src;
    }

    // Open lightbox on click
    galleryImages.forEach(function(image, index) {
      image.style.cursor = 'zoom-in'; // Visual cue
      image.addEventListener('click', function(e) {
        e.stopPropagation(); // Prevent bubbling
        showLightboxImage(index);
        lightbox.classList.add('active');
      });
    });
    
    // Navigation events
    prevBtn.addEventListener('click', function(e) {
      e.stopPropagation();
      showLightboxImage(currentLightboxIndex - 1);
    });

    nextBtn.addEventListener('click', function(e) {
      e.stopPropagation();
      showLightboxImage(currentLightboxIndex + 1);
    });

    // Close lightbox
    var closeLightbox = function() {
      lightbox.classList.remove('active');
    };
    
    close.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', function(e) {
      if (e.target === lightbox) closeLightbox();
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
      if (!lightbox.classList.contains('active')) return;
      
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') showLightboxImage(currentLightboxIndex - 1);
      if (e.key === 'ArrowRight') showLightboxImage(currentLightboxIndex + 1);
    });
  }

  // --- Hero Slideshow ---
  (function() {
    var slides = document.querySelectorAll('.slide');
    var indicators = document.querySelectorAll('.indicator');
    var slideshowContainer = document.querySelector('.hero-slideshow');
    var prevSlideBtn = document.querySelector('.slide-nav.prev');
    var nextSlideBtn = document.querySelector('.slide-nav.next');
    
    console.log("Slideshow init: Found " + slides.length + " slides and " + indicators.length + " indicators.");

    if (slides.length > 0) {
      var currentSlide = 0;
      var slideInterval;
      var intervalTime = 3000; // 3 seconds per slide

      function showSlide(index) {
        // Wrap around logic
        if (index >= slides.length) index = 0;
        if (index < 0) index = slides.length - 1;

        // Update classes
        slides.forEach(function(slide) { slide.classList.remove('active'); });
        indicators.forEach(function(ind) { ind.classList.remove('active'); });

        slides[index].classList.add('active');
        if (indicators[index]) indicators[index].classList.add('active');
        
        currentSlide = index;
      }

      function nextSlide() {
        showSlide(currentSlide + 1);
      }
      
      function prevSlide() {
        showSlide(currentSlide - 1);
      }

      function startSlideShow() {
        // Clear existing to prevent duplicates
        if (slideInterval) clearInterval(slideInterval);
        slideInterval = setInterval(nextSlide, intervalTime);
      }

      function stopSlideShow() {
        if (slideInterval) clearInterval(slideInterval);
      }

      // Initialize
      showSlide(0);
      startSlideShow();

      // Event Listeners for Indicators
      indicators.forEach(function(ind, i) {
        ind.addEventListener('click', function(e) {
          e.preventDefault();
          e.stopPropagation();
          stopSlideShow();
          showSlide(i);
          startSlideShow();
        });
      });

      // Event Listeners for Arrows
      if (prevSlideBtn) {
        prevSlideBtn.addEventListener('click', function(e) {
          e.preventDefault();
          e.stopPropagation();
          stopSlideShow();
          prevSlide();
          startSlideShow();
        });
      }

      if (nextSlideBtn) {
        nextSlideBtn.addEventListener('click', function(e) {
          e.preventDefault();
          e.stopPropagation();
          stopSlideShow();
          nextSlide();
          startSlideShow();
        });
      }

      // Pause on hover
      if (slideshowContainer) {
        slideshowContainer.addEventListener('mouseenter', function() {
          stopSlideShow();
        });
        slideshowContainer.addEventListener('mouseleave', function() {
          startSlideShow();
        });
      }
    } else {
      console.warn("No slides found in .hero-slideshow");
    }
  })();
});
