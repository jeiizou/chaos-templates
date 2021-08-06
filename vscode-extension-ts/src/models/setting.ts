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

    getGitDir(): string | undefined {
        if (os.platform() === 'win32') {
            return this.config.get('gitDirOnWin');
        } else {
            return this.config.get('gitDirOnUnix');
        }
    }

    async setGitDir(ph: string) {
        if (os.platform() === 'win32') {
            return this.updateConfig('gitDirOnWin', ph);
        } else {
            return this.updateConfig('gitDirOnUnix', ph);
        }
    }

    getSync() {
        return this.config.get('autoSync');
    }

    async setSync(open: boolean) {
        return this.updateConfig('autoSync', open);
    }

    async isNoRemote() {
        return this.config.get('noRemote');
    }

    async setNoRemote(value: boolean) {
        return this.updateConfig('noRemote', value);
    }
}

export default SettingModel.create();
