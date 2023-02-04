

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
            //modulo es la ruta del archivo js
            if(this.classes.has(module)){
                let m = this.classes.get(module);
                return new m();
            }else{
                this.getClass(module).then(myClass=>{
                    let x= new myClass();
                    this.classes.set(x.constructor.name, myClass);
                    console.log(`New Component`, x);
                    return x;
                })
            }

            
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




