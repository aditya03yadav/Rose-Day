const bouquet = document.getElementById("bouquet");
let animationPlayed = false;

// FINAL MESSAGE (baad me change kar sakte ho)
const message = `
Bebyyy, jab se tum meri zindagi me aayi ho, sab kuch alag sa lagne laga hai. Jaise har din me ek nayi roshni aa gayi ho. Tumhari muskurahat meri har thakaan mita deti hai, bilkul us rose ki tarah jo bina bole bhi bahut kuch keh deta hai.

Is Rose Day par, Bebyyy, main sirf ek phool dena nahi chahta, kyunki phool to murjha jaata hai. Main tumhe apna waqt, apni care aur apna saath dena chahta hoon. Tumhare saath har chhoti si baat bhi special lagti hai, aur har pal yaad ban jaata hai.

Bebyyy, tum sirf meri pasand nahi ho, tum meri aadat ban chuki ho. Har dua me, har khwab me bas tumhara hi naam hota hai. Happy Rose Day Ishu, meri zindagi ke sabse khoobsurat ehsaas. Jaise rose hamesha apni khushboo ke liye yaad rehta hai, waise hi tum hamesha mere dil me rahogi.
`;

bouquet.addEventListener("click", () => {
    if (animationPlayed) return;
    animationPlayed = true;

    bouquet.style.display = "none"; // tap text hide
    startFirework();
});

/* ---------------- FIREWORK ANIMATION ---------------- */

function startFirework() {
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;

    const rocket = document.createElement("img");
    rocket.src = "rose.png";
    rocket.classList.add("rose");

    rocket.style.left = centerX + "px";
    rocket.style.top = centerY + "px";
    rocket.style.setProperty("--x", "0px");
    rocket.style.setProperty("--y", "-200px");

    document.body.appendChild(rocket);

    setTimeout(() => {
        rocket.remove();
        explode(centerX, centerY - 200);
    }, 700);
}

function explode(x, y) {
    const total = 1000;

    for (let i = 0; i < total; i++) {
        const angle = Math.random() * Math.PI * 2;
        const distance = Math.random() * 950 + 50;

        const rose = document.createElement("img");
        rose.src = "rose.png";
        rose.classList.add("rose");

        rose.style.left = x + "px";
        rose.style.top = y + "px";
        rose.style.setProperty("--x", Math.cos(angle) * distance + "px");
        rose.style.setProperty("--y", Math.sin(angle) * distance + "px");

        document.body.appendChild(rose);

        setTimeout(() => {
            rose.remove();
        }, 2200);
    }

    // animation ke baad screen clear + next step
    setTimeout(afterAnimation, 2400);
}

/* ---------------- AFTER ANIMATION FLOW ---------------- */

function afterAnimation() {
    shiftTitle();

    // title shift hone ke baad hi text aaye
    setTimeout(() => {
        showFinalText();
    }, 1800); // 👈 slow motion title animation ke barabar
}


/* ---------------- TITLE SHIFT ---------------- */

function shiftTitle() {
    const title = document.getElementById("title");
    title.classList.add("shifted");
}

/* ---------------- TYPEWRITER TEXT ---------------- */

function showFinalText() {
    const textEl = document.getElementById("finalText");
    const gallerySection = document.getElementById("gallerySection");

    textEl.style.display = "block";
    textEl.style.opacity = 1;

    let i = 0;
    textEl.innerHTML = "";

    const typing = setInterval(() => {
        const char = message.charAt(i);

        if (char === "\n") {
            textEl.innerHTML += "<br>";
        } else {
            textEl.innerHTML += char;
        }

        i++;

        // ✅ jab text khatam ho jaaye
        if (i >= message.length) {
            clearInterval(typing);

            // 👇 AB gallery button dikhao
            gallerySection.style.display = "block";
        }
    }, 50);
}


// Gallery logic
const openGalleryBtn = document.getElementById("openGalleryBtn");
const finalText = document.getElementById("finalText");
const photoButtons = document.getElementById("photoButtons");
const gallery = document.querySelector(".gallery");

openGalleryBtn.addEventListener("click", () => {
    // hide text
    finalText.style.display = "none";
    openGalleryBtn.style.display = "none";

    // show photo buttons
    photoButtons.style.display = "block";
});

// Show photos one by one
function showPhoto(num) {
    gallery.style.display = "block";
    const photo = document.getElementById("photo" + num);
    photo.classList.add("show");
}

document.addEventListener("DOMContentLoaded", () => {

    const openGalleryBtn = document.getElementById("openGalleryBtn");
    const finalText = document.getElementById("finalText");
    const photoButtons = document.getElementById("photoButtons");

    if (openGalleryBtn) {
        openGalleryBtn.addEventListener("click", () => {

            // final text hata do
            if (finalText) {
                finalText.style.display = "none";
            }

            // gallery button hata do
            openGalleryBtn.style.display = "none";

            // photo buttons dikhao
            if (photoButtons) {
                photoButtons.style.display = "block";
            }
        });
    }

});

let currentPhoto = null;

function showPhoto(num) {
    const newPhoto = document.getElementById("photo" + num);

    // agar koi photo already dikh rahi hai
    if (currentPhoto && currentPhoto !== newPhoto) {
        currentPhoto.classList.remove("show");
        currentPhoto.classList.add("hide");

        // fade out ke baad hide
        setTimeout(() => {
            currentPhoto.style.display = "none";
            currentPhoto.classList.remove("hide");
        }, 800);
    }

    // new photo fade in
    setTimeout(() => {
        newPhoto.style.display = "block";
        newPhoto.classList.add("show");
        currentPhoto = newPhoto;
    }, currentPhoto ? 800 : 0);
}
