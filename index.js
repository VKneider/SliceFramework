/**
 * In this code what Victor did is that he tried to work with only js, so that whenever you try to put a new
 * element into the body of your program you have to add it through Javascript and DOM manipulation, first creating
 * the element or a group of elements, then adding that element into a div and finally appending that div into the DOM
 */


/**
 * different elements that you should be able to use.
 * Card
 * img-carousel
 * Navbar
 * SliderPro
 */


let x = async function () {
    //let nav_bar = await slice.getInstance("./js/NavBar.js")
    let card = await slice.getInstance("Card", { 
        title: "Google requiere empleados",
        subtitle: "Google C.A",
        description: "hola soy google y te gua comprar ",
        image: " https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png",
        redirect: "https://www.google.com" 
    });

    let card2 = await slice.getInstance("Card"); //Este es el elemento con props undefined
    let card3 = await slice.getInstance("Card",{
        title:"Game of Thrones", 
        subtitle:"HBO", 
        description:"hola soy google y te gua comprar ", 
        image:" https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png", 
        redirect:"https://www.google.com"
    });


    let div = document.createElement("div")
    div.classList.add("grid")

    //div.appendChild(nav_bar)
    div.appendChild(card)
    div.appendChild(card2)
    div.appendChild(card3)
    document.body.appendChild(div)
    
    
}

x();
//document.body.appendChild(slice.controller.getInstance("NavBar-0"))

