/* ============================= */
/* APP START ON LOAD */
/* ============================= */

window.addEventListener('load', function(){

    console.log("APP START ON LOAD");

    // #app'i görünür yap
    const appDiv = document.getElementById("app");
    appDiv.style.display = "block";

    // Hero default ayarları
    const heroDiv = document.getElementById("hero");
    const heroTitle = document.getElementById("hero-title");
    const heroDesc = document.getElementById("hero-desc");
    const heroLink = document.getElementById("hero-link");

    if(heroDiv){
        heroDiv.style.background = "url('https://cdn.iview.abc.net.au/thumbs/i/zw/ZW4198A_68952b8a2d2a8_3600.jpg') center/cover no-repeat";
    }
    if(heroTitle) heroTitle.innerText = "Demo Hero Başlık";
    if(heroDesc) heroDesc.innerText = "Demo açıklama buraya gelecek.";
    if(heroLink) heroLink.href = "#";

    // Demo kategoriler
    const container = document.getElementById("categories");
    container.innerHTML = "";

    const demoCategories = [
        {
            title: "Kategori 1",
            items:[
                {img:"https://via.placeholder.com/200x280", link:"#"},
                {img:"https://via.placeholder.com/200x280", link:"#"},
            ]
        },
        {
            title: "Kategori 2",
            items:[
                {img:"https://via.placeholder.com/200x280", link:"#"},
                {img:"https://via.placeholder.com/200x280", link:"#"},
            ]
        }
    ];

    demoCategories.forEach(cat=>{
        const section = document.createElement("div");
        section.className = "category";

        const title = document.createElement("h2");
        title.className = "cat-title";
        title.innerText = cat.title;

        const row = document.createElement("div");
        row.className = "row";

        cat.items.forEach(item=>{
            const a = document.createElement("a");
            a.href = item.link;
            a.className = "card";
            a.innerHTML = `<img src="${item.img}">`;
            row.appendChild(a);
        });

        section.appendChild(title);
        section.appendChild(row);
        container.appendChild(section);
    });

    // Hero butonuna focus
    const heroBtn = document.querySelector('.hero-btn');
    if(heroBtn) heroBtn.focus();

});

/* ============================= */
/* TV KUMANDA KONTROL */
/* ============================= */

document.addEventListener('keydown', function(e){
    const key = e.key || e.keyCode;
    if(key === 'Enter' || key === 13 || key === 415 || key === 10009){
        const active = document.activeElement;

        if(active?.classList.contains('menu-btn') || active?.classList.contains('hero-btn')){
            active.click();
        }

        if(active?.classList.contains('card')){
            active.click();
        }
    }
});
