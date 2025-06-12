// Day Counter Function
function updateDayCounter() {
  // Ngày bắt đầu: 24/6/2023
  const startDate = new Date("2023-06-24");
  const currentDate = new Date();

  // Tính số ngày đã trôi qua
  const timeDiff = currentDate.getTime() - startDate.getTime();
  const daysDiff = Math.floor(timeDiff / (1000 * 3600 * 24)) + 1; // +1 để tính cả ngày bắt đầu

  // Cập nhật hiển thị
  document.getElementById("dayCount").textContent = daysDiff;

  // Hiển thị ngày hiện tại
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "long",
  };
  const formattedDate = currentDate.toLocaleDateString("vi-VN", options);
  document.getElementById(
    "currentDate"
  ).textContent = `Hôm nay: ${formattedDate}`;
}
// Music control
const musicToggle = document.getElementById("musicToggle");
const bgMusic = document.getElementById("bgMusic");
musicToggle.addEventListener("click", () => {
  if (bgMusic.paused) {
    bgMusic.play();
    musicToggle.querySelector(".music-text").textContent = "Pause Music";
    musicToggle.classList.add("playing");
  } else {
    bgMusic.pause();
    musicToggle.querySelector(".music-text").textContent = "Play Music";
    musicToggle.classList.remove("playing");
  }
});

// Tạo trái tim bay
function createFloatingHearts() {
  const heartsContainer = document.querySelector(".floating-hearts");
  const heartSymbols = [
    "💕",
    "💖",
    "💗",
    "💝",
    "💘",
    "🌹",
    "✨",
    "💐",
    "🎀",
    "💎",
  ];

  setInterval(() => {
    const heart = document.createElement("div");
    heart.className = "heart";
    heart.textContent =
      heartSymbols[Math.floor(Math.random() * heartSymbols.length)];
    heart.style.left = Math.random() * 100 + "%";
    heart.style.animationDelay = "0s";
    heart.style.animationDuration = Math.random() * 4 + 4 + "s";
    heart.style.fontSize = Math.random() * 15 + 20 + "px";
    heartsContainer.appendChild(heart);

    setTimeout(() => {
      if (heart.parentNode) {
        heart.remove();
      }
    }, 8000);
  }, 300);
}

// Tạo hiệu ứng lấp lánh
function createSparkles() {
  const sparklesContainer = document.querySelector(".sparkles");
  const sparkleCount = window.innerWidth < 768 ? 8 : 15; // Ít sparkle hơn trên mobile

  for (let i = 0; i < sparkleCount; i++) {
    const sparkle = document.createElement("div");
    sparkle.className = "sparkle";
    sparkle.textContent = "✨";
    sparkle.style.left = Math.random() * 100 + "%";
    sparkle.style.top = Math.random() * 100 + "%";
    sparkle.style.animationDelay = Math.random() * 3 + "s";
    sparkle.style.animationDuration = Math.random() * 2 + 2 + "s";
    sparklesContainer.appendChild(sparkle);
  }
}

// Hiệu ứng nền đổi màu nhẹ
function animateBackground() {
  let hue = 0;
  setInterval(() => {
    hue = (hue + 0.5) % 360;
    document.getElementById("page-wrapper").style.filter = `hue-rotate(${
      Math.sin(hue * 0.01) * 10
    }deg) brightness(1.05)`;
  }, 100);
}

// Navigation functions
function openLetter() {
  // Tạo hiệu ứng transition
  document.body.style.transition = "all 0.5s ease";
  document.body.style.transform = "scale(0.95)";
  document.body.style.opacity = "0.7";
  window.location.href = "letter.html";
}

function openTimeline() {
  // Tạo hiệu ứng transition
  document.body.style.transition = "all 0.5s ease";
  document.body.style.transform = "scale(0.95)";
  document.body.style.opacity = "0.7";

  window.location.href = "timeline.html";
}

// Khởi tạo các hiệu ứng
document.addEventListener("DOMContentLoaded", () => {
  updateDayCounter();
  createFloatingHearts();
  createSparkles();
  animateBackground();

  // Đảm bảo letter-btn ẩn khi load trang
  const letterBtn = document.querySelector(".letter-btn");
  if (letterBtn) {
    letterBtn.style.display = "none";
    letterBtn.style.opacity = "0";
  }

  // Thêm hiệu ứng click cho các nút
  const buttons = document.querySelectorAll(".nav-button");
  buttons.forEach((button) => {
    button.addEventListener("mouseover", () => {
      button.style.boxShadow = "0 25px 50px rgba(0, 0, 0, 0.4)";

      // Hiện nút thư khi di chuột vào
      if (button.classList.contains("letter-btn")) {
        button.classList.add("visible");
      }
    });

    button.addEventListener("mouseout", () => {
      button.style.boxShadow = "0 10px 30px rgba(0, 0, 0, 0.2)";

      // Ẩn nút thư khi không di chuột vào
      if (button.classList.contains("letter-btn")) {
        button.classList.remove("visible");
      }
    });
  });

  // Responsive sparkles khi resize
  let resizeTimeout;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      // Xóa sparkles cũ và tạo lại
      const sparklesContainer = document.querySelector(".sparkles");
      sparklesContainer.innerHTML = "";
      createSparkles();
    }, 250);
  });
});

// Hiệu ứng click chuột tạo trái tim (chỉ trên desktop)
document.addEventListener("click", (e) => {
  if (window.innerWidth > 768) {
    // Chỉ trên desktop
    const heart = document.createElement("div");
    heart.innerHTML = "💖";
    heart.style.position = "fixed";
    heart.style.left = e.clientX + "px";
    heart.style.top = e.clientY + "px";
    heart.style.color = "#ff69b4";
    heart.style.fontSize = "20px";
    heart.style.pointerEvents = "none";
    heart.style.zIndex = "1000";
    heart.style.animation = "floatUp 2s ease-out forwards";

    document.body.appendChild(heart);

    setTimeout(() => {
      if (heart.parentNode) {
        heart.remove();
      }
    }, 2000);
  }
});

// Prevent zoom on double tap trên iOS
let lastTouchEnd = 0;
document.addEventListener(
  "touchend",
  function (event) {
    const now = new Date().getTime();
    if (now - lastTouchEnd <= 300) {
      event.preventDefault();
    }
    lastTouchEnd = now;
  },
  false
);

// Xử lý click/tap để hiện letter button
const dayCount = document.getElementById("dayCount");
const letterBtn = document.querySelector(".letter-btn");

// Theo dõi số lần tap và thời gian
let lastTap = 0;
let tapCount = 0;

// Xử lý cả click và touch events
const handleInteraction = (event) => {
  const currentTime = new Date().getTime();
  const tapDelay = currentTime - lastTap;

  if (tapDelay < 300) {
    // Double tap/click detected
    letterBtn.style.display = "inline-block";
    setTimeout(() => {
      letterBtn.style.opacity = "1";
      letterBtn.style.transform = "translateY(0)";
    }, 10);
    tapCount = 0;
  } else {
    tapCount++;
    setTimeout(() => {
      tapCount = 0;
    }, 300);
  }

  lastTap = currentTime;
};

// Thêm các event listeners
dayCount.addEventListener("click", handleInteraction);
dayCount.addEventListener("touchend", (e) => {
  e.preventDefault(); // Ngăn chặn zoom trên mobile
  handleInteraction(e);
});
