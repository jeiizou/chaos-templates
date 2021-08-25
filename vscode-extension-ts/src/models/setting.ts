import * as vscode from 'vscode';
import { codeName } from '@/common/const';
import * as os from 'os';

/**
 * VS Code的设置项管理
 */
class SettingModel {
    static setting: SettingModel;
    static create() {
        if (!this.setting) {
            this.setting = new SettingModel();
        }

        return this.setting;
    }

    config: vscode.WorkspaceConfiguration;

    constructor() {
        this.config = vscode.workspace.getConfiguration(codeName);
        vscode.workspace.onDidChangeConfiguration((e) => {
            this.config = vscode.workspace.getConfiguration(codeName);
        });
    }

    async updateConfig(propName: string, value: any) {
        let res = await this.config.update(
            propName,
            value,
            vscode.ConfigurationTarget.Global,
        );
        this.config = vscode.workspace.getConfiguration(codeName);
        return res;
    }
}

export default SettingModel.create();
