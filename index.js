
let x = async function () {
    let nav_bar = await slice.getInstance("./js/NavBar.js")
    let nav_bar2 = await slice.getInstance("./js/NavBar.js")
}

x();
//document.body.appendChild(slice.controller.getInstance("NavBar-0"))

