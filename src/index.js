import marquee from "vanilla-marquee";
import "./styles.css";

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

const COMING_SOON_1 =
  "https://api.themoviedb.org/3/movie/upcoming?api_key=8474014efb37e489ad1a5299e6ae7a88&language=en-US&page=1";
const COMING_SOON_2 =
  "https://api.themoviedb.org/3/movie/upcoming?api_key=8474014efb37e489ad1a5299e6ae7a88&language=en-US&page=2";
const COMING_SOON_3 =
  "https://api.themoviedb.org/3/movie/upcoming?api_key=8474014efb37e489ad1a5299e6ae7a88&language=en-US&page=3";

const body = document.querySelector("body");
// const btnMoreInfo = document.querySelector(".more-info");
const modal = document.querySelector("#modal-detail");
const closeModal = document.querySelector("#close-modal");
const fixedNav = document.querySelector(".fixed-nav");
const banner = document.querySelector("#banner");
const comingSoon = document.querySelector("#coming-soon");

// NAV HEIGHT
// 20 -> selisih height 100px - 80px
const navHeight = fixedNav.clientHeight - 20;

closeModal.addEventListener("click", () => {
  modal.classList.add("hidden");
  body.classList.remove("overflow-hidden");
});

window.addEventListener("DOMContentLoaded", (event) => {
  getBanner();
  getComingSoon();
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

const generateRow = (container, row) => {
  row.forEach((movie, index) => {
    const poster = document.createElement("div");
    poster.classList.add(
      "w-[200px]",
      "h-[100px]",
      "md:w-[250px]",
      "md:h-[130px]",
      "py-[10px]",
      "px-[25px]",
      "rounded-[15px]",
      "bg-red",
      "relative",
      "bg-gradient-to-b",
      "from-red",
      "to-orange"
    );

    const img = document.createElement("img");
    img.classList.add(
      "block",
      "w-full",
      "h-full",
      "object-cover",
      "rounded-[10px]"
    );
    img.alt = movie.title;
    img.src = IMG_PATH + movie.backdrop_path;

    const leftDots = document.createElement("div");
    leftDots.classList.add(
      "absolute",
      "left-[-2.5px]",
      "top-[7.5px]",
      "md:left-[-5px]",
      "md:top-[10px]",
      "z-[1]"
    );
    leftDots.innerHTML = `
      <div class="w-[5px] h-[5px] md:w-[10px] md:h-[10px] bg-black rounded-full mt-[10px]"></div>
      <div class="w-[5px] h-[5px] md:w-[10px] md:h-[10px] bg-black rounded-full mt-[10px]"></div>
      <div class="w-[5px] h-[5px] md:w-[10px] md:h-[10px] bg-black rounded-full mt-[10px]"></div>
      <div class="w-[5px] h-[5px] md:w-[10px] md:h-[10px] bg-black rounded-full mt-[10px]"></div>
      <div class="w-[5px] h-[5px] md:w-[10px] md:h-[10px] bg-black rounded-full mt-[10px]"></div>
    `;

    const rightDots = document.createElement("div");
    rightDots.classList.add(
      "absolute",
      "right-[-2.5px]",
      "top-[7.5px]",
      "md:right-[-5px]",
      "md:top-[10px]",
      "z-[1]"
    );
    rightDots.innerHTML = `
      <div class="w-[5px] h-[5px] md:w-[10px] md:h-[10px] bg-black rounded-full mt-[10px]"></div>
      <div class="w-[5px] h-[5px] md:w-[10px] md:h-[10px] bg-black rounded-full mt-[10px]"></div>
      <div class="w-[5px] h-[5px] md:w-[10px] md:h-[10px] bg-black rounded-full mt-[10px]"></div>
      <div class="w-[5px] h-[5px] md:w-[10px] md:h-[10px] bg-black rounded-full mt-[10px]"></div>
      <div class="w-[5px] h-[5px] md:w-[10px] md:h-[10px] bg-black rounded-full mt-[10px]"></div>
      <div class="w-[5px] h-[5px] md:w-[10px] md:h-[10px] bg-black rounded-full mt-[10px]"></div>
      `;

    poster.appendChild(img);
    poster.appendChild(rightDots);
    if (index === 0) poster.appendChild(leftDots);

    container.appendChild(poster);
  });
};

const showComingSoon = (data) => {
  const { row_1, row_2, row_3 } = data;

  const comingSoonRow1 = document.createElement("article");
  comingSoonRow1.classList.add("overflow-hidden");

  const comingSoonRow2 = document.createElement("article");
  comingSoonRow2.classList.add("overflow-hidden", "mt-[10px]");

  const comingSoonRow3 = document.createElement("article");
  comingSoonRow3.classList.add("overflow-hidden", "mt-[10px]");

  const posterContainerRow1 = document.createElement("div");
  posterContainerRow1.classList.add("flex");

  const posterContainerRow2 = document.createElement("div");
  posterContainerRow2.classList.add("flex");

  const posterContainerRow3 = document.createElement("div");
  posterContainerRow3.classList.add("flex");

  generateRow(posterContainerRow1, row_1);
  generateRow(posterContainerRow2, row_2);
  generateRow(posterContainerRow3, row_3);

  comingSoonRow1.appendChild(posterContainerRow1);
  comingSoonRow2.appendChild(posterContainerRow2);
  comingSoonRow3.appendChild(posterContainerRow3);

  comingSoon.appendChild(comingSoonRow1);
  comingSoon.appendChild(comingSoonRow2);
  comingSoon.appendChild(comingSoonRow3);

  new marquee(comingSoonRow1, {
    duplicated: true,
    gap: 0,
    speed: 50,
    startVisible: true,
  });

  new marquee(comingSoonRow2, {
    duplicated: true,
    gap: 0,
    speed: 50,
    startVisible: true,
    direction: "right",
  });

  new marquee(comingSoonRow3, {
    duplicated: true,
    gap: 0,
    speed: 100,
    startVisible: true,
  });
};

const getBanner = async () => {
  try {
    const res = await fetch(NOW_PLAYING);
    const data = await res.json();

    const bannerData =
      data.results[Math.round(Math.random() * data.results.length)];
    showBanner(bannerData);
  } catch (error) {
    console.error("fetch -> getBanner", error);
  }
};

const getComingSoon = async () => {
  try {
    const res1 = await fetch(COMING_SOON_1);
    const data1 = await res1.json();

    const res2 = await fetch(COMING_SOON_2);
    const data2 = await res2.json();

    const res3 = await fetch(COMING_SOON_3);
    const data3 = await res3.json();

    const data = {
      row_1: data1.results,
      row_2: data2.results,
      row_3: data3.results,
    };

    showComingSoon(data);
  } catch (error) {
    console.error("fetch -> getBanner", error);
  }
};
