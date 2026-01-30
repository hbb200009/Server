let appStarted = false;

function startApp(){
    if(appStarted) return;
    appStarted = true;

    /* Fade out splash */
    const splash = document.getElementById("splash");
    splash.style.opacity = "0";
    splash.style.pointerEvents = "none";

    setTimeout(()=>{
        splash.style.display = "none";
        document.getElementById("app").style.display = "block";
        // İlk menü veya kart focus ver
        const firstCard = document.querySelector('.card');
        if(firstCard) firstCard.focus();
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
