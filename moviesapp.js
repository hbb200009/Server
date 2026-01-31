let videoUrl = "";
const params = new URLSearchParams(window.location.search);
const movieId = params.get("id");

fetch("https://raw.githubusercontent.com/hbb200009/Server/main/data.json")
.then(res => res.json())
.then(data => {

  const movie = data.movies.find(m => m.id === movieId);
  if(!movie){
  alert("Film bulunamadı");
  return;
}
  videoUrl = movie.video;

  document.getElementById("bg").style.backgroundImage = `url('${movie.poster}')`;
  document.getElementById("title").innerText = movie.title;
  document.getElementById("meta").innerText = `${movie.year} • ${movie.duration}`;
  document.getElementById("desc").innerText = movie.desc;

  const epDiv = document.getElementById("episodes");

  if(movie.episodes.length === 0){
    epDiv.innerHTML = "<h2></h2>";
  }else{
    movie.episodes.forEach(ep=>{
      epDiv.innerHTML += `
        <div class="episode">
          <img src="${ep.img}">
          <div>
            <b>${ep.title}</b><br>
            ${ep.duration}
          </div>
        </div>
      `;
    });
  }

});

function play(){
  const player = document.getElementById("player");
  const video = document.getElementById("video");

  video.src = videoUrl;
  player.style.display = "block";
  video.requestFullscreen?.();
}

document.addEventListener("keydown", e=>{
  if(e.key === "Escape" || e.keyCode === 10009){
    document.getElementById("player").style.display = "none";
    document.getElementById("video").pause();
  }
});
