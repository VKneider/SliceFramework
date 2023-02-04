

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

        async getInstance(module){
            //modulo es la ruta del archivo js
            if(this.classes.has(module)){
                let m = this.classes.get(module);
                console.log(`Instancia de modulo`, x);
                return new m();
            }else{
                let myClass = await this.getClass(module);
                let instance = await new myClass();
                this.classes.set(instance.constructor.name, myClass);
                console.log(`Instancia de mapa`, instance);
                return await instance;
                
            }

            
        }
}

customElements.define("my-slice", Slice);



async function load(){
    //se puede mejorar utilizando reflection
    window.slice= new Slice(); 
    let x = await import("./js/Controller.js");
    window.slice.controller = new x.default();

}



load();




