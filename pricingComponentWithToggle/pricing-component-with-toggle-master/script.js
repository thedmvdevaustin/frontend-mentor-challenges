const checkbox = document.querySelector(".main__input");
const list = document.querySelectorAll(".main__list-item");
checkbox.addEventListener("click", () => {
    list.forEach(item => {
        item.querySelectorAll(".main__list-price > *").forEach((span, index) => {
            if (!index) {
                span.classList.toggle("monthly");
                if (span.hidden===true) {
                    span.hidden = false
                } else {
                    span.hidden = true;
                }
            } else {
                span.classList.toggle("annually");
                if (span.hidden===true) {
                    span.hidden = false
                } else {
                    span.hidden = true;
                }
            }
        })
    })
})