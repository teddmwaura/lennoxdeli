export function stockOverview(){
    const stockData = JSON.parse(localStorage.getItem('stockData')) || [];

    let accumulatorPattern = '';

    stockData.forEach((product) =>{
        accumulatorPattern +=
        `
          <tr class="border-b">
            <td class="py-2 px-3">${product.product}</td>
            <td class="py-2 px-3">${product.opening}</td>
            <td class="py-2 px-3">
              <span class="bg-green-100 px-2 py-1 rounded text-xs">
                ${product.closing} remained/none
              </span>
            </td>
          </tr>
        `
    })
    const appendOverviewSTock = document.querySelector('.stock-overview-html-js')

    if(appendOverviewSTock){
        appendOverviewSTock.innerHTML = accumulatorPattern;
    }
}