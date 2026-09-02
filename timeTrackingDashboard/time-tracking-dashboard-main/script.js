const navLinks = document.querySelectorAll('.dashboard__nav-link');


let data;
const getData = async () => {
    try {
        const response = await fetch('./data.json');
        data = await response.json();

        const currentLink = [...navLinks].find(navLink => {
            return navLink.pathname === window.location.pathname;
        })
    
        if (currentLink) {
            renderData(currentLink);
        }
    } catch(err) {
        console.error(err);
    }
}

const renderData = (link) => {
    const path = new URL(link.href).pathname;
    const timePeriod = path === "/" ? "weekly" : path.slice(1)
    const items = document.querySelectorAll(".dashboard__item");
    data.forEach((item, index) => {
        items[index].querySelector('.dashboard__info').innerHTML = `
        <b class="dashboard__hours">
            ${item.timeframes[timePeriod].current}hrs
        </b>
        ${timePeriod === 'daily' ? 'Yesterday' : timePeriod === 'weekly' ? 'Last Week' : 'Last Month'} - ${item.timeframes[timePeriod].previous}hrs`
    })
    updateLinks();
}

const updateLinks = () => {
    navLinks.forEach(navLink => {
        navLink.classList.toggle("active", navLink.pathname === window.location.pathname);
    })
}

navLinks.forEach(navLink => {
    navLink.addEventListener("click", e => {
        e.preventDefault();
        history.pushState({}, '', navLink.href);
        renderData(navLink);
    })
})

window.addEventListener("popstate", () => {
    const currentLink = [...navLinks].find(navLink => {
        return navLink.pathname === window.location.pathname;
    })

    if (currentLink) {
        renderData(currentLink);
    }
})

getData();