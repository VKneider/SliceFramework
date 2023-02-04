export default class NavBar extends HTMLElement {

    constructor() {

        super();


        window.slice.controller.loadTemplate("./Slice/templates/Navbar.html").then(template => {

            this.template=template;
            window.slice.controller.toRegister(this);
            this.attachShadow({ mode: 'open' });
            this.shadowRoot.appendChild(template.content.cloneNode(true));

        })
    }

     static get observedAttributes() {
        return ['titles'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        switch (name) {
            case 'titles':
                this.titles = JSON.parse(newValue)
                let titleContainers = this.template.shadowRoot.getElementById('title-container')
                titleContainers.innerHTML = " "
                this.titles.forEach(title => {
                    titleContainers.innerHTML += ` <li class="nav-menu-item "> <a href="#" id="script" class="averus nav-menu-link"> ${title} </a></li>`
                })
                break;
        }
    }


    connectedCallback() {
        console.log("connected")
    }

    


}
window.customElements.define('nav-bar', NavBar);




