export default class Controller {
    constructor() {
        this.components = new Map();
    }

    toRegister(component) {
        if (this.components.has(component.id)) {
            //component.remove();
            return console.log(`ALERT: A Component with the same ID is already registered ${component.id}`);
        }
        if (component.id == "") {
            this.components.set(component.constructor.name + `-${id}`, component);
            id++;
        } else {
            this.components.set(component.id, component);
        }
    }

    getComponent(id) {
        return this.components.get(id);
    }



    loadTemplate(component) {

        const className = component.constructor.name;
        const template = slice.templates.get(className);
        component.attachShadow({ mode: "open" });
        component.shadowRoot.appendChild(template.content.cloneNode(true));
        return component;
    }
}

let id = 0;
