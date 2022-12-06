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
// const btnMoreInfo = document.querySelector(".more-info");
const modal = document.querySelector("#modal-detail");
const closeModal = document.querySelector("#close-modal");
const fixedNav = document.querySelector(".fixed-nav");
const banner = document.querySelector("#banner");

// NAV HEIGHT
// 20 -> selisih height 100px - 80px
const navHeight = fixedNav.clientHeight - 20;

// btnMoreInfo.addEventListener("click", (e) => {
//   modal.classList.remove("hidden");
//   body.classList.add("overflow-hidden");
// });

closeModal.addEventListener("click", () => {
  modal.classList.add("hidden");
  body.classList.remove("overflow-hidden");
});

window.addEventListener("DOMContentLoaded", (event) => {
  showBanner();
});
// window.addEventListener("scroll", () => console.log("scrolll", window.scrollY));
// NAV EVENT
window.addEventListener("scroll", () => {
  const scrollHeight = window.scrollY;
  navTransition(scrollHeight);
});

// *=======  FUNCTION =======
// NAV FUNC
function navTransition(scroll) {
  if (scroll > navHeight) {
    fixedNav.classList.add("bg-black");
    fixedNav.classList.add("drop-shadow");
  } else {
    fixedNav.classList.remove("bg-black");
    fixedNav.classList.remove("drop-shadow");
  }
}

const showBanner = () => {
  const headerArticle = document.createElement("article");
  headerArticle.classList.add(
    "h-screen",
    "md:h-[80vh]",
    "bg-[url('https://source.unsplash.com/random/600x600')]",
    "bg-no-repeat",
    "bg-center",
    "bg-cover",
    "relative"
  );

  const headerOverlay = document.createElement("div");
  headerOverlay.classList.add(
    "absolute",
    "inset-0",
    "bg-gradient-to-t",
    "from-black",
    "to-transparent"
  );

  const headerContainer = document.createElement("section");
  headerContainer.classList.add("container", "flex", "items-center", "h-full");

  const headerContent = document.createElement("article");
  headerContent.classList.add("z-[1]", "w-screen", "md:w-[50vw]");

  const bannerTitle = document.createElement("h1");
  bannerTitle.classList.add(
    "text-[36px]",
    "md:text-[48px]",
    "font-bold",
    "font-poppins"
  );
  bannerTitle.innerText = `The Crown`;

  const bannerDescription = document.createElement("p");
  bannerDescription.classList.add("pt-[20px]", "pb-[30px]");
  bannerDescription.innerText = `The gripping, decades-spanning inside story of Her Majesty Queen
                                Elizabeth II and the Prime Ministers who shaped Britain's post-war
                                destiny. The Crown tells the inside story of two of the most
                                famous addresses in the world – Buckingham Palace and 10 Downing
                                Street – and...`;

  const btnMoreInfo = document.createElement("button");
  btnMoreInfo.classList.add(
    "flex",
    "items-center",
    "gap-3",
    "bg-white",
    "bg-opacity-30",
    "hover:bg-opacity-20",
    "transition-all",
    "duration-300",
    "ease-in-out",
    "px-[20px]",
    "py-[8px]",
    "rounded-[5px]"
  );
  btnMoreInfo.innerHTML = `<span class="font-bold">More info</span>`;
  btnMoreInfo.addEventListener("click", () => console.log("addadadadadada"));

  headerContent.appendChild(bannerTitle);
  headerContent.appendChild(bannerDescription);
  headerContent.appendChild(btnMoreInfo);

  headerContainer.appendChild(headerContent);

  headerArticle.appendChild(headerOverlay);
  headerArticle.appendChild(headerContainer);

  banner.appendChild(headerArticle);
};
