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

var slice = document.getElementById("slice");
console.log(slice.testText);
console.log(slice.controller.testText);

let n = async function(){
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

    let div = document.createElement("div");
    
    div.classList.add("grid")
    div.appendChild(card)
    div.appendChild(card2)
    div.appendChild(card3)
    document.body.appendChild(div)

    let SP = await slice.getInstance("SliderPro",{
        fotos:'["./Slice/img/image1.jpg", "./Slice/img/image2.jpg", "./Slice/img/image3.jpg", "./Slice/img/image4.jpg"]'
    });
    let div2 = document.createElement('div');
    div2.appendChild(SP);
    document.body.appendChild(div2);

    let NB = await slice.getInstance("Navbar");
    document.body.appendChild(NB);
}

n();

/*
TODO ESTO SE VA A USAR DESPUES, PRIMERO DEBUGGEAR Y HACER QUE ESTO FUNCIONE SIN LA VARIABLE GLOBAL
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

*/
