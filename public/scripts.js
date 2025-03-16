const dateEl = document.getElementById("date");
const progressEl = document.getElementById("progress");
const canvasContext = document.getElementById("weather").getContext("2d");

const images = [];
let intervalID = -1;
let imageIndex = 0;

const MINUTE = 1000 * 60;
const HOUR = MINUTE * 60;

const render = async () => {
  const image = images[imageIndex];
  progressEl.value = imageIndex;

  if (image !== undefined) {
    const bitmap = await window.createImageBitmap(image.blob);
    const milliseconds = Date.now() - image.date;
    const hours = Math.floor(milliseconds / HOUR);
    const minutes = Math.floor(
      (milliseconds - hours * HOUR) / MINUTE
    ).toString();

    dateEl.innerText = `T-${hours}h:${
      minutes.length === 1 ? "0" : ""
    }${minutes}m`;
    canvasContext.drawImage(bitmap, 0, 0);
    canvasContext.fillStyle = "#c2eaf0";
    canvasContext.fillRect(40, 1350, 640, 150);
  }

  imageIndex = imageIndex === images.length - 1 ? 0 : imageIndex + 1;
};

new EventSource("/manifest.php").addEventListener("refresh", (event) => {
  const filenames = JSON.parse(event.data);
  images.length = filenames.length;
  progressEl.max = filenames.length - 1;

  filenames.forEach(async (filename, index) => {
    try {
      const response = await fetch(`/images/${filename}.gif`);
      const blob = await response.blob();
      const date = new Date(response.headers.get("Last-Modified")).valueOf();

      images[index] = {
        blob,
        date,
      };
    } catch (error) {
      console.error(error);
    }
  });

  window.clearInterval(intervalID);
  intervalID = window.setInterval(render, 100);
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
