//Small Comment that nobody will notice.

let x = async function () {
    //let nav_bar = await slice.getInstance("./js/NavBar.js")
    let card = await slice.getInstance("./js/Card.js", { 
    title: "Google requiere empleados",
    subtitle: "Google C.A",
    description: "hola soy google y te gua comprar ",
    image: " https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png",
    redirect: "https://www.google.com" 
    })

    let card2 = await slice.getInstance("./js/Card.js")
    let card3 = await slice.getInstance("./js/Card.js",     {title:"Game of Thrones", subtitle:"HBO", description:"hola soy google y te gua comprar ", image:" https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png", redirect:"https://www.google.com"})


    let div = document.createElement("div")
    div.classList.add("grid")


    div.appendChild(card)
    div.appendChild(card2)
    div.appendChild(card3)
    document.body.appendChild(div)
    
    
}

x();
//document.body.appendChild(slice.controller.getInstance("NavBar-0"))

