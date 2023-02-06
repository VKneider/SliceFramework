//Algunas de las cosas comentadas estaría bueno quitarlas
//Clase Controller encargada de manejar los componentes en Slice

class Controller {
    constructor() {
        this.components = new Map();
        //Variable para probar el acceso a las instancias.
        this.testText = "Soy Instanciado Correctamente! (Controller)";
    }

    toRegister(component) {

        if (this.components.has(component.id)) {
            component.remove();
            return alert("ALERT: A Component with the same ID is already registered");
        }
            
        if (component.id == "") {
            this.components.set(component.constructor.name + `-${id}`, component); id++;
        }
        else {
            this.components.set(component.id, component);
        }

    }

    getInstance(id) {
        return this.components.get(id);
    }

    loadTemplate(template) {

        return new Promise((resolve, reject) => {
            const request = fetch(template).then(response => {
                let html = response.text().then(html => {
                    const templateElement = document.createElement('template');
                    templateElement.innerHTML = html;
                    resolve(templateElement);
                })
            })
        });



    }

    loadCss(css) {
        let styles = document.getElementById("styles-slice");
        return new Promise((resolve, reject) => {

            let request = fetch(css).then(response => {
                let css = response.text().then(css => {
                    styles.innerHTML += css;
                })
            })
            resolve();
        });
    }
}

let id = 0;

//#################################################################################################

export default class Slice extends HTMLElement{
     constructor () {
         super();
        //Variable para probar el acceso a las instancias.
        this.testText = "Soy Instanciado Correctamente! (Slice)";
        this.classes = new Map();
        //this.styles = document.createElement('style');
        //this.styles.id="styles-slice"
        //document.head.appendChild(this.styles);
        this.controller = new Controller();
        
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

            //Vieja función que obtenía el nombre a través del módulo
            //let name = module.split("/").pop().split(".")[0];
            
            //Comente esto porque llena la consola de basura
            //if(props != undefined){
            //    console.log(props);
            //}

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

customElements.define("my-slice", Slice);

/*
        async load(){
            //window.slice= new Slice(); 
            let x = await import("./js/Controller.js");
            window.slice.controller = new x.default();
        };

*/

//load();

function isEmpty(value) {
    return value === undefined || value === null || value === '';
  }