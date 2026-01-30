let appStarted = false;

function startApp(){
    if(appStarted) return;
    appStarted = true;

    console.log("APP START");

    /* #app’i aç */
    const appDiv = document.getElementById("app");
    appDiv.style.display = "block";

    /* Splash fade */
    const splash = document.getElementById("splash");
    splash.style.opacity = "0";
    splash.style.pointerEvents = "none";

    setTimeout(()=>{
        splash.style.display = "none";

        // Hero butonuna focus ver
        const heroBtn = document.querySelector('.hero-btn');
        if(heroBtn) heroBtn.focus();

    }, 600);
}

/* Buton */
document.getElementById("startBtn").addEventListener("click", startApp);

/* Kumanda Enter */
document.addEventListener("keydown", e=>{
    if(!appStarted){
        if(e.key === "Enter" || e.keyCode === 13 || e.keyCode === 415 || e.keyCode === 10009){
            startApp();
        }
    }
});

/* TV Enter kontrol */
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
