const markReadBtn = document.querySelector(".notifications__btn");
const notificationsList = document.querySelectorAll(".notifications__list-item");

markReadBtn.addEventListener("click", () => {
    notificationsList.forEach(item => {
        item.classList.remove("unread");
    })
    document.querySelector("h1 > em").innerHTML = "0"
})