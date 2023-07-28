import Logger from "./Components/Logger/Logger.js";
import Controller from "./Components/Controller/Controller.js";

export default class Slice {

    constructor() {
        this.classes = new Map();
        this.templates = new Map();
        this.logger = new Logger();
        this.controller = new Controller();
        this.paths = {
            components: "./Components",
        };
        this.styles = document.createElement("style");

    }

    async getClass(module) {
        try {
            const { default: myClass } = await import(module);
            return await myClass;
        } catch (error) {
            this.logger.logError("Slice", `Error loading class ${module}`, error);
        }
    }

    async getInstance(componentName, props = {}) {
        const modulePath = `${this.paths.components}/${componentName}/${componentName}.js`;
        const templatePath = `Slice/${this.paths.components}/${componentName}/${componentName}.html`;

        if (!this.templates.has(componentName)) {
            try {
                const response = await fetch(templatePath);
                const html = await response.text();
                const template = document.createElement("template");
                template.innerHTML = html;
                template.id = componentName;
                this.templates.set(componentName, template);
                this.logger.logInfo("Slice", `Template ${componentName} loaded`)
            } catch (error) {
                console.log(error)
                this.logger.logError("Slice", `Error loading template ${templatePath}`, error);
            }
            
        }

        if (this.classes.has(componentName)) {
            const ComponentClass = this.classes.get(componentName);
            const instance = new ComponentClass(props);
            this.logger.logInfo("Slice", `Instance ${componentName} created`)
            return instance;
        } else {
            try {
                const ComponentClass = await this.getClass(modulePath);
                const instance = new ComponentClass(props);
                this.classes.set(instance.constructor.name, ComponentClass);
                this.logger.logInfo("Slice", `Class ${componentName} loaded`)
                this.logger.logInfo("Slice", `Instance ${componentName} created`)
                return instance;
            } catch (error) {
                this.logger.logError("Slice", `Error loading class ${modulePath}`, error);
            }
            
        }
    }

    setPaths(paths) {
        this.paths = paths;
    }

}

function init() {
    window.slice = new Slice();
    //document.head.appendChild(window.slice.styles);
}

init();

