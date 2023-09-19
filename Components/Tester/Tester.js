export default class Tester extends HTMLElement{
    constructor(props){
        super();
        slice.controller.loadTemplate(this)

        let sliceBtn = document.getElementById('slice-btn');
        //sliceBtn.innerHTML="XD"

    slice.controller.toRegister(this);


    }
}

customElements.define('slice-tester', Tester);