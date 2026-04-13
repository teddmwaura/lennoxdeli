export function swiperJsHtml(){
const swiper = new Swiper('.swiper', {
 autoplay:{

    delay: 3000,

    disableOnInteraction: false

 },

  loop: true,

  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
});


}