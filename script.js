    // Mobile nav toggle
   const menuBtn = document.getElementById("menuBtn");
const closeBtn = document.getElementById("closeBtn");
const menuList = document.getElementById("menuList");
const nav = menuBtn.closest("nav");

menuBtn.addEventListener("click", () => {
  menuList.classList.add("open");
  nav.classList.add("menu-open");
});

closeBtn.addEventListener("click", () => {
  menuList.classList.remove("open");
  nav.classList.remove("menu-open");
});


    // Simple reveal on scroll
    const reveals = document.querySelectorAll('.reveal');
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) e.target.classList.add('visible');
      });
    }, {threshold:0.12});
    reveals.forEach(r => obs.observe(r));

    // Year in footer
    document.getElementById('year').textContent = new Date().getFullYear();

    // Simple form validation & mock submission
    const form = document.getElementById('bookingForm');
    const msg = document.getElementById('formMsg');
    form.addEventListener('submit', (ev) => {
      ev.preventDefault();
      // Minimal validation
      const name = form.name.value.trim();
      const phone = form.phone.value.trim();
      const email = form.email.value.trim();
      const service = form.service.value;
      if (!name || !phone || !email || !service) {
        msg.textContent = 'Please fill name, phone, email and choose a service.';
        msg.style.color = 'crimson';
        return;
      }
      // Simulate sending
      msg.style.color = 'var(--deep-green)';
      msg.textContent = 'Sending inquiry…';
      setTimeout(() => {
        msg.textContent = 'Inquiry sent! We will contact you shortly.';
        form.reset();
      }, 900);
    });
    // --- Popup logic ---
window.addEventListener('load', () => {
  const popup = document.getElementById('popupOverlay');
  const closeBtn = document.getElementById('closePopup');

  // Show popup 1 second after load
  setTimeout(() => {
    popup.classList.add('active');
  }, 1000);

  // Close on click or after 6 seconds
  closeBtn.addEventListener('click', () => popup.classList.remove('active'));
  popup.addEventListener('click', (e) => {
    if (e.target === popup) popup.classList.remove('active');
  });

  setTimeout(() => {
    popup.classList.remove('active');
  }, 6000);
});

/* Roate*/
const slides = document.querySelectorAll(".gallery img");
let current = 0;
let autoSlide;

const zoomOverlay = document.getElementById("fullscreenZoom");
const zoomedImg = document.getElementById("zoomedImage");
const closeZoom = document.getElementById("closeZoom");
let zoomed = false;

function updateSlides() {
  slides.forEach((slide,index)=>{
    slide.className = "";
    if(index===current) slide.classList.add("active");
    else if(index === (current-1+slides.length)%slides.length) slide.classList.add("prev");
    else if(index === (current+1)%slides.length) slide.classList.add("next");
    else slide.classList.add("behind");
  });
}

function nextSlide(){ if(!zoomed){ current=(current+1)%slides.length; updateSlides(); } }
function prevSlide(){ if(!zoomed){ current=(current-1+slides.length)%slides.length; updateSlides(); } }

function startAutoSlide(){ autoSlide=setInterval(nextSlide,120000); } // 2 mins
function resetAutoSlide(){ clearInterval(autoSlide); startAutoSlide(); }

const gallery = document.getElementById("gallery");

// Click / Tap logic
gallery.addEventListener("click",(e)=>{
  const activeImg = slides[current];
  if(e.target === activeImg){
    // Show fullscreen overlay
    zoomed = true;
    zoomedImg.src = activeImg.src;
    zoomOverlay.classList.add("active");
    clearInterval(autoSlide);
  } else {
    nextSlide();
    resetAutoSlide();
  }
});

// Close fullscreen zoom
closeZoom.addEventListener("click", () => {
  zoomOverlay.classList.remove("active");
  zoomed = false;
  startAutoSlide();
});

zoomOverlay.addEventListener("click", (e) => {
  if(e.target === zoomOverlay){
    zoomOverlay.classList.remove("active");
    zoomed = false;
    startAutoSlide();
  }
});

// Swipe support
let startX = 0;
gallery.addEventListener("touchstart", (e)=>{ startX = e.touches[0].clientX; });
gallery.addEventListener("touchend", (e)=>{
  const endX = e.changedTouches[0].clientX;
  const diff = endX - startX;
  if(Math.abs(diff)>50){
    if(diff<0) nextSlide(); else prevSlide();
    resetAutoSlide();
  }
});

// Nav buttons
document.getElementById("nextBtn").addEventListener("click",()=>{ nextSlide(); resetAutoSlide(); });
document.getElementById("prevBtn").addEventListener("click",()=>{ prevSlide(); resetAutoSlide(); });

// Initialize
updateSlides();
startAutoSlide();




