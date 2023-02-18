export default class NavBar extends HTMLElement {

    constructor() {
        super();
        slice.controller.loadTemplate("./Slice/templates/Navbar.html").then(template => {
            this.template=template;
            slice.controller.toRegister(this);
            this.attachShadow({ mode: 'open' });
            this.shadowRoot.appendChild(template.content.cloneNode(true));

            
        })
    }

    connectedCallback() {}

}
window.customElements.define('nav-bar', NavBar);




