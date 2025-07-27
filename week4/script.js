document.addEventListener("DOMContentLoaded", () => {
  // Hamburger Menu
  const hamburger = document.getElementById("hamburger");
  if (hamburger) {
    hamburger.addEventListener("click", () => {
      document.getElementById("navLinks").classList.toggle("show");
    });
  }

  // Scroll To Top
  const scrollToTopBtn = document.getElementById("scrollToTop");
  window.onscroll = () => {
    scrollToTopBtn.style.display =
      document.documentElement.scrollTop > 200 ? "block" : "none";
  };
  scrollToTopBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  // Testimonials Carousel
  let currentTestimonial = 0;
  const testimonials = document.querySelectorAll(".testimonial");
  function showTestimonial(index) {
    testimonials.forEach((t, i) => {
      t.style.display = i === index ? "block" : "none";
    });
  }
  function nextTestimonial() {
    currentTestimonial = (currentTestimonial + 1) % testimonials.length;
    showTestimonial(currentTestimonial);
  }
  if (testimonials.length) {
    setInterval(nextTestimonial, 5000);
    showTestimonial(currentTestimonial);
  }

  // Menu Category Filter
  const categoryButtons = document.querySelectorAll(".category-btn");
  const menuItems = document.querySelectorAll(".menu-item");

  categoryButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const category = button.dataset.category;
      menuItems.forEach((item) => {
        const isMatch = category === "all" || item.dataset.category === category;
        item.style.display = isMatch ? "block" : "none";
        item.classList.remove("fade-in");
        void item.offsetWidth;
        if (isMatch) item.classList.add("fade-in");
      });
      categoryButtons.forEach((btn) => btn.classList.remove("active"));
      button.classList.add("active");
    });
  });

  // Gallery Lightbox
  const lightbox = document.createElement("div");
  lightbox.id = "lightbox";
  document.body.appendChild(lightbox);
  const images = document.querySelectorAll(".gallery-img");
  images.forEach((img) => {
    img.addEventListener("click", () => {
      lightbox.classList.add("active");
      const imgElement = document.createElement("img");
      imgElement.src = img.src;
      lightbox.innerHTML = "";
      lightbox.appendChild(imgElement);
    });
  });
  lightbox.addEventListener("click", () => {
    lightbox.classList.remove("active");
  });

  // Contact Form
  const contactForm = document.getElementById("contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = document.getElementById("contact-name").value.trim();
      const email = document.getElementById("contact-email").value.trim();
      const message = document.getElementById("contact-message").value.trim();
      const successMsg = document.getElementById("contact-success");

     if (name && email && message) {
  showModal("✅ Message sent successfully!");
  contactForm.reset();
} else {
  showModal("❌ Please fill all fields correctly.");
}
      setTimeout(() => {
        successMsg.classList.add("hidden");
      }, 3000);
    });
  }

  // Reservation Form
  const reservationForm = document.getElementById("reservation-form");
  if (reservationForm) {
    reservationForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = document.getElementById("res-name").value.trim();
      const email = document.getElementById("res-email").value.trim();
      const phone = document.getElementById("res-phone").value.trim();
      const guests = document.getElementById("res-guests").value.trim();
      const date = document.getElementById("res-date").value;
      const time = document.getElementById("res-time").value;
      const successMsg = document.getElementById("res-success");

      if (name && email && phone && guests && date && time) {
        successMsg.textContent = "✅ Reservation successful!";
        successMsg.classList.remove("hidden");
        successMsg.style.color = "green";
        reservationForm.reset();
      } else {
        successMsg.textContent = "❌ Please complete all fields.";
        successMsg.classList.remove("hidden");
        successMsg.style.color = "red";
      }

      setTimeout(() => {
        successMsg.classList.add("hidden");
      }, 3000);
    });
  }

  // Review Form
  const reviewForm = document.getElementById("review-form");
  const reviewList = document.getElementById("reviews-list");
  if (reviewForm && reviewList) {
    reviewForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = document.getElementById("reviewer-name").value.trim();
      const text = document.getElementById("review-text").value.trim();
      const successMsg = document.getElementById("review-success");

      if (name && text) {
        const review = document.createElement("div");
        review.classList.add("review");
        review.innerHTML = `<h4>${name}</h4><p>${text}</p>`;
        reviewList.prepend(review);

        successMsg.textContent = "✅ Review submitted!";
        successMsg.classList.remove("hidden");
        successMsg.style.color = "green";
        reviewForm.reset();
      } else {
        successMsg.textContent = "❌ Please complete both fields.";
        successMsg.classList.remove("hidden");
        successMsg.style.color = "red";
      }

      setTimeout(() => {
        successMsg.classList.add("hidden");
      }, 3000);
    });
  }
});

// Loader (once per session)
window.addEventListener("load", () => {
  const loader = document.querySelector(".loader");
  const hasShownLoader = sessionStorage.getItem("loaderShown");

  if (!hasShownLoader && loader) {
    loader.style.display = "flex";
    document.body.classList.remove("loaded");

    setTimeout(() => {
      document.body.classList.add("loaded");
      sessionStorage.setItem("loaderShown", "true");
      loader.style.display = "none";
    }, 3000);
  } else if (loader) {
    document.body.classList.add("loaded");
    loader.style.display = "none";
  }
});

// Toggle Menu Fallback
function toggleMenu() {
  const navLinks = document.getElementById("navLinks");
  navLinks.classList.toggle("active");
}
// Modal utility function
function showModal(message, isSuccess = true) {
  const modal = document.getElementById("confirmationModal");
  const modalMessage = document.getElementById("modal-message");
  const modalBtn = document.getElementById("modal-ok-btn");

  modalMessage.textContent = message;
  modalMessage.style.color = isSuccess ? "green" : "red";
  modal.style.display = "block";

  modalBtn.onclick = () => {
    modal.style.display = "none";
  };
}

// Contact Form Submission Handler
const contactForm = document.getElementById("contactForm");
if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("contactName").value.trim();
    const email = document.getElementById("contactEmail").value.trim();
    const message = document.getElementById("contactMessage").value.trim();

    if (name && email && message) {
      showModal("✅ Message sent successfully!", true);
      contactForm.reset();
    } else {
      showModal("❌ Please fill all fields correctly.", false);
    }
  });
}
