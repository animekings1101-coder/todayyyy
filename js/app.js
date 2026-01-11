document.addEventListener("DOMContentLoaded", () => {

  // ================= PAGE 1 (LOCK) =================
  const unlockBtn = document.getElementById("unlockBtn");
  const passwordInput = document.getElementById("passwordInput");
  const errorMsg = document.getElementById("errorMsg");
  const lockScreen = document.getElementById("lockScreen");

  const PASSWORD = "YASHIKA";

  if (unlockBtn && passwordInput) {
    unlockBtn.addEventListener("click", checkPassword);
    passwordInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") checkPassword();
    });
  }

  function checkPassword() {
    const entered = passwordInput.value.trim();
    if (entered === PASSWORD) successUnlock();
    else wrongPassword();
  }

  function wrongPassword() {
    errorMsg.textContent = "Access Denied 💔";
    lockScreen.classList.add("shake");
    setTimeout(() => lockScreen.classList.remove("shake"), 500);
  }

  function successUnlock() {
    errorMsg.textContent = "";
    lockScreen.style.animation = "fadeOut 1s ease forwards";
    setTimeout(() => {
      window.location.href = "./page2.html";
    }, 1000);
  }

  // ================= PAGE 2 (YES BUTTONS) =================
  const yesButtons = document.querySelectorAll(".yes");

  if (yesButtons.length > 0) {
    yesButtons.forEach(btn => {
      btn.addEventListener("click", () => {
        document.body.style.transition = "opacity 0.8s ease";
        document.body.style.opacity = "0";
        setTimeout(() => {
          window.location.href = "./page3.html";
        }, 800);
      });
    });
  }

  // ================= PAGE 3 (GALLERY) =================
  const galleryImg = document.getElementById("galleryImg");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");

  if (galleryImg && nextBtn) {
    const galleryImages = ["pic1.jpg", "pic2.jpg"];
    let galleryIndex = 0;

    function updateGallery() {
      galleryImg.src = `assets/images/${galleryImages[galleryIndex]}`;
    }

    if (prevBtn) {
      prevBtn.addEventListener("click", () => {
        if (galleryIndex > 0) {
          galleryIndex--;
          updateGallery();
        }
      });
    }

    nextBtn.addEventListener("click", () => {
      galleryIndex++;
      if (galleryIndex >= galleryImages.length) {
        document.body.style.opacity = "0";
        setTimeout(() => {
          window.location.href = "./page4.html";
        }, 800);
      } else {
        updateGallery();
      }
    });
  }

  // ================= CURSOR SPARKLES =================
  document.addEventListener("mousemove", e => {
    const spark = document.createElement("div");
    spark.style.cssText = `
      position:absolute;
      width:6px;
      height:6px;
      background:hotpink;
      border-radius:50%;
      left:${e.pageX}px;
      top:${e.pageY}px;
      pointer-events:none;
      z-index:9999;
      opacity:1;
      transition:all 0.5s linear;
    `;
    document.body.appendChild(spark);

    setTimeout(() => {
      spark.style.transform = "scale(3)";
      spark.style.opacity = 0;
    }, 50);

    setTimeout(() => spark.remove(), 500);
  });

});
// ===== MUSIC AUTOPLAY FIX (MOBILE + DESKTOP) =====
document.addEventListener("click", () => {
  const music = document.getElementById("galleryMusic");
  if (music && music.paused) {
    music.play().catch(() => {});
  }
}, { once: true });
