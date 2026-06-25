

const getData = async () => {
    try {
        const res = await fetch('./data.json');
        const data = await res.json();
        return data;
    } catch(err) {
        console.error(err);
    }
}

window.addEventListener("load", async () => {
    const data = await getData();
    const ul = document.querySelector(".spending__chart");
    const tableRows = document.querySelectorAll('tbody tr');
    const maxAmount = Math.max(...data.map(item => item.amount));
    for(let i = 0; i < tableRows.length; i++) {
        const td = document.createElement("td");
        td.textContent = data[i].amount;
        tableRows[i].appendChild(td);
        const pixel = (data[i].amount / maxAmount) * 100;
        const li = document.createElement("li");
        li.classList.add("spending__bar");
        li.setAttribute("data-amount", `$${data[i].amount}`);
        li.style.setProperty("--before-height", `${pixel}px`);
        li.textContent = `${data[i].day}`;
        if (i === new Date().getDay()) {
            li.style.setProperty("--before-color", "var(--clr-blue-300)")
        } else {
            li.style.setProperty("--before-color", "var(--clr-red-500)")
        }
        ul.appendChild(li);
    }
})