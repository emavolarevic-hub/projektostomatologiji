function showSection(id) {

    document.querySelector(".menu").classList.add("hidden");

    document.querySelectorAll(".page").forEach(sec => {
        sec.classList.add("hidden");
    });

    document.getElementById(id).classList.remove("hidden");

    document.getElementById("backBtn").classList.remove("hidden");
}

function goHome() {

    document.querySelectorAll(".page").forEach(sec => {
        sec.classList.add("hidden");
    });

    document.querySelector(".menu").classList.remove("hidden");

    document.getElementById("backBtn").classList.add("hidden");
}

function openLightbox(src) {
    document.getElementById("lightbox-img").src = src;
    document.getElementById("lightbox").classList.remove("hidden");
}

function closeLightbox() {
    document.getElementById("lightbox").classList.add("hidden");
}