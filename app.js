let appStarted = false;

function startApp(){
    if(appStarted) return;
    appStarted = true;

    /* #app’i hemen görünür yap */
    const appDiv = document.getElementById("app");
    appDiv.style.display = "block";

    /* Splash fade out */
    const splash = document.getElementById("splash");
    splash.style.opacity = "1";
    splash.style.pointerEvents = "none";

    setTimeout(()=>{
        splash.style.display = "none";

        // İlk kart focus ver
        const firstCard = document.querySelector('.card');
        if(firstCard) firstCard.focus();
    }, 600);
}

document.getElementById("startBtn").addEventListener("click", startApp);

document.addEventListener("keydown", e=>{
    if(!appStarted){
        if(e.key === "Enter" || e.keyCode === 13 || e.keyCode === 415 || e.keyCode === 10009){
            startApp();
        }
    }
});

/* TV KUMANDA KONTROL */
document.addEventListener('keydown', function(e){
    const key = e.key || e.keyCode;
    if(key === 'Enter' || key === 13 || key === 415 || key === 10009){
        const active = document.activeElement;
        if(active?.classList.contains('card')){
            alert("Seçilen Card: " + active.innerText);
        }
    }
});
