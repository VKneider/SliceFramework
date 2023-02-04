

 export default class Slice {
     constructor () {
        this.classes = new Map();
        this.styles = document.createElement('style');
        this.styles.id="styles-slice"
        document.head.appendChild(this.styles);
        this.controller;
    }
        connectedCallback() {
            
        } 

        async getClass(module){
            const { default: myClass } = await import(module);
            return await myClass;
            
        }

        getInstance(module){
            this.getClass(module).then(myClass=>{
                return new myClass();
            })
            
        }
}

customElements.define("my-slice", Slice);
window.slice= new Slice(); 



async function load(){
    //se puede mejorar utilizando reflection
    let x = await import("./js/Controller.js");
    window.slice.controller = new x.default();

}



load();




