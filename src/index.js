import marquee from "vanilla-marquee";
import "./styles.css";

new marquee(document.getElementById("coming-soon-1"), {
  duplicated: true,
  gap: 0,
  speed: 50,
  startVisible: true,
});

new marquee(document.getElementById("coming-soon-2"), {
  duplicated: true,
  gap: 0,
  speed: 50,
  startVisible: true,
  direction: "right",
});

new marquee(document.getElementById("coming-soon-3"), {
  duplicated: true,
  gap: 0,
  speed: 100,
  startVisible: true,
});

// !======= API =======*
// !:: -> now playing -> https://api.themoviedb.org/3/movie/now_playing?api_key=8474014efb37e489ad1a5299e6ae7a88&language=en-US&page=1
// !:: -> upcoming -> https://api.themoviedb.org/3/movie/upcoming?api_key=8474014efb37e489ad1a5299e6ae7a88&language=en-US&page=1
// !:: -> recommendations -> https://api.themoviedb.org/3/movie/${id}/recommendations?api_key=${process.env.REACT_APP_TMDB_PUBLIC_KEY}&language=en-US&page=1
// !:: -> similar -> https://api.themoviedb.org/3/movie/${id}/similar?api_key=8474014efb37e489ad1a5299e6ae7a88&language=en-US&page=1
// !:: -> search -> https://api.themoviedb.org/3/search/movie?api_key=8474014efb37e489ad1a5299e6ae7a88&query=${}
// !:: -> img_path -> https://image.tmdb.org/t/p/original${}
// !:: -> videos -> https://api.themoviedb.org/3/movie/663712/videos?api_key=8474014efb37e489ad1a5299e6ae7a88&language=en-US
// !:: -> detail -> https://api.themoviedb.org/3/movie/663712?api_key=8474014efb37e489ad1a5299e6ae7a88&language=en-US
// !:: -> credits -> https://api.themoviedb.org/3/movie/663712/credits?api_key=8474014efb37e489ad1a5299e6ae7a88&language=en-US
const API_URL1 =
  "https://api.themoviedb.org/3/movie/663712?api_key=8474014efb37e489ad1a5299e6ae7a88&language=en-US";
const API_URL2 =
  "https://api.themoviedb.org/3/movie/663712/credits?api_key=8474014efb37e489ad1a5299e6ae7a88&language=en-US";
const IMG_PATH =
  "https://image.tmdb.org/t/p/original/oFAukXiMPrwLpbulGmB5suEZlrm.jpg";
const SEARCH_API =
  "https://api.themoviedb.org/3/search/movie?api_key=8474014efb37e489ad1a5299e6ae7a88&query=";

async function getMovies(url1, url2) {
  const res = await fetch(url1);
  const data = await res.json();

  const results = await fetch(url2);
  const credits = await results.json();

  console.log("data", data);
  console.log("credits", credits);
}

getMovies(API_URL1, API_URL2);

const body = document.querySelector("body");
const btnMoreInfo = document.querySelector(".more-info");
const modal = document.querySelector("#modal-detail");
const closeModal = document.querySelector("#close-modal");

btnMoreInfo.addEventListener("click", (e) => {
  modal.classList.remove("hidden");
  body.classList.add("overflow-hidden");
});

closeModal.addEventListener("click", () => {
  modal.classList.add("hidden");
  body.classList.remove("overflow-hidden");
});
