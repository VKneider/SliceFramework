export default class Slice{
     constructor () {
         
        //Variable para probar el acceso a las instancias.
        this.testText = "Soy Instanciado Correctamente! (Slice)";
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
        };

        async getClass(module){
            const { default: myClass } = await import(module);
            return await myClass;
            
        }

        async getInstance(name, props){ //Antes era module en vez de name en esta linea
            let module = "./js/" + name + ".js";
            //Hay que pasar el nombre con la primera letra mayúscula.

            if(this.classes.has(name)){
                let m = this.classes.get(name);
                //console.log(`Instancia de mapa`);
                let instance = new m();
                if(props!=undefined){instance.props=props;}
                return instance;
            }else{
                let myClass = await this.getClass(module);
                let instance = await new myClass();
                this.classes.set(instance.constructor.name, myClass);
                //console.log(`Instancia de clase`);
                if(props!=undefined){instance.props=props;}
                return await instance;
                
            }

            
        }

}




async function load(){
    window.slice= new Slice(); 
    let x = await import("./js/Controller.js");
    window.slice.controller = new x.default();
};



load();