const dataUrl = "data.json";

async function fetchData(url) {
    try {
        const responce = await fetch(url);
        const data = await responce.json();
        return data;
    } catch (error) {
        console.log(error.message);
    }
}

document.addEventListener("DOMContentLoaded", async () => {
    const data = await fetchData(dataUrl);

    const fiBlockEl = document.querySelector('.featured-items .fi-items');

    data.forEach(el => {

        fiBlockEl.insertAdjacentHTML("beforeend", `
        <div class="fi-item">
            <div class="fi-photo">
                <img src="${el.img}" alt="${el.name}">
                <div class="hover">
                    <a href="#">Add to Cart</a>
                </div>
            </div>
            <div class="desc">
                <h4>${el.name}</h4>
                <div class="price">${el.price}</div>
            </div>
        </div>
        `)

        });
});