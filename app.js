const view = document.getElementById("view");
const fade = document.getElementById("fade");

const pages = {

    home: () => `
        <!--ANA RESİM-->
<div class="hero" id="hero">
    <div class="hero-overlay"></div>
    <div class="hero-content">
        <h1 id="hero-title"></h1>
        <p id="hero-desc"></p>
        <a id="hero-link" class="hero-btn">▶ İzle</a>
    </div>
</div>

<h2 id="cat-title"></h2>
<div id="categories"></div>

<h6 style="text-align: center;">Demo Version 0.0.4 &copy;HBBA2000</h6>
<br><br><br>
    `,

    movies: () => `
        <h1 style="padding:40px">🎬 Filmler</h1>
        <div class="row">
            ${cards()}
        </div>
    `,

    series: () => `
        <h1 style="padding:40px">📺 Diziler</h1>
        <div class="row">
            ${cards()}
        </div>
    `,

    fav: () => `
        <h1 style="padding:40px">❤️ Favoriler</h1>
        <div class="row" id="favRow"></div>
    `
};

function cards(){
    let html = "";
    for(let i=0;i<10;i++){
        html += `
            <a class="card" tabindex="0">
                <img src="https://images5.alphacoders.com/132/thumb-1920-1325003.jpeg">
            </a>
        `;
    }
    return html;
}

function go(page){
    fade.style.opacity = "1";

    setTimeout(()=>{
        view.innerHTML = pages[page]();
        fade.style.opacity = "0";
        focusFirst();

        // sadece home sayfasında initApp çalışsın
        if(page === "home"){
            initApp();
        }

    },300);
}

function focusFirst(){
    const el = document.querySelector('.menu-btn');
    if(el) el.focus();
}

/* TV ENTER */
document.addEventListener('keydown', e=>{
    if(e.key === 'Enter' || e.keyCode === 13){
        document.activeElement?.click();
    }
});



/*JAVA AYAR KODLARI*/

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

    splash.style.transition = "opacity 1s ease";
    splash.style.opacity = "0";

    setTimeout(()=>{
        splash.style.display = "none";
        appDiv.style.display = "block";

        // SPA başlat
        go('home');

    }, 1000);
}

/* Butona click */
document.getElementById("startBtn").addEventListener("click", startApp);


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
