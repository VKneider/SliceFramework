export default class Logger {
     constructor() {
        this.logs = [];
    }

    logError(componentName, message, error) {
        this.addToLogs(logTypes.ERROR, componentName, message, error);
    }

    logWarning(componentName, message) {
        this.addToLogs(logTypes.WARNING, componentName, message);
    }

    logInfo(componentName, message) {
        this.addToLogs(logTypes.INFO, componentName, message);
    }

    addToLogs(type, componentName, message, error = null) {
        this.logs.push({ type, componentName, message, error, timestamp: new Date() });
    }

    getLogs() {
        return this.logs;
    }

    clearLogs() {
        this.logs = [];
    }

    getLogsByType(type) {
        return this.logs.filter(log => log.type === type);
    }

    getLogsByComponent(componentName) {
        return this.logs.filter(log => log.componentName === componentName);
    }

    
}

const logTypes = {
    ERROR: 'ERROR',
    WARNING: 'WARNING',
    INFO: 'INFO'
};