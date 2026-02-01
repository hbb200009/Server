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
        <h6 style="text-align: center;">Demo Version 0.0.5 &copy;HBBA2000</h6>
        <br><br><br>
    `,

    movies: () => `
         <!--FILMLER RESİM-->
        <div class="heroMovies" id="hero2">
            <div class="heroMovies-overlay"></div>
        </div>
        <h2 id="cat-title2" style="margin-top: -10%;"></h2>
        <div id="categories2"></div>
        
    `,

    series: () => `
        <!--DIZILER RESİM-->
        <div class="heroMovies" id="hero3">
            <div class="heroMovies-overlay"></div>
        </div>
        <h2 id="cat-title3" style="margin-top: -10%;"></h2>
        <div id="categories3"></div>
        
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
    const fade = document.getElementById("fade");
    fade.style.opacity = "1";

    setTimeout(()=>{
        view.innerHTML = pages[page]();
        fade.style.opacity = "0";
        focusFirst();
        initApp();

        // sadece home sayfasında initApp çalışsın
        if(page === "home"){
            initApp();
        }

    },100);
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
function init(){
  console.log("INIT ÇALIŞTI");
  // her ne başlatıyosan burda
    startApp();
    initApp();
    go('home');
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}
/* ============================= */
/* Başlatma Fonksiyonu (Splash ile) */
/* ============================= */
function startApp(){
    if(appStarted) return;
    appStarted = true;

    const appDiv = document.getElementById("app");
    

    setTimeout(()=>{
        appDiv.style.display = "block";

        // SPA başlat
        go('home');

    }, 100);
}

/* Butona click */



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
        
        // HERO MOVIES
        const heroes2 = data.hero2;
        const randHero2 = heroes2[Math.floor(Math.random() * heroes2.length)];

        const hero2Div = document.getElementById("hero2");
        

        if(hero2Div) hero2Div.style.background = `url('${randHero2.image}') center/cover no-repeat`;
        
        // HERO SERIES
        const heroes3 = data.hero3;
        const randHero3 = heroes3[Math.floor(Math.random() * heroes3.length)];

        const hero3Div = document.getElementById("hero3");
        

        if(hero3Div) hero3Div.style.background = `url('${randHero3.image}') center/cover no-repeat`;
        

        // HOME kategorileri
const container = document.getElementById("categories");
if(container){
    container.innerHTML = "";

    data.categories.forEach(cat=>{
        const section = document.createElement("div");

        const title = document.createElement("h2");
        title.innerText = cat.title;

        const row = document.createElement("div");
        row.className = "row";

        cat.items.forEach(item=>{
            const a = document.createElement("a");
            a.className = "card";
            a.href = item.link;
            a.innerHTML = `<img src="${item.image}">`;
            row.appendChild(a);
        });

        section.appendChild(title);
        section.appendChild(row);
        container.appendChild(section);
    });
}
        
        // MOVIES kategorileri
        const container2 = document.getElementById("categories2");
if(container2){
    container2.innerHTML = "";

    data.categories2.forEach(cat=>{
        const section = document.createElement("div");

        const title2 = document.createElement("h2");
        title2.innerText = cat.title;

        const row = document.createElement("div");
        row.className = "row";

        cat.items.forEach(item=>{
            const a = document.createElement("a");
            a.className = "card";
            a.href = item.link;
            a.innerHTML = `<img src="${item.image}">`;
            row.appendChild(a);
        });

        section.appendChild(title2);
        section.appendChild(row);
        container2.appendChild(section);
    });
}
        
        // SERIES kategorileri
        const container3 = document.getElementById("categories3");
if(container3){
    container3.innerHTML = "";

    data.categories3.forEach(cat=>{
        const section = document.createElement("div");

        const title3 = document.createElement("h2");
        title3.innerText = cat.title;

        const row = document.createElement("div");
        row.className = "row";

        cat.items.forEach(item=>{
            const a = document.createElement("a");
            a.className = "card";
            a.href = item.link;
            a.innerHTML = `<img src="${item.image}">`;
            row.appendChild(a);
        });

        section.appendChild(title3);
        section.appendChild(row);
        container3.appendChild(section);
    });
}

        document.querySelectorAll(".row").forEach(row=>{
    initRowLoop(row);
});
        
        })
    
    .catch(err=>{
        console.log("JSON ERROR:", err);
    });
}

function initRowLoop(row) {
    const cards = Array.from(row.children);
    if (cards.length === 0) return;

    // 1. Kopyalama Mantığı (Daha güvenli döngü için)
    cards.forEach(c => row.appendChild(c.cloneNode(true)));
    cards.forEach(c => row.appendChild(c.cloneNode(true)));

    const allCards = Array.from(row.children);
    const originalCount = cards.length;
    const cardWidth = cards[0].offsetWidth + 20; // gap dahil

    // Başlangıçta ortadaki gruba odaklan
    row.scrollLeft = cardWidth * originalCount;

    // 2. Kartlara Focus Özelliği Ekle (Kumanda için şart)
    allCards.forEach((card, index) => {
        card.tabIndex = 0; // Kumanda ile seçilebilir yapar

        card.addEventListener("focus", () => {
            // Kartı Row içinde yatayda ortala
            const rowWidth = row.offsetWidth;
            const cardOffset = card.offsetLeft;
            const targetScroll = Math.max(3, cardOffset);
            
            row.scrollTo({
                left: targetScroll,
                behavior: "smooth"
            });

            // 3. Sonsuz Döngü Kontrolü (Focus anında)
            handleInfiniteLoop(index);
        });
    });

    function handleInfiniteLoop(currentIndex) {
        // Eğer kullanıcı ilk kopyalanan gruba geçtiyse, ortadaki gruba atlat
        if (currentIndex < originalCount) {
            setTimeout(() => {
                allCards[currentIndex + originalCount].focus({ preventScroll: true });
            }, 300);
        } 
        // Eğer kullanıcı son kopyalanan gruba geçtiyse, ortadaki gruba geri çek
        else if (currentIndex >= originalCount * 2) {
            setTimeout(() => {
                allCards[currentIndex - originalCount].focus({ preventScroll: true });
            }, 300);
        }
    }
}
