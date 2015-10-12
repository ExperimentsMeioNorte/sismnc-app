Template.tabsIndexNewspaper.rendered = function () {
  $('.slider-featured').slick({
    infinite: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    infinite: true,
    speed: 500,
    fade: true,
    cssEase: 'linear',
    dots: true
  });
};