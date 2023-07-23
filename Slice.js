export default class Slice {

    constructor() {
        this.classes = new Map();
        this.templates = new Map();
        this.controller;
        this.paths = {
            components: "./Components",
        };
    }

    async getClass(module) {
        const { default: myClass } = await import(module);
        return await myClass;
    }

    async getInstance(componentName, props = {}) {
        const modulePath = `${this.paths.components}/${componentName}/${componentName}.js`;
        const templatePath = `Slice/${this.paths.components}/${componentName}/${componentName}.html`;

        if (!this.templates.has(componentName)) {
            const response = await fetch(templatePath);
            const html = await response.text();
            const template = document.createElement("template");
            template.innerHTML = html;
            template.id = componentName;
            this.templates.set(componentName, template);
        }

        if (this.classes.has(componentName)) {
            const ComponentClass = this.classes.get(componentName);
            const instance = new ComponentClass(props);
            return instance;
        } else {
            const ComponentClass = await this.getClass(modulePath);
            const instance = new ComponentClass(props);
            this.classes.set(instance.constructor.name, ComponentClass);
            return instance;
        }
    }

    setPaths(paths) {
        this.paths = paths;
    }

}

async function load() {
    window.slice = new Slice();
    let x = await import(`./Components/Controller/Controller.js`);
    window.slice.controller = new x.default();
}

load();

