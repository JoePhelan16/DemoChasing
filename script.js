const data = [
    {
        place:'Texas - USA',
        title:'Far West',
        title2:'Texas',
        description:'The Far West Texas Series is an ongoing collection of photographs captured in the Chihuahuan Desert area of Texas. West Texas is famous for its glorious sunsets. Its always worth a visit for that alone. But the magic of this remote area will keep you returning for years to come. Ashleys family roots are in West Texas so shes familiar with this magic and call of the desert. Consistent with her other series she plays with multiple exposures and shoots with a variety of cameras. Often aerial trips are taken to get closer to mountain tops, enjoy different vantage points and the dazzling landscape below. She also leans into heating certain films to create bold colors seen in Pink Marfa Ocotillo, Ruby and Pink Marfa Agave.',
        image:'https://assets.codepen.io/12786872/Prada_Final+%281%29.jpg'
    },
    {
        place:'',
        title:'Ruby',
        title2:'Rising',
        description:'The Ruby Rising Series is an evolution for Ashley as she adds a human element into her landscapes. Including a model within the landscape is an opportunity to both control a technical element, as Ashley can direct the model while still allowing the flow and uncontrollable aspect of nature to envelope the image.  Ruby is Ashley’s God Daughter whom she has been photographing since Ruby was a child.  Their loving, easy relationship takes shape and is displayed through this collection.',
        image:'https://assets.codepen.io/12786872/RubyRising_final.jpg'
    },
    {
        place:'',
        title:'Chasing',
        title2:'The Suns',
        description:'Chasing The Suns was inspired by a dream Ashley had in the Summer of 2016. In it, there were multiple moons and suns in the sky above the ocean which rose and set rapidly. She took this inspiration as a challenge to play even more with multiple exposures, long exposures and heated film. In contrast to her 7am Series which evokes quiet moments of and around the ocean, CTS is more vibrant striving to reimagine the vibrancy of her dream. As with many of her collections this series is ongoing and Ashley continues to add images from time to time.',
        image:'https://assets.codepen.io/12786872/DreamSuns3_final.jpg'
    },
    {
        place:'',
        title:'7AM',
        title2:'Series',
        description:'The 7AM Series was started in August 2014. Ashley started photographing the sunrise at any location she was working. Starting in Venice, California, she continued shooting this way for several years. This series is added to from time to time and it’s grown from a series at sunrise to specifically sunrise over the bodies of water. This series remains visually quieter than Ashley’s Chasing The Suns series.',
        image:'https://assets.codepen.io/12786872/surfers5.jpg'
    },
    {
        place:'',
        title:'Recent',
        title2:'Work',
        description:'Throughout the years while on assignment or shooting for another project, I often capture a moment or create an image that I love but doesn’t quite fit within an existing series. The land in here The Shop until I can find them a proper home.',
        image:'https://assets.codepen.io/12786872/EiffelTowerFlip_final.jpg'
    },
]

const _ = (id)=>document.getElementById(id)
const cards = data.map((i, index)=>`<div class="card" id="card${index}" style="background-image:url(${i.image})"  ></div>`).join('')



const cardContents = data.map((i, index)=>`<div class="card-content" id="card-content-${index}">
<div class="content-start"></div>
<div class="content-place">${i.place}</div>
<div class="content-title-1">${i.title}</div>
<div class="content-title-2">${i.title2}</div>

</div>`).join('')


const sildeNumbers = data.map((_, index)=>`<div class="item" id="slide-item-${index}" >${index+1}</div>`).join('')
_('demo').innerHTML =  cards + cardContents
_('slide-numbers').innerHTML =  sildeNumbers


const range = (n) =>
  Array(n)
    .fill(0)
    .map((i, j) => i + j);
const set = gsap.set;

function getCard(index) {
  return `#card${index}`;
}
function getCardContent(index) {
  return `#card-content-${index}`;
}
function getSliderItem(index) {
  return `#slide-item-${index}`;
}

function animate(target, duration, properties) {
  return new Promise((resolve) => {
    gsap.to(target, {
      ...properties,
      duration: duration,
      onComplete: resolve,
    });
  });
}

let order = [0, 1, 2, 3, 4];
let detailsEven = true;

let offsetTop = 200;
let offsetLeft = 700;
let cardWidth = 200;
let cardHeight = 300;
let gap = 40;
let numberSize = 50;
const ease = "sine.inOut";

function init() {
  const [active, ...rest] = order;
  const detailsActive = detailsEven ? "#details-even" : "#details-odd";
  const detailsInactive = detailsEven ? "#details-odd" : "#details-even";
  const { innerHeight: height, innerWidth: width } = window;
  offsetTop = height - 430;
  offsetLeft = width - 830;

  gsap.set("#pagination", {
    top: offsetTop + 330,
    left: offsetLeft,
    y: 200,
    opacity: 0,
    zIndex: 60,
  });
  gsap.set("nav", { y: -200, opacity: 0 });

  gsap.set(getCard(active), {
    x: 0,
    y: 0,
    width: window.innerWidth,
    height: window.innerHeight,
  });
  gsap.set(getCardContent(active), { x: 0, y: 0, opacity: 0 });
  gsap.set(detailsActive, { opacity: 0, zIndex: 22, x: -200 });
  gsap.set(detailsInactive, { opacity: 0, zIndex: 12 });
  gsap.set(`${detailsInactive} .text`, { y: 100 });
  gsap.set(`${detailsInactive} .title-1`, { y: 100 });
  gsap.set(`${detailsInactive} .title-2`, { y: 100 });
  gsap.set(`${detailsInactive} .desc`, { y: 50 });
  gsap.set(`${detailsInactive} .cta`, { y: 60 });

  gsap.set(".progress-sub-foreground", {
    width: 500 * (1 / order.length) * (active + 1),
  });

  rest.forEach((i, index) => {
    gsap.set(getCard(i), {
      x: offsetLeft + 400 + index * (cardWidth + gap),
      y: offsetTop,
      width: cardWidth,
      height: cardHeight,
      zIndex: 30,
      borderRadius: 10,
    });
    gsap.set(getCardContent(i), {
      x: offsetLeft + 400 + index * (cardWidth + gap),
      zIndex: 40,
      y: offsetTop + cardHeight - 100,
    });
    gsap.set(getSliderItem(i), { x: (index + 1) * numberSize });
  });

  gsap.set(".indicator", { x: -window.innerWidth });

  const startDelay = 0.6;

  gsap.to(".cover", {
    x: width + 400,
    delay: 0.5,
    ease,
    onComplete: () => {
      setTimeout(() => {
        loop();
      }, 500);
    },
  });
  rest.forEach((i, index) => {
    gsap.to(getCard(i), {
      x: offsetLeft + index * (cardWidth + gap),
      zIndex: 30,
      delay: 0.05 * index,
      ease,
      delay: startDelay,
    });
    gsap.to(getCardContent(i), {
      x: offsetLeft + index * (cardWidth + gap),
      zIndex: 40,
      delay: 0.05 * index,
      ease,
      delay: startDelay,
    });
  });
  gsap.to("#pagination", { y: 0, opacity: 1, ease, delay: startDelay });
  gsap.to("nav", { y: 0, opacity: 1, ease, delay: startDelay });
  gsap.to(detailsActive, { opacity: 1, x: 0, ease, delay: startDelay });
}

let clicks = 0;

function step() {
  return new Promise((resolve) => {
    order.push(order.shift());
    detailsEven = !detailsEven;

    const detailsActive = detailsEven ? "#details-even" : "#details-odd";
    const detailsInactive = detailsEven ? "#details-odd" : "#details-even";

    document.querySelector(`${detailsActive} .place-box .text`).textContent =
      data[order[0]].place;
    document.querySelector(`${detailsActive} .title-1`).textContent =
      data[order[0]].title;
    document.querySelector(`${detailsActive} .title-2`).textContent =
      data[order[0]].title2;
    document.querySelector(`${detailsActive} .desc`).textContent =
      data[order[0]].description;

    gsap.set(detailsActive, { zIndex: 22 });
    gsap.to(detailsActive, { opacity: 1, delay: 0.4, ease });
    gsap.to(`${detailsActive} .text`, {
      y: 0,
      delay: 0.1,
      duration: 0.7,
      ease,
    });
    gsap.to(`${detailsActive} .title-1`, {
      y: 0,
      delay: 0.15,
      duration: 0.7,
      ease,
    });
    gsap.to(`${detailsActive} .title-2`, {
      y: 0,
      delay: 0.15,
      duration: 0.7,
      ease,
    });
    gsap.to(`${detailsActive} .desc`, {
      y: 0,
      delay: 0.3,
      duration: 0.4,
      ease,
    });
    gsap.to(`${detailsActive} .cta`, {
      y: 0,
      delay: 0.35,
      duration: 0.4,
      onComplete: resolve,
      ease,
    });
    gsap.set(detailsInactive, { zIndex: 12 });

    const [active, ...rest] = order;
    const prv = rest[rest.length - 1];

    gsap.set(getCard(prv), { zIndex: 10 });
    gsap.set(getCard(active), { zIndex: 20 });
    gsap.to(getCard(prv), { scale: 1.5, ease });

    gsap.to(getCardContent(active), {
      y: offsetTop + cardHeight - 10,
      opacity: 0,
      duration: 0.3,
      ease,
    });
    gsap.to(getSliderItem(active), { x: 0, ease });
    gsap.to(getSliderItem(prv), { x: -numberSize, ease });
    gsap.to(".progress-sub-foreground", {
      width: 500 * (1 / order.length) * (active + 1),
      ease,
    });

    gsap.to(getCard(active), {
      x: 0,
      y: 0,
      ease,
      width: window.innerWidth,
      height: window.innerHeight,
      borderRadius: 0,
      onComplete: () => {
        const xNew = offsetLeft + (rest.length - 1) * (cardWidth + gap);
        gsap.set(getCard(prv), {
          x: xNew,
          y: offsetTop,
          width: cardWidth,
          height: cardHeight,
          zIndex: 30,
          borderRadius: 10,
          scale: 1,
        });

        gsap.set(getCardContent(prv), {
          x: xNew,
          y: offsetTop + cardHeight - 100,
          opacity: 1,
          zIndex: 40,
        });
        gsap.set(getSliderItem(prv), { x: rest.length * numberSize });

        gsap.set(detailsInactive, { opacity: 0 });
        gsap.set(`${detailsInactive} .text`, { y: 100 });
        gsap.set(`${detailsInactive} .title-1`, { y: 100 });
        gsap.set(`${detailsInactive} .title-2`, { y: 100 });
        gsap.set(`${detailsInactive} .desc`, { y: 50 });
        gsap.set(`${detailsInactive} .cta`, { y: 60 });
        clicks -= 1;
        if (clicks > 0) {
          step();
        }
      },
    });

    rest.forEach((i, index) => {
      if (i !== prv) {
        const xNew = offsetLeft + index * (cardWidth + gap);
        gsap.set(getCard(i), { zIndex: 30 });
        gsap.to(getCard(i), {
          x: xNew,
          y: offsetTop,
          width: cardWidth,
          height: cardHeight,
          ease,
          delay: 0.1 * (index + 1),
        });

        gsap.to(getCardContent(i), {
          x: xNew,
          y: offsetTop + cardHeight - 100,
          opacity: 1,
          zIndex: 40,
          ease,
          delay: 0.1 * (index + 1),
        });
        gsap.to(getSliderItem(i), { x: (index + 1) * numberSize, ease });
      }
    });
  });
}

async function loop() {
  // Indicator takes 5 seconds to move to x: 0
  await animate(".indicator", 5, { x: 0 });

  // After a 0.5-second delay, indicator moves off-screen over 1 second
  await animate(".indicator", 1, { x: window.innerWidth, delay: 0.5 });

  // Reset indicator position
  set(".indicator", { x: -window.innerWidth });

  // Transition to the next card
  await step();

  // Optional delay before starting the next loop
  await new Promise(resolve => setTimeout(resolve, 3000)); // 3-second delay

  // Start the loop again
  loop();
}

async function loadImage(src) {
  return new Promise((resolve, reject) => {
    let img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

async function loadImages() {
  const promises = data.map(({ image }) => loadImage(image));
  return Promise.all(promises);
}

async function start() {
  try {
    await loadImages();
    init();
    
document.querySelector('#arrow-left').addEventListener('click', () => {
  console.log('Left arrow clicked');
  step(-1); // Navigate to the previous card
});

document.querySelector('#arrow-right').addEventListener('click', () => {
  console.log('Right arrow clicked');
  step(1); // Navigate to the next card
});

  } catch (error) {
    console.error("One or more images failed to load", error);
  }
}

start()