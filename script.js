const bouquet = document.getElementById("bouquet");
const title = document.getElementById("title");
const finalText = document.getElementById("finalText");
const gallerySection = document.getElementById("gallerySection");
const openGalleryBtn = document.getElementById("openGalleryBtn");
const photoButtons = document.getElementById("photoButtons");
const gallery = document.querySelector(".gallery");

let animationPlayed = false;
let currentPhoto = null;

const message = `
Bebyyy, jab se tum meri zindagi me aayi ho, sab kuch alag sa lagne laga hai. Jaise har din me ek nayi roshni aa gayi ho. Tumhari muskurahat meri har thakaan mita deti hai, bilkul us rose ki tarah jo bina bole bhi bahut kuch keh deta hai.

Is Rose Day par, Bebyyy, main sirf ek phool dena nahi chahta, kyunki phool to murjha jaata hai. Main tumhe apna waqt, apni care aur apna saath dena chahta hoon. Tumhare saath har chhoti si baat bhi special lagti hai, aur har pal yaad ban jaata hai.

Bebyyy, tum sirf meri pasand nahi ho, tum meri aadat ban chuki ho. Har dua me, har khwab me bas tumhara hi naam hota hai. Happy Rose Day Ishu, meri zindagi ke sabse khoobsurat ehsaas. Jaise rose hamesha apni khushboo ke liye yaad rehta hai, waise hi tum hamesha mere dil me rahogi.

Last and funny line , Mai tumhe Har "ROSE" Day par aysa surprise dunga or rose bhi agar pass rha to , iske bdle me tum mujhe shadi ke baad "ROJ" dena . Samjhi n iska reply chahea .
`;

/* STEP 1: TITLE SHIFT */
setTimeout(() => {
    title.classList.add("shifted");
    setTimeout(() => {
        bouquet.style.display = "block";
    }, 800);
}, 1200);

/* STEP 2: BOUQUET CLICK */
bouquet.addEventListener("click", () => {
    if (animationPlayed) return;
    animationPlayed = true;
    bouquet.style.display = "none";
    startFirework();
});

/* FIREWORK */
function startFirework() {
    const x = window.innerWidth / 2;
    const y = window.innerHeight / 2;

    for (let i = 0; i < 600; i++) {
        const rose = document.createElement("img");
        rose.src = "rose.png";
        rose.className = "rose";

        const angle = Math.random() * Math.PI * 2;
        const dist = Math.random() * 900;

        rose.style.setProperty("--x", Math.cos(angle) * dist + "px");
        rose.style.setProperty("--y", Math.sin(angle) * dist + "px");

        document.body.appendChild(rose);
        setTimeout(() => rose.remove(), 2200);
    }

    setTimeout(showFinalText, 2300);
}

/* STEP 3: TEXT */
function showFinalText() {
    finalText.style.display = "block";
    finalText.style.opacity = 1;

    let i = 0;
    const typing = setInterval(() => {
        finalText.innerHTML += message.charAt(i) === "\n" ? "<br>" : message.charAt(i);
        i++;
        if (i >= message.length) {
            clearInterval(typing);
            gallerySection.style.display = "block";
        }
    }, 45);
}

/* STEP 4: GALLERY */
openGalleryBtn.addEventListener("click", () => {
    // final text hide
    finalText.style.display = "none";

    // gallery button hide
    openGalleryBtn.style.display = "none";

    // 🔥 TITLE HIDE (IMPORTANT FIX)
    title.style.display = "none";

    // photo buttons show
    photoButtons.style.display = "block";
});


/* STEP 5: PHOTO SWITCH */

function showPhoto(num) {
    const newPhoto = document.getElementById("photo" + num);
    const gallery = document.querySelector(".gallery");

    gallery.style.display = "block";

    // agar koi photo already dikh rahi hai
    if (currentPhoto && currentPhoto !== newPhoto) {

        // purani photo fade out
        currentPhoto.classList.remove("show");
        currentPhoto.classList.add("hide");

        // fade-out ke baad remove + nayi photo show
        setTimeout(() => {
            currentPhoto.style.display = "none";
            currentPhoto.classList.remove("hide");

            newPhoto.style.display = "block";
            newPhoto.classList.add("show");
            currentPhoto = newPhoto;
        }, 800);

    } 
    // agar pehli baar photo click hui
    else if (!currentPhoto) {
        newPhoto.style.display = "block";
        newPhoto.classList.add("show");
        currentPhoto = newPhoto;
    }
}
