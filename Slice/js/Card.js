export default class Card extends HTMLElement {
  constructor() {
    super();
    window.slice.controller.loadTemplate("./Slice/templates/Card.html").then(template => {

        
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(template.content.cloneNode(true));
        this.props;
        
        
        if(this.props != undefined){
            
            let title = this.shadowRoot.getElementById('title');
            title.innerHTML = this.props['title']
            let subtitle = this.shadowRoot.getElementById('subtitle');
            subtitle.innerHTML = this.props['subtitle'];
            let description = this.shadowRoot.getElementById('description');
            description.innerHTML = this.props['description'];
            let image = this.shadowRoot.getElementById('image');
            image.src = this.props['image'];
            let readBtn = this.shadowRoot.getElementById('read-btn');
            readBtn.href=this.props['redirect'];
            
        }
        window.slice.controller.toRegister(this);
    })
  }

  connectedCallback() {

  }

}

customElements.define('card-box', Card);