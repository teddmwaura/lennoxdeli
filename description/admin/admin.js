import { handleToggleButton } from "./toggleSideBar.js"
import { loadOrders } from "./orders.js"
import { addStock } from "./analytics.js"
import { initAIPage } from "./initAiPage.js"
import { salesToday } from "./dashboard.js"
import { calculateTotalRevenue } from "./calculateTotalRevenue.js"
import { calculateExpenses } from "./calculateExpenses.js"
import { calculateProfit } from "./calculateProfit.js"
import { calculateOrders } from "./calculateOrders.js"
import { stockOverview } from "./stockOverview.js"

const toggleButtons = document.querySelectorAll('.select-button-js')

toggleButtons.forEach((button) =>{
    button.addEventListener('click', () =>{
        const pageId = button.dataset.pageId
        console.log(pageId)
        showSelectedPage(pageId)
    })
})
function showSelectedPage(pageId){
    const allPages = document.querySelectorAll('.page')
    allPages.forEach((page) =>{
        page.classList.add('hidden')
    })

    document.getElementById(pageId).classList.remove('hidden')
}
handleToggleButton()
loadOrders()
addStock()
initAIPage()
salesToday()
calculateTotalRevenue()
calculateExpenses()
calculateProfit()
calculateOrders()
stockOverview()