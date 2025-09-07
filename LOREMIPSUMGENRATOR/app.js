let genBtn = document.querySelector("#genBtn");
let copyBtn = document.querySelector(".copy");
let inp = document.querySelector("#number");
let result = document.querySelector(".result");

genBtn.addEventListener("click", async () => {
  let num = inp.value;
  let url = `https://api.api-ninjas.com/v1/loremipsum?paragraphs=${num}`;

  // Using Axios -->
  try {
    let res = await axios.get(url, {
      headers: {
        "X-Api-Key": "WF3p0rWvsFA0bNl4oMvJVg==dUI6XN0ogKoH6Bes",
      },
    });
    result.innerHTML = ""; // clear old content

    // If res.data.text is a string with \n, split by newline
    let paragraphs = res.data.text.split("\n");

    paragraphs.forEach((p) => {
      if (p.trim() !== "") {
        let para = document.createElement("p");
        para.textContent = p;
        result.appendChild(para);
      }
    });
  } catch (e) {
    console.log("error - ", e);
  }
});

copyBtn.addEventListener("click", () => {
  navigator.clipboard.writeText(result.innerText);
  alert("Text Copied to clipboard");
});

// Using fetch() -->
// // fetch(`https://api.api-ninjas.com/v1/loremipsum?paragraphs=${num}`, {
// //   headers: {
// //     "X-Api-Key": "WF3p0rWvsFA0bNl4oMvJVg==dUI6XN0ogKoH6Bes",
// //   },
// // })
// //   .then((res) => res.json())
// //   .then((data) => {
// //     let result = document.querySelector(".result");
// //     result.innerHTML = data.text;
// //   })
// //   .catch((err) => console.error(err));
