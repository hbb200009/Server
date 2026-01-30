/* ============================= */
/* APP DURUMU */
/* ============================= */
let appStarted = true; // Splash yok artık, direkt başladı

/* Sayfa açılır açılmaz çalışacak */
window.onload = () => {
    const appDiv = document.getElementById("app");
    appDiv.style.display = "block"; // app görünür olsun
    initApp();                     // hero ve category yükle
};

/* ============================= */
/* TV KUMANDA ENTER / OK */
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

/* ============================= */
/* APP MOTORU */
/* ============================= */
function initApp(){

    // İlk menüye focus
    const firstMenu = document.querySelector('.menu-btn');
    if(firstMenu) firstMenu.focus();

    // JSON verileri yükle
    fetch("https://raw.githubusercontent.com/hbb200009/Server/main/data.json?ts=" + Date.now())
    .then(res => res.json())
    .then(data => {

        // HERO
        const heroes = data.hero;
        const randHero = heroes[Math.floor(Math.random() * heroes.length)];

        const heroDiv = document.getElementById("hero");
        const heroTitle = document.getElementById("hero-title");
        const heroDesc = document.getElementById("hero-desc");
        const heroLink = document.getElementById("hero-link");

        if(heroDiv) heroDiv.style.background = `url('${randHero.image}') center/cover no-repeat`;
        if(heroTitle) heroTitle.innerText = randHero.title;
        if(heroDesc) heroDesc.innerText = randHero.desc;
        if(heroLink) heroLink.href = randHero.link;

        // KATEGORİLER
        const container = document.getElementById("categories");
        if(!container) return;
        container.innerHTML = "";

        data.categories.forEach(cat=>{
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

    })
    .catch(err=>{
        console.log("JSON ERROR:", err);
    });
}    })
    .catch(err=>{
        console.log("JSON ERROR:", err);
    });
}


/* ============================= */
/* TV KUMANDA KONTROL */
/* ============================= */

document.addEventListener('keydown', function(e){
    const key = e.key || e.keyCode;

    if(key === 'Enter' || key === 13 || key === 415 || key === 10009){
        const active = document.activeElement;

        if(active.classList.contains('menu-btn') || active.classList.contains('hero-btn')){
            active.click();
        }

        if(active.classList.contains('card')){
            active.click();
        }
    }
});
