

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

        async getInstance(name, props){ //Antes era module en vez de name en esta linea
            let module = "./js/" + name + ".js";
            //Hay que pasar el nombre con la primera letra mayúscula.

            //Vieja función que obtenía el nombre a través del módulo
            //let name = module.split("/").pop().split(".")[0];
            
            //Cambie el comportamiento de esto, los props solo se van a imprimir a la consola si existen
            //igualmente, esto debería de retirarse ya que lo único que logra es hacer que la consola esté
            //más llena de basura y en algún punto podría llegar a ser contraproducente.
            if(props != undefined){
                console.log(props);
            }

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