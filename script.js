const burgerBtn = document.querySelector(".header__burger");
const menuElement = document.querySelector(".header__navigation");
const modalBtn = document.querySelector("#my-btn");
const modal = document.querySelector(".modal");
const closeBtn = document.querySelector(".close");

burgerBtn.addEventListener("click", function (event) {
    menuElement.classList.toggle("header__navigation_active");
});

$("a.scroll-to").on("click", function (e) {
    e.preventDefault();
    const anchor = $(this).attr('href');
    $('html, body').stop().animate({
        scrollTop: $(anchor).offset().top - 60
    }, 800);
});



$(document).ready(function () {
    let currentNumber = 1;
    $(".next-button").on("click", function () {
        if (currentNumber > 4) {
            currentNumber = 0;
        }

        $(".slider").slick('slickNext');
        currentNumber++;
        $('.current-number').html(`0${currentNumber}`);
    });
    $(".prev-button").on("click", function () {
        if (currentNumber < 2) {
            currentNumber = 6;
        }

        $(".slider").slick('slickPrev');
        currentNumber--;
        $('.current-number').html(`0${currentNumber}`);
    });
    $(".slider").on('afterChange', function (event, slick, currentSlide) {
        currentSlide = parseInt($('.slider').slick('slickCurrentSlide')) + 1;
    });
    $('.slider').slick({
        arrows: false,
        speed: 400,
        autoplay: true,
        autoplaySpeed: 4000,
        fade: true,
        cssEase: 'linear',
    });
});

$(document).ready(function () {
    getAPI('https://pixabay.com/api/?key=20835814-6ec3e0d661f70e266c35930d9&q=car&image_type=photo&page=1&per_page=10', function (data) {
        $(".slider_2").on('afterChange', function (event, slick, currentSlide, nextSlide) {
            const currentSlideItem = $(`.slider_2 [data-slick-index="${currentSlide}"].slick-slide .slider-img_2`);
            const nextSlideItem = $(`.slider_2 [data-slick-index="${currentSlide + 1}"].slick-slide .slider-img_2`);
            if (currentSlide > 1) {
                if (!currentSlideItem.attr("src")) {
                    currentSlideItem.attr("src", data.hits[currentSlide - 2].webformatURL);
                }
                if (!nextSlideItem.attr("src")) {
                    nextSlideItem.attr("src", data.hits[currentSlide - 1].webformatURL);
                }
            }
        });

        $(".next-button_2").on("click", function () {
            $(".slider_2").slick('slickNext');
        });
        $(".prev-button_2").on("click", function () {
            $(".slider_2").slick('slickPrev');
        });

        $('.slider_2').slick({
            arrows: false,
            slidesToShow: 2,
            slidesToScroll: 2,
            autoplay: true,
            autoplaySpeed: 2000,
        });
    });
});

function getAPI(url, callback) {
    fetch(url)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            callback(data);
        });
}

modalBtn.addEventListener("click", function (event) {
    modal.classList.add("modal-active");
});

closeBtn.addEventListener("click", function (event) {
    modal.classList.remove("modal-active");
});













