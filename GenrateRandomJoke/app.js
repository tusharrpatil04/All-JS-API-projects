let btn = document.querySelector(".btn");

btn.addEventListener("click", async () => {
  let joke = await getJoke();
  console.log(joke);
  let p = document.querySelector("p");
  p.innerText = joke;
});

let url = "https://icanhazdadjoke.com/";

async function getJoke() {
  try {
    let res = await axios.get(url, { headers: { Accept: "Application/json" } });
    return res.data.joke;
  } catch (err) {
    return "Joke Not Found 400!";
  }
}
