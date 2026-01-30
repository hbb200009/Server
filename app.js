let appStarted = false;

/* Sayfa açılınca app gizli, splash görünür */
window.onload = () => {
    const appDiv = document.getElementById("app");
    appDiv.style.display = "none";
};

/* ============================= */
/* Başlatma Fonksiyonu (Splash ile) */
/* ============================= */
function startApp(){
    if(appStarted) return;
    appStarted = true;

    const appDiv = document.getElementById("app");
    const splash = document.getElementById("splash");

    // Splash’i gizle, app’i göster
    

    setTimeout(()=>{
        splash.style.transition = "opacity 1s ease";
        splash.style.opacity = "0";
        appDiv.style.display = "block";
        // App motorunu başlat
        initApp();

        // İlk menüye veya ilk karta focus verebilirsin
        const firstMenu = document.querySelector('.menu-btn');
        if(firstMenu) firstMenu.focus();
    }, 500);}

/* Butona click */
document.getElementById("startBtn").addEventListener("click", startApp);
document.getElementById("startBtn").addEventListener("click", initApp);


/* TV kumanda ile Enter / OK */
document.addEventListener("keydown", e=>{
    if(!appStarted && (e.key === "Enter" || e.keyCode === 13 || e.keyCode === 415 || e.keyCode === 10009)){
        startApp();
    }
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

/* ============================= */
/* APP MOTORU (JSON Çekme & Hero + Category) */
/* ============================= */
function initApp(){

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
}
