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
const IMG_PATH = "https://image.tmdb.org/t/p/original";
const SEARCH_API =
  "https://api.themoviedb.org/3/search/movie?api_key=8474014efb37e489ad1a5299e6ae7a88&query=";

const NOW_PLAYING = `https://api.themoviedb.org/3/movie/now_playing?api_key=8474014efb37e489ad1a5299e6ae7a88&language=en-US&page=${Math.ceil(
  Math.random() * 10
)}`;

const body = document.querySelector("body");
// const btnMoreInfo = document.querySelector(".more-info");
const modal = document.querySelector("#modal-detail");
const closeModal = document.querySelector("#close-modal");
const fixedNav = document.querySelector(".fixed-nav");
const banner = document.querySelector("#banner");

// NAV HEIGHT
// 20 -> selisih height 100px - 80px
const navHeight = fixedNav.clientHeight - 20;

closeModal.addEventListener("click", () => {
  modal.classList.add("hidden");
  body.classList.remove("overflow-hidden");
});

window.addEventListener("DOMContentLoaded", (event) => {
  getBanner();
});
window.addEventListener("scroll", () => {
  const scrollHeight = window.scrollY;
  navTransition(scrollHeight);
});

function navTransition(scroll) {
  if (scroll > navHeight) {
    fixedNav.classList.add("bg-black");
    fixedNav.classList.add("drop-shadow");
  } else {
    fixedNav.classList.remove("bg-black");
    fixedNav.classList.remove("drop-shadow");
  }
}

const showBanner = (data) => {
  const { backdrop_path, title, original_title, overview } = data;
  const headerArticle = document.createElement("article");
  headerArticle.classList.add(
    "h-screen",
    "md:h-[80vh]",
    "bg-no-repeat",
    "bg-center",
    "bg-cover",
    "relative"
  );
  headerArticle.style.backgroundImage = `url('${IMG_PATH + backdrop_path}')`;

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
    "font-poppins",
    "leading-none"
  );
  bannerTitle.innerText = title ? title : original_title;

  const bannerDescription = document.createElement("p");
  bannerDescription.classList.add("pt-[20px]", "pb-[30px]");
  bannerDescription.innerText =
    overview.length <= 200 ? overview : overview.substr(0, 200) + "...";

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
  btnMoreInfo.addEventListener("click", () => {
    modal.classList.remove("hidden");
    body.classList.add("overflow-hidden");
  });

  headerContent.appendChild(bannerTitle);
  headerContent.appendChild(bannerDescription);
  headerContent.appendChild(btnMoreInfo);

  headerContainer.appendChild(headerContent);

  headerArticle.appendChild(headerOverlay);
  headerArticle.appendChild(headerContainer);

  banner.appendChild(headerArticle);
};

const getBanner = async () => {
  try {
    // ::
    const res = await fetch(NOW_PLAYING);
    const data = await res.json();

    const bannerData =
      data.results[Math.round(Math.random() * data.results.length)];
    showBanner(bannerData);
  } catch (error) {
    console.error("fetch -> getBanner", error);
  }
};
