import { InputBoxOptions, OutputChannel, window } from 'vscode';
import * as chalk from 'chalk';
import { codeName, codeName_zh } from '@/common/const';

/**
 * 打印日志处理
 */
class LoggerModel {
    static logger: LoggerModel;
    static create() {
        if (!this.logger) {
            this.logger = new LoggerModel();
        }
        return this.logger;
    }

    outputPanel: OutputChannel;
    constructor() {
        this.outputPanel = window.createOutputChannel(codeName);
    }

    async clear() {
        this.outputPanel.clear();
    }

    async showPanel() {
        this.outputPanel.show();
    }

    async log(text: string) {
        this.outputPanel.appendLine(`[${codeName_zh}]:${text}`);
    }

    async logError(text: string) {
        this.outputPanel.appendLine(chalk.red(`${codeName_zh}: ${text}`));
    }

    async info(text: string) {
        return window.showInformationMessage(`${codeName_zh}: ${text}`);
    }

    async prompt(text: string) {
        return window.showInformationMessage(`${codeName_zh}: ${text}`, {
            modal: true,
        });
    }

    async warn(text: string) {
        return window.showWarningMessage(`${codeName_zh}: ${text}`);
    }

    async error(text: string) {
        return window.showErrorMessage(`${codeName_zh}: ${text}`);
    }

    async infoInStatus(msg: string) {
        let handle = window.setStatusBarMessage(msg);
        setTimeout(() => {
            handle.dispose();
        }, 2000);
        return handle;
    }
}

export default LoggerModel.create();
