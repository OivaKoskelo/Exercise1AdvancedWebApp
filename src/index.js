import "./styles.css";

if (document.readyState !== "loading") {
  initializeCode();
} else {
  document.addEventListener("DOMContentLoaded", function () {
    initializeCode();
  });
}

function initializeCode() {
  createDogs("Beagle");
  createDogs("Malamute");
  createDogs("Husky");
  createDogs("Doberman");
  createDogs("Pug");
}

// Watched this YouTube video about createElement(): https://www.youtube.com/watch?v=umHdBuTw98c&ab_channel=AngelaDelise
// To understand how the template was done.

function createDogs(breed) {
  const divContainer = document.getElementsByClassName("container");
  let wikiItem = document.createElement("div");
  let wikiHeader = document.createElement("h1");
  let wikiContent = document.createElement("div");
  let wikiText = document.createElement("p");
  let imgContainer = document.createElement("div");
  let wikiImg = document.createElement("img");

  async function getPictures() {
    const url =
      "https://dog.ceo/api/breed/" + breed.toLowerCase() + "/images/random";
    const picturePromise = await fetch(url);
    const pictureJSON = await picturePromise.json();
    wikiImg.setAttribute("src", pictureJSON.message);
  }
  getPictures();

  wikiItem.classList.add("wiki-item");
  wikiHeader.classList.add("wiki-header");
  wikiHeader.innerText = breed;

  wikiContent.classList.add("wiki-content");
  wikiText.classList.add("wiki-text");

  imgContainer.classList.add("img-container");
  wikiImg.classList.add("wiki-img");

  async function getInfo() {
    const url = "https://en.wikipedia.org/api/rest_v1/page/summary/" + breed;
    const infoPromise = await fetch(url);
    const infoJSON = await infoPromise.json();
    wikiText.innerText = infoJSON.extract;
  }
  getInfo();
  divContainer[0].appendChild(wikiItem);
  wikiItem.appendChild(wikiHeader);
  wikiItem.appendChild(wikiContent);
  wikiContent.appendChild(wikiText);
  wikiContent.appendChild(imgContainer);
  imgContainer.appendChild(wikiImg);
}
