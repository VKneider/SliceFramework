
let x = async function () {
    let nav_bar = await slice.getInstance("./js/Navbar.js")
    let nav_bar2 = await slice.getInstance("./js/Navbar.js")
    nav_bar.titles=["hola", "chau"]
    document.body.appendChild(nav_bar)

}

x();
//document.body.appendChild(slice.controller.getInstance("NavBar-0"))

