const track = document.querySelector(".slider__track");
const slides = document.querySelectorAll(".slider__testimonial");

let currentSlide = 0;
const updateSlide = (isNext) => {
    console.log(isNext);
    track.style.transform = `translateX(-${currentSlide * 100}%)`;
    slides.forEach((slide, index) => {
        if (index === currentSlide) {
            
            slide.removeAttribute("aria-hidden");
            slide.inert = false;
            isNext ? slide.querySelector(".slider__next-btn").focus() : slide.querySelector(".slider__prev-btn").focus();
        } else {
            slide.setAttribute("aria-hidden", "true");
            slide.inert = true;
        }
    })
}

const nextSlide = (isNext) => {
    currentSlide = (currentSlide+1) % slides.length;
    updateSlide(isNext);
}

const prevSlide = (isNext) => {
    currentSlide = Math.abs(currentSlide-1) % slides.length;
    updateSlide(isNext);
}

track.addEventListener("click", e => {
    if (e.target.classList.contains("slider__next-btn")) {
        nextSlide(true);
    }
    if (e.target.classList.contains("slider__prev-btn")) {
        prevSlide(false);
    }
})