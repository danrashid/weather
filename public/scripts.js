const dateEl = document.getElementById("date");
const sliderEl = document.getElementById("slider");
const canvasContext = document.getElementById("weather").getContext("2d");

const images = [];
let intervalID = -1;
let imageIndex = 0;

const render = async () => {
  const image = images[imageIndex];
  sliderEl.value = imageIndex;

  if (image !== undefined) {
    const bitmap = await window.createImageBitmap(image.blob);

    dateEl.innerText = image.date;
    canvasContext.drawImage(bitmap, 0, 0);
    canvasContext.fillStyle = "#c2eaf0";
    canvasContext.fillRect(40, 1350, 640, 150);
  }

  imageIndex = imageIndex === images.length - 1 ? 0 : imageIndex + 1;
};

new EventSource("/manifest.php").addEventListener("refresh", (event) => {
  const filenames = JSON.parse(event.data);
  images.length = filenames.length;
  sliderEl.max = filenames.length - 1;

  filenames.forEach(async (filename, index) => {
    try {
      const response = await fetch(`/images/${filename}.gif`);
      const blob = await response.blob();
      const date = new Date(
        response.headers.get("Last-Modified")
      ).toLocaleString(undefined, { timeStyle: "short" });

      images[index] = {
        blob,
        date,
      };
    } catch (error) {
      console.error(error);
    }
  });

  window.clearInterval(intervalID);
  intervalID = window.setInterval(render, 200);
});

if (window.location.hash) {
  const [x, y] = window.location.hash.replace(/^#/, "").split(",").map(Number);

  window.scrollTo(x - window.innerWidth / 2, y - window.innerHeight / 2);
}

let timeoutID = -1;
window.addEventListener("scroll", (event) => {
  window.clearTimeout(timeoutID);
  timeoutID = window.setTimeout(() => {
    window.location.replace(
      `#${[
        window.innerWidth / 2 + window.scrollX,
        window.innerHeight / 2 + window.scrollY,
      ].map(Math.round)}`
    );
  }, 500);
});

sliderEl.addEventListener("input", (event) => {
  window.clearInterval(intervalID);
  imageIndex = Number(event.target.value);
  render();
});

sliderEl.addEventListener("change", (event) => {
  imageIndex = Number(event.target.value);
  render();
  window.setTimeout(() => {
    intervalID = window.setInterval(render, 200);
  }, 2000);
});
