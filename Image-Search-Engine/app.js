let accessKey = "Y3IhFRYkfJquIkwYW0a-93UbcTyLW0hQJsW121zs7hA";

let input = document.querySelector(".search-box");
let searchBtn = document.querySelector(".search-btn");
let results = document.querySelector(".results");
let imagesList = document.querySelector(".images-list");
let loadMore = document.querySelector(".load-more");

let page = 1;
let query = "birds";
let url = `https://api.unsplash.com/search/photos?page=1&query=${query}&client_id=${accessKey}`;

async function fetchImages() {
  try {
    let response = await fetch(url);
    let data = await response.json();
    // console.log(data);

    for (let i = 0; i < data.results.length; i++) {
      let image = document.createElement("img");
      image.src = data.results[i].urls.small;
      image.alt = data.results[i].alt_description;
      imagesList.appendChild(image);
      // console.log(data.results[i].links.download);
    }
  } catch (error) {
    console.log(error);
  }
}

searchBtn.addEventListener("click", (e) => {
  e.preventDefault();
  page = 1;
  query = input.value;
  imagesList.innerHTML = "";
  url = `https://api.unsplash.com/search/photos?page=${page}&query=${query}&client_id=${accessKey}`;
  fetchImages(url);
  results.style.display = "block";
  imagesList.style.visibility = "visible";
  loadMore.style.visibility = "visible";
  results.style.visibility = "visible";
});

loadMore.addEventListener("click", () => {
  page++;
  url = `https://api.unsplash.com/search/photos?page=${page}&query=${query}&client_id=${accessKey}`;
  fetchImages(url);
});
