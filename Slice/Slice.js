

 export default class Slice {
     constructor () {
        this.classes = new Map();
        this.styles = document.createElement('style');
        this.styles.id="styles-slice"
        document.head.appendChild(this.styles);
        this.controller;
        this.paths={
            js:"./js/",
            css:"./css/",
            templates:"./templates/"
        }
    }
        connectedCallback() {
            
        } 

        async getClass(module){
            const { default: myClass } = await import(module);
            return await myClass;
            
        }

        async getInstance(module, props){
            //modulo es el nombre del modulo js
            let name = module.split("/").pop().split(".")[0];
            
            console.log(props)
            if(this.classes.has(name)){
                let m = this.classes.get(name);
                console.log(`Instancia de mapa`);
                let instance = new m();
                
                if(props!=undefined){instance.props=props;}
                return instance;
            }else{
                let myClass = await this.getClass(module);
                let instance = await new myClass();
                this.classes.set(instance.constructor.name, myClass);
                console.log(`Instancia de clase`);
                if(props!=undefined){instance.props=props;}
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




function isEmpty(value) {
    return value === undefined || value === null || value === '';
  }