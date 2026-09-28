const button = document.querySelector(".advice__btn");
const title = document.querySelector(".advice__title");
const details = document.querySelector(".advice__details");

const getAdvice = async () => {
    try {
        const res = await fetch('https://api.adviceslip.com/advice/');
        const data = await res.json();
        return data;
    } catch(err) {
        console.error(err);
    }
}

button.addEventListener("click", async() => {
    const data = await getAdvice();
    title.innerHTML = `advice #${data.slip.id}`;
    details.innerHTML = `"${data.slip.advice}"`;
})