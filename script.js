const temperaturefield = document.querySelector(".weather1")
const cityfield = document.querySelector(".weather2 p")
const datefield = document.querySelector(".weather2 span")
const emojifield = document.querySelector(".weather3 img")
const weatherfield = document.querySelector(".weather3 span")
const searchfield=document.querySelector(".searchfield")
const form=document.querySelector("form")
//adding event listner to the form
form.addEventListener("submit",search)

//default location
let target = "delhi"

//function to fetch datafrom weather api
const fetchData = async (target) => {
    const url = `https://api.weatherapi.com/v1/current.json?key=5b27a6ef3547402582e62007222306&q=${target}`;


    const response = await fetch(url);
    const data = await response.json();

    console.log(data);

//destructuring
    const {
        current: {
             temp_c,
            condition: { text, icon },
        },


        location: { name, localtime },
    } = data;

//calling update function
    updateDom(temp_c, name, localtime, icon, text);
} 
//function to update dom
function updateDom(temperature, city, time, emoji, text) {
    const exactTime = time.split(" ")[1];
    const exactDate = time.split(" ")[0];
    const exactDay = new Date(exactDate).getDay()

    temperaturefield.innerText = temperature
    cityfield.innerText = city;

    console.log(getDayfullname(0));
    datefield.innerText=`${exactTime}- ${getDayfullname(exactDay)} - ${exactDate}`

    emojifield.src = emoji
    weatherfield.innerText = text

}

fetchData(target)



//function to search the location
function search(e){
    e.preventDefault();

    target=searchfield.value;
    fetchData(target)
    console.log(target);

    searchfield.value="";
}

//function to get the  name of day
function getDayfullname(num) {
    switch (num) {
        case 0:
            return "sunday"

        case 1:
            return "Monday"

        case 2:
            return "Tuesday"
        case 3:
            return "Wednesday"
        case 4:
            return "Thrusday"
        case 5:
            return "friday"
        case 6:
            return "saturday"

        default:
            return "nothing";
    }
}