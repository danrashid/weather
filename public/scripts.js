const countdownEl = document.getElementById("countdown");
const progressEl = document.getElementById("progress");
const weatherEl = document.getElementById("weather");

let renderIntervalId = -1;
let scrollTimeoutId = -1;

const renderCountdown = (filemtime) => {
  const MINUTE = 1000 * 60;
  const HOUR = MINUTE * 60;

  const milliseconds = Date.now() - filemtime * 1000;
  const hours = Math.floor(milliseconds / HOUR);
  const minutes = Math.floor((milliseconds - hours * HOUR) / MINUTE).toString();

  countdownEl.innerText = `T-${hours}h:${minutes.toString().padStart(2, 0)}m`;
};

const render = (images) => {
  let index = 0;

  return async () => {
    const { src, filemtime } = images[index];

    weatherEl.src = await src;
    renderCountdown(filemtime);
    progressEl.value = index;
    index = index === images.length - 1 ? 0 : index + 1;
  };
};

new EventSource("/manifest.php").addEventListener("refresh", (event) => {
  const images = JSON.parse(event.data).map(([filename, filemtime]) => ({
    src: fetch(`/images/${filename}.gif`)
      .then((response) => response.blob())
      .then((blob) => URL.createObjectURL(blob)),
    filemtime,
  }));

  progressEl.max = images.length - 1;
  window.clearInterval(renderIntervalId);
  renderIntervalId = window.setInterval(render(images), 100);
});

if (window.location.hash) {
  const [x, y] = window.location.hash.replace(/^#/, "").split(",").map(Number);
  window.scrollTo(x - window.innerWidth / 2, y - window.innerHeight / 2);
}

const handlScroll = () => {
  window.location.replace(
    `#${[
      window.innerWidth / 2 + window.scrollX,
      window.innerHeight / 2 + window.scrollY,
    ].map(Math.round)}`
  );
};

window.addEventListener("scroll", () => {
  window.clearTimeout(scrollTimeoutId);
  scrollTimeoutId = window.setTimeout(handlScroll, 500);
});
