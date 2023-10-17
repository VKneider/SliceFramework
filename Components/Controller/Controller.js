export default class Controller {
    constructor() {
        this.components = new Map();
        this.templates = new Map();
        this.classes = new Map();
        this.idCounter = 0;
    }

    registerComponent(component) {
        const id = component.id || `${component.constructor.name}-${this.idCounter++}`;
        
        if (this.components.has(id)) {
            console.error(`ALERT: A component with the same ID is already registered: ${id}`);
            return;
        }
        
        this.components.set(id, component);
    }

    getComponent(id) {
        return this.components.get(id);
    }

    loadTemplate(component) {
        const className = component.constructor.name;
        const template = this.templates.get(className);
        
        if (!template) {
            console.error(`Template not found for component: ${className}`);
            return;
        }
        
        component.innerHTML = template.innerHTML;
        return component;
    }

    registerTemplate(className, template) {
        this.templates.set(className, template);
    }
}
