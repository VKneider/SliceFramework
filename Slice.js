import Logger from "./Components/Logger/Logger.js";
import Controller from "./Components/Controller/Controller.js";
import StylesManager from "./Components/StylesManager/StylesManager.js";

export default class Slice {

    constructor() {
        this.logger = new Logger();
        this.controller = new Controller();
        this.stylesManager = new StylesManager();
        this.paths = {
            components: "./Components",
            themes:"./Themes"
        };
        
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

        const nonVisualComponents = ["Logger", "Controller", "StylesManager", "CustomStylesManager", "ThemeManager", "FetchManager", "ToastProvider", "Translator"];

        const modulePath = `${this.paths.components}/${componentName}/${componentName}.js`;
        const templatePath = `Slice/${this.paths.components}/${componentName}/${componentName}.html`;


        if (!this.controller.templates.has(componentName) && !nonVisualComponents.includes(componentName) ) {
            try {
                const response = await fetch(templatePath);
                const html = await response.text();
                const template = document.createElement("template");
                template.innerHTML = html;
                // verificar pq estaba esto -> emplate.id = componentName;
                this.controller.templates.set(componentName, template);
                this.logger.logInfo("Slice", `Template ${componentName} loaded`)
            } catch (error) {
                console.log(error)
                this.logger.logError("Slice", `Error loading template ${templatePath}`, error);
            }
            
        }

        if (this.controller.classes.has(componentName)) {
            const ComponentClass = this.controller.classes.get(componentName);
            const instance = new ComponentClass(props);
            if(props.id) instance.id = props.id;
            this.stylesManager.handleInstanceStyles(instance,props);
            this.logger.logInfo("Slice", `Instance ${componentName} created`)
            this.controller.registerComponent(instance);
            return instance;
        } else {
            try {
                const ComponentClass = await this.getClass(modulePath);
                const instance = new ComponentClass(props);
                this.controller.classes.set(instance.constructor.name, ComponentClass);
                this.logger.logInfo("Slice", `Class ${componentName} loaded`)
                this.logger.logInfo("Slice", `Instance ${componentName} created`)
                if(props.id) instance.id = props.id;
                if(!nonVisualComponents.includes(componentName) ) this.controller.loadTemplate(instance)
                this.stylesManager.handleInstanceStyles(instance,props);
                this.controller.registerComponent(instance);
                return instance;
            } catch (error) {
                this.logger.logError("Slice", `Error loading class ${modulePath}`, error);
            }
            
        }
    }

    setPaths(paths) {
        this.paths = paths;
    }

    setTheme(themeName) {
        this.stylesManager.setTheme(themeName);
    }

}

function init() {
    window.slice = new Slice();
}

init();



