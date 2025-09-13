history.scrollRestoration = 'manual';

setTimeout(() => {
     document.querySelector("main").classList.remove("hidden");
     document.querySelector("footer").classList.remove("hidden");
}, 1250);

document.getElementById("loading").style.opacity = 0;