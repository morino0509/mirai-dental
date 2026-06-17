'use strict';


// ファーストビュー

$(function () {
  $('.first-view-slider').slick({
    fade: true,              // ← フェード切り替え
    speed: 2500,             // 切り替え時間（ゆっくり）
    autoplay: true,
    autoplaySpeed: 6000,     // 表示時間
    arrows: false,
    dots: false,
    pauseOnHover: false
  });
});



// おしらせ

const DETAILS = document.querySelectorAll(".js-details");

const animTiming = {
  duration: 400,
  easing: "ease-out",
};

DETAILS.forEach((details) => {
  const summary = details.querySelector(".js-summary");
  const content = details.querySelector(".news-item__body");

  summary.addEventListener("click", (e) => {
    e.preventDefault();

    // 連打防止
    if (details.dataset.animating === "true") return;

    details.dataset.animating = "true";

    if (details.open) {
      // ===== 閉じる =====

      // 現在の高さを固定
      const startHeight = content.scrollHeight;

      content.style.height = startHeight + "px";

      requestAnimationFrame(() => {
        const animation = content.animate(
          [
            {
              height: startHeight + "px",
              opacity: 1,
            },
            {
              height: 0,
              opacity: 0,
            },
          ],
          animTiming
        );

        animation.onfinish = () => {
          details.removeAttribute("open");

          content.style.height = "";
          content.style.opacity = "";

          details.dataset.animating = "false";
        };
      });
    } else {
      // ===== 開く =====

      details.setAttribute("open", "true");

      // 開いた状態の高さ取得
      const endHeight = content.scrollHeight;

      // 一旦0固定
      content.style.height = "0px";
      content.style.opacity = "0";

      requestAnimationFrame(() => {
        const animation = content.animate(
          [
            {
              height: "0px",
              opacity: 0,
            },
            {
              height: endHeight + "px",
              opacity: 1,
            },
          ],
          animTiming
        );

        animation.onfinish = () => {
          content.style.height = "";
          content.style.opacity = "";

          details.dataset.animating = "false";
        };
      });
    }
  });
});




// 診療内容

function sliderSetting() {
  const width = window.innerWidth;

  if (width <= 767) {
    if (!$('.service__list').hasClass('slick-initialized')) {
      $('.service__list').slick({

        variableWidth: true,
        centerMode: true,
        dots: true,
        arrows: false

      });
    }
  } else {
    if ($('.service__list').hasClass('slick-initialized')) {
      $('.service__list').slick('unslick');
    }
  }
}

$(window).on('load resize', sliderSetting);




// ナビゲーションの動き

$(".openbtn").click(function () {//ボタンがクリックされたら
	$(this).toggleClass('active');//ボタン自身に activeクラスを付与し
    $("#g-nav").toggleClass('panelactive');//ナビゲーションにpanelactiveクラスを付与
    $(".circle-bg").toggleClass('circleactive');//丸背景にcircleactiveクラスを付与
});

$("#g-nav a").click(function () {//ナビゲーションのリンクがクリックされたら
    $(".openbtn").removeClass('active');//ボタンの activeクラスを除去し
    $("#g-nav").removeClass('panelactive');//ナビゲーションのpanelactiveクラスを除去
    $(".circle-bg").removeClass('circleactive');//丸背景のcircleactiveクラスを除去
});



// スライダー


$('.slider1, .slider2').slick({
  arrows: false,//左右の矢印はなし
  autoplay: true,//自動的に動き出すか。初期値はfalse。
  autoplaySpeed: 0,//自動的に動き出す待ち時間。初期値は3000ですが今回の見せ方では0
  speed: 10000,//スライドのスピード。初期値は300。
  infinite: true,//スライドをループさせるかどうか。初期値はtrue。
  pauseOnHover: false,//オンマウスでスライドを一時停止させるかどうか。初期値はtrue。
  pauseOnFocus: false,//フォーカスした際にスライドを一時停止させるかどうか。初期値はtrue。
  cssEase: 'linear',//動き方。初期値はeaseですが、スムースな動きで見せたいのでlinear
  variableWidth: true,
});


// フェードイン
const observer = new IntersectionObserver(function(entries) {
  entries.forEach(function(entry) {
    if (entry.isIntersecting) {
      entry.target.classList.add("active");
    }
  });
});

const elements = document.querySelectorAll(
  ".fade-up, .fade-left, .fade-right"
);

elements.forEach(function(el) {
  observer.observe(el);
});


// News　表示・非表示
const filterButtons = document.querySelectorAll('.news-filter button');
filterButtons.forEach(button => {
  button.addEventListener('click', () => {

    const category = button.dataset.filter;

    newsItems.forEach(item => {

      if (
        category === 'all' ||
        item.dataset.category === category
      ) {
        item.style.display = '';
      } else {
        item.style.display = 'none';
      }

    });

  });
});


const newsItems = document.querySelectorAll('.news-item');

function filterNews(category) {

    newsItems.forEach(item => {

        if (
            category === 'all' ||
            item.dataset.category === category
        ) {
            item.style.display = '';
        } else {
            item.style.display = 'none';
        }

    });

}

// news　絞り込み　sp
document.querySelectorAll('[data-filter]').forEach(button => {

    button.addEventListener('click', () => {
        filterNews(button.dataset.filter);
    });

});

// スマホプルダウン
const select = document.getElementById('news-filter-select');

if (select) {
    select.addEventListener('change', () => {
        filterNews(select.value);
    });
}


// ローディング
window.addEventListener("load", function () {

  const loading = document.getElementById("loading");
  const slider = document.querySelector(".first-view-slider");

  setTimeout(function () {

      // 画像表示
      slider.classList.add("show");

      // 白背景を消す
      loading.classList.add("fade-out");

  }, 1500);

});




// window.addEventListener("load", function () {

//   const loading = document.getElementById("loading");
//   const slider = document.querySelector(".first-view-slider");
//   const copy = document.querySelector(".first-view-copy");

//   setTimeout(function () {

//       slider.classList.add("show");
//       copy.classList.add("show");

//       loading.classList.add("fade-out");

//   }, 1500);

// });