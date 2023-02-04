
    
    
    export default class SliderPro extends HTMLElement{
        constructor(){
            super();
            
        
            window.slice.controller.loadTemplate("slice/templates/SliderPro.html").then(template=>{ 
                
               
                    
                    this.fotos = JSON.parse(this.getAttribute('fotos'));
                    this.amountOfElements = this.fotos.length;
                    this.attachShadow({mode: 'open'});
                    this.shadowRoot.appendChild(template.content.cloneNode(true));
                    this.slider = this.shadowRoot.getElementById('myRange');
                    this.slider.setAttribute('max', this.amountOfElements);
                    this.output = this.shadowRoot.getElementById('svalue');
                    this.displaySlider();
                    this.slider.oninput = ()=> this.displaySlider();
                    
                    
                    window.slice.controller.toRegister(this);
               
    
    
    })
        

    }

    displaySlider(){
        this.output.innerHTML = this.slider.value;
        this.shadowRoot.getElementById('mlj').src = this.fotos[this.slider.value - 1];
    }


}


window.customElements.define('slider-pro', SliderPro);
