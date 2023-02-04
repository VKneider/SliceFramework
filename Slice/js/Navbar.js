export default class NavBar extends HTMLElement{

    constructor(){
        
        super();
        
        
        window.slice.controller.loadTemplate("slice/templates/Navbar.html").then(template=>{
            
            window.slice.controller.toRegister(this);
            this.attachShadow({mode: 'open'});
            this.shadowRoot.appendChild(template.content.cloneNode(true));
            this.titles=JSON.parse(this.getAttribute('titles'))
            let titleContainers=this.shadowRoot.getElementById('title-container')
            console.log(document.head)
            titleContainers.innerHTML=" "
            this.titles.forEach(title=>{
                titleContainers.innerHTML+=` <li class="nav-menu-item "> <a href="#" id="script" class="averus nav-menu-link"> ${title} </a></li>`
            })
        })}

        connectedCallback(){
            console.log("connected")
        }

    
        
    }

window.customElements.define('nav-bar', NavBar);
