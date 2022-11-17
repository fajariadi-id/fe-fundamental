import marquee from "vanilla-marquee";

import "./styles.css";

const sum = (a, b) => {
  return a + b;
};

console.log(sum(12, 3));

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

const API_URL =
  "https://api.themoviedb.org/3/movie/663712/videos?api_key=8474014efb37e489ad1a5299e6ae7a88&language=en-US";
const IMG_PATH =
  "https://image.tmdb.org/t/p/original/oFAukXiMPrwLpbulGmB5suEZlrm.jpg";
const SEARCH_API =
  "https://api.themoviedb.org/3/search/movie?api_key=8474014efb37e489ad1a5299e6ae7a88&query=";

async function getMovies(url) {
  const res = await fetch(url);
  const data = await res.json();

  console.log("data", data);
}

getMovies(API_URL);
