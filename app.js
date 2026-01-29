let appStarted = false;

function startApp(){
    if(appStarted) return;
    appStarted = true;

    console.log("APP START");

    initApp();   // 🔥 ARTIK HER ŞEY BURDA ÇALIŞACAK

    /* Fade out splash */
    const splash = document.getElementById("splash");
    splash.style.opacity = "0";
    splash.style.pointerEvents = "none";

    setTimeout(()=>{
        splash.style.display = "none";
        document.getElementById("app").style.display = "block";
    }, 600);
}

/* Buton click */
document.getElementById("startBtn").addEventListener("click", startApp);

/* TV kumanda Enter / OK */
document.addEventListener("keydown", e=>{
    if(!appStarted){
        if(e.key === "Enter" || e.keyCode === 13 || e.keyCode === 415 || e.keyCode === 10009){
            startApp();
        }
    }
});

/* ============================= */
/* 🔥 GERÇEK APP MOTORU */
/* ============================= */

function initApp(){

    /* İlk menüye focus */
    const firstMenu = document.querySelector('.menu-btn');
    if(firstMenu) firstMenu.focus();

    /* JSON LOAD */
    fetch("https://raw.githubusercontent.com/hbb200009/Server/main/data.json?ts=" + Date.now())
    .then(res => res.json())
    .then(data => {

        /* HERO RANDOM */
        const heroes = data.hero;
        const randHero = heroes[Math.floor(Math.random() * heroes.length)];

        const heroDiv = document.getElementById("hero");
        const heroTitle = document.getElementById("hero-title");
        const heroDesc = document.getElementById("hero-desc");
        const heroLink = document.getElementById("hero-link");

        heroDiv.style.background = `url('${randHero.image}') center/cover no-repeat`;
        heroTitle.innerText = randHero.title;
        heroDesc.innerText = randHero.desc;
        heroLink.href = randHero.link;

        /* 🔥 TÜM KATEGORİLER */
        const container = document.getElementById("categories");
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
