export default class SliderPro extends HTMLElement{
  constructor(){
    super();
    slice.controller.loadTemplate("./Slice/templates/SliderPro.html").then(template=>{ 
      
      this.attachShadow({ mode: 'open' });
      this.shadowRoot.appendChild(template.content.cloneNode(true));
      

      if(this.props != undefined){
        this.setAttribute('fotos', this.props['fotos']);
      }

      this.fotos = JSON.parse(this.getAttribute('fotos'));
      this.amountOfElements = this.fotos.length;
      this.slider = this.shadowRoot.getElementById('myRange');
      this.slider.setAttribute('max', this.amountOfElements);
      this.output = this.shadowRoot.getElementById('svalue');
      this.displaySlider();
      this.slider.oninput = ()=> this.displaySlider();
      slice.controller.toRegister(this);
    });
  }

  displaySlider(){
      this.output.innerHTML = this.slider.value;
      this.shadowRoot.getElementById('mlj').src = this.fotos[this.slider.value - 1];
  }
}

window.customElements.define('slider-pro', SliderPro);
