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

const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwI5Wqw6EzagBvBdaIjkLVwSqHqKxLLSpfo93pKCfqfHWTPWqpn2uKzl-d6uGvde2r-7A/exec';

const form = document.getElementById('bookingForm');
const msg = document.getElementById('formMsg');

form.addEventListener('submit', async (ev) => {
  ev.preventDefault();
  const name = form.name.value.trim();
  const phone = form.phone.value.trim();
  const email = form.email.value.trim();
  const service = form.service.value;
  const date = form.date.value;
  const time = form.time.value || 'Not specified';
  const notes = form.notes.value || 'No additional details';
  
  if (!name || !phone || !email || !service || !date) {
    msg.textContent = 'Please fill all required fields: name, phone, email, service, and date.';
    msg.style.color = 'crimson';
    return;
  }
  
  const formData = {
    name: name,
    phone: phone,
    email: email,
    service: service,
    date: date,
    time: time,
    notes: notes,
    timestamp: new Date().toLocaleString(),
    source: 'Hotel Booking Website'
  };
  
  msg.style.color = 'var(--deep-green)';
  msg.textContent = 'Sending inquiry…';
  
  try {
    const response = await fetch(SCRIPT_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData)
    });
    
    msg.textContent = 'Inquiry sent successfully! We will contact you shortly.';
    form.reset();
  
    setTimeout(() => {
      msg.textContent = '';
    }, 5000);
    
  } catch (error) {
    console.error('Error sending form:', error);
    msg.style.color = 'crimson';
    msg.textContent = 'Failed to send inquiry. Please try again or contact us directly.';
  }
});

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