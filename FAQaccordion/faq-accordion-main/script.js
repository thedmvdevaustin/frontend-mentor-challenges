const accordion__toggle = document.querySelectorAll(".accordion__toggle")

accordion__toggle.forEach(element => {
    element.addEventListener('click', function () {
        let answer = this.nextElementSibling
        if (answer.style.display !=="block"){
            answer.style.display = "block"
            this.lastElementChild.src = "./assets/images/icon-minus.svg"  
        } else {
            answer.style.display = "none"
            this.lastElementChild.src = "./assets/images/icon-plus.svg"
        }
        accordion__toggle.forEach(accordion => {
            if (accordion.nextElementSibling!==answer){
                accordion.nextElementSibling.style.display = "none"
                accordion.lastElementChild.src = "./assets/images/icon-plus.svg"
            }
        })
    })
})

// adding focus with the spacebar and enter key for 
// people who navigate without the mouse 

accordion__toggle.forEach(element => {
    element.addEventListener('keydown', function(event) {
        if (event.key === ' ' || event.key === 'Enter'){
            let answer = this.nextElementSibling
            if (answer.style.display !=="block"){
                answer.style.display = "block"
                this.lastElementChild.src = "./assets/images/icon-minus.svg"
                  
            } else {
                answer.style.display = "none"
                this.lastElementChild.src = "./assets/images/icon-plus.svg"
            }
            accordion__toggle.forEach(accordion => {
                if (accordion.nextElementSibling!==answer){
                    accordion.nextElementSibling.style.display = "none"
                    accordion.lastElementChild.src = "./assets/images/icon-plus.svg"
                }
            })
        }
    })
})