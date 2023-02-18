export default class Controller {
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


