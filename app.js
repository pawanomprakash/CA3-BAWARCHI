function getRandomdish(){
    fetch('https://www.themealdb.com/api/json/v1/1/random.php')
    .then((res)=>res.json()).then((data)=>{
        console.log(data);
        console.log(typeof(data))
        let imgurl=data.meals[0].strMealThumb;
        let randomfoodname=data.meals[0].strMeal;
        console.log(imgurl)
        let img=document.getElementById('randomfoodimage')
        let foodname=Array.from(document.getElementsByClassName('foodname'))
        img.setAttribute('src',imgurl)
        foodname.forEach(item=>{item.textContent=`${randomfoodname}`})
        let ingredientslist=[];
        for(let i=0;i<20;i++){
            if(!data.meals[0]['strIngredient'+[i+1]]) break;
            else {ingredientslist.push(data.meals[0]['strIngredient'+[i+1]] +" : " +data.meals[0]['strMeasure'+[i+1]]);
            }
        }
        console.log(ingredientslist)
        let ingredients=document.getElementById("ingredients")
        ingredientslist.forEach((item)=>{
            ingredients.innerHTML+=`<li>${item}</li>`
        })
        let instructions=data.meals[0].strInstructions;
        console.log(instructions)
        console.log(typeof(instructions))

    })
}

let modal=document.getElementById('modal')
let closeModalBtn=document.getElementById("closeModal")
closeModalBtn.addEventListener("click",()=>{modal.style.display="none"})

let randomfoodimage=document.getElementById('randomfoodimage')
randomfoodimage.addEventListener('click',()=>{
    modal.style.display='block'
})

let refreshBtn=document.getElementById('refresh');
refreshBtn.addEventListener('click',getRandomdish)

function fetchDataByCategory(category) {
    const dishesContainer = document.getElementById('dishes-container');

    // Replace the 'Chicken' value in the URL with the input value
    const apiUrl = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`;

    // Fetch data from the updated URL
    fetch(apiUrl)
        .then((res) => res.json())
        .then((data) => {
            dishesContainer.innerHTML = ''; // Clear the dishes container
            console.log(data)
            // Loop through the fetched data and add dishes to the 'dishes-container'
            data.meals.forEach((meal, index) => {
                const dishDiv = document.createElement('div');
                dishDiv.classList.add('dishes');
                const categoriesContainer=document.getElementById('categories-container')
                categoriesContainer.style.display='block'
                const categoryNamediv=document.getElementById('categoryName')
                categoryNamediv.textContent=category

                const dishImg = document.createElement('img');
                dishImg.classList.add('dishesIMG');
                dishImg.src = meal.strMealThumb;
                dishImg.alt = meal.strMeal;

                const captiondiv=document.createElement('div');
                const dishCaption = document.createElement('caption');
                const dishNameSpan = document.createElement('span');
                captiondiv.classList.add(`caption`)
                dishNameSpan.classList.add(`dishesname`, `dishname${index + 1}`);
                dishNameSpan.textContent = meal.strMeal;
                captiondiv.appendChild(dishCaption);
                dishCaption.appendChild(dishNameSpan);

                dishDiv.appendChild(dishImg);
                dishDiv.appendChild(dishCaption);

                dishesContainer.appendChild(dishDiv);
            });
        })
        .catch((error) => {
            console.error('Error fetching data:', error);
        });
}

// JavaScript for Dropdown
function toggleDropdown() {
    const dropdownContent = document.getElementById("searchDropdown");
    dropdownContent.classList.toggle("show");

    // Listen for category selection
    dropdownContent.addEventListener("click", (event) => {
        const selectedCategory = event.target.textContent;
        fetchDataByCategory(selectedCategory);
        dropdownContent.classList.remove("show"); // Hide dropdown after selection
    });
}

// Close the dropdown if the user clicks outside of it
window.onclick = function(event) {
    if (!event.target.matches('.dropbtn')) {
        const dropdowns = document.getElementsByClassName("dropdown-content");
        for (let i = 0; i < dropdowns.length; i++) {
            const openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    }
}


let foodQuotes=[
    '<p><span id="quote">Your diet is a bank account. Good food choices are good investments.</span><br><br><span id="by"></p> -Bethenny Frankel</span>',//
    `<p><span id="quote">Cooking is a philosophy; It's not a recipe.</span><br><br><span id="by"></p> -Marco Pierre White</span>`,//
    '<p><span id="quote">Laughter is brightest in the place where food is good.</span><br><br><span id="by"> -Irish Proverb</p></span>'
]
// function displayRandomfoodQuote(foodQuotes){
//     let quoteIndex=Math.floor(Math.random()*foodQuotes.length)
//     let foodQuoteDiv=document.getElementById('random food quote');
//     foodQuoteDiv.innerHTML="\""+foodQuotes[quoteIndex]+"\"";
// }

getRandomdish()
// displayRandomfoodQuote(foodQuotes)
