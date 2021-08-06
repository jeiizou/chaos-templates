import * as vscode from 'vscode';

class Context {
    constructor() {}
    // 当前插件的上下文环境
    static context: vscode.ExtensionContext;
    static saveContext(context: vscode.ExtensionContext) {
        this.context = context;
    }
    static getContext() {
        return this.context;
    }
}

export default Context;
