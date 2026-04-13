export function toggleListItems(){
const items = document.querySelectorAll('nav ul li')

items.forEach(list =>{
    list.addEventListener('click', ()=>{
        items.forEach(elements => elements.classList.remove('active'))
        list.classList.add('active');
        list
    })
})
}