export function swiperProductJs(){
const products = [{
    image:'https://img.freepik.com/premium-photo/french-fries-white-background_269543-544.jpg',
    description: 'Hot, crispy on the outside and soft on the inside—our golden fries are perfectly seasoned and fried to perfection. The ultimate side you’ll keep coming back for',
    productName: 'Crispy Golden Fries'
},
{
    image:'https://thumbs.dreamstime.com/b/delicious-smoked-sausages-24546572.jpg',
    description: 'Juicy, flavorful smokies grilled to perfection and served hot. A quick, satisfying bite packed with bold taste—perfect on the go or as a snack',
    productName: 'Grilled Smokies'
},
{
    image:'https://www.shutterstock.com/image-photo/set-fresh-yellow-mango-pineapple-600nw-2512319247.jpg',
    description: 'Cool down with our refreshing, all-natural fruit juice made from fresh, juicy fruits. No additives, no shortcuts—just pure flavor in every sip. Perfect for a hot day or to complement your meal.',
    productName: 'Freshly Squeezed Fruit Juice'
},

]
let accumulatorPattern = '';

products.forEach((product) =>{
    accumulatorPattern +=
    `
     <div class="swiper-slide mt-10">
  <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 pt-7 px-4 md:px-12 div-top-html-contain">

    <!-- TEXT CONTENT -->
    <div class="flex flex-col items-center lg:items-start justify-center text-center lg:text-left">

      <h1 class="text-3xl sm:text-4xl md:text-5xl lg:text-[60px] mb-4 description">
        ${product.productName} <br />
      </h1>

      <p class="max-w-xl mb-6 text-gray-700 topic">
        ${product.description}
      </p>

      <!-- FEATURES -->
      <div class="flex flex-wrap justify-center lg:justify-start gap-4 div-flex-contain-html">

        <p class="flex items-center gap-2 box">
          <i class="fas fa-check text-green-600"></i> free delivery
        </p>
      </div>

      <!-- BUTTON -->
      <div class="mt-6 div-button-html-contains">
      </div>

    </div>

    <!-- IMAGE -->
    <div class="flex justify-center lg:justify-end div-img-html-contain">
      <img
        src="${product.image}"
        alt=""
        class="w-[220px] sm:w-[200px] md:w-[350px] lg:w-[420px] img-product-image"
      />
    </div>

  </div>
</div>

    `
})

const heroContainer = document.querySelector('.swiper-wrapper');

if(heroContainer){
    heroContainer.innerHTML = accumulatorPattern;
}


}