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

        this.getClass = async function getClass(module) {
            try {
                const { default: myClass } = await import(module);
                return await myClass;
            } catch (error) {
                this.logger.logError("Slice", `Error loading class ${module}`, error);
            }
        }
        
    }

    

    async build(componentName, props = {}, isVisual = true) {

        const modulePath = `${this.paths.components}/${componentName}/${componentName}.js`;
        const templatePath = `Slice/${this.paths.components}/${componentName}/${componentName}.html`;


        // Load template if not loaded
        if (!this.controller.templates.has(componentName) && isVisual ) {
            try {
                const response = await fetch(templatePath);
                const html = await response.text();
                const template = document.createElement("template");
                template.innerHTML = html;
                this.controller.templates.set(componentName, template);
                this.logger.logInfo("Slice", `Template ${componentName} loaded`)
            } catch (error) {
                console.log(error)
                this.logger.logError("Slice", `Error loading template ${templatePath}`, error);
            }
        }


        //Load class if not loaded
        if (!this.controller.classes.has(componentName)) {
            try {
                const ComponentClass = await this.getClass(modulePath);
                this.controller.classes.set(componentName, ComponentClass);
                this.logger.logInfo("Slice", `Class ${componentName} loaded`)
            } catch (error) {
                console.log(error)
                this.logger.logError("Slice", `Error loading class ${modulePath}`, error);
            }
        }


        //Create instance
        try {
            const ComponentClass = this.controller.classes.get(componentName);
            const componentInstance = new ComponentClass(props);

            if(props.id) componentInstance.id = props.id;

            //if(isVisual) this.controller.loadTemplate(componentInstance)

            this.stylesManager.handleInstanceStyles(componentInstance,props);
            this.logger.logInfo("Slice", `Instance ${componentName} created`)
            this.controller.registerComponent(componentInstance);
            return componentInstance;

        } catch (error) {
            console.log(error)
            this.logger.logError("Slice", `Error creating instance ${componentName}`, error);
        }

        
    }

    setPaths(paths) {
        this.paths = paths;
    }

    setTheme(themeName) {
        this.stylesManager.setTheme(themeName);
    }

    attachTemplate(componentInstance) {
        this.controller.loadTemplate(componentInstance);
    }

}

function init() {
    window.slice = new Slice();
}

init();