import { InputBoxOptions, window } from 'vscode';
import { codeName_zh } from '@/common/const';

/**
 * 对话框处理
 */
class PromptModel {
    static prompt: PromptModel;
    static create() {
        if (!this.prompt) {
            this.prompt = new PromptModel();
        }

        return this.prompt;
    }

    /**
     * 输入框, 返回输入的值
     * @param desc
     * @param value
     * @param opts
     * @returns
     */
    async input(desc: string, value?: string, opts?: InputBoxOptions) {
        return window.showInputBox({
            ignoreFocusOut: true,
            password: false,
            value: value,
            placeHolder: desc,
            title: `[${codeName_zh}] ${desc}`,
            ...opts,
        });
    }

    /**
     * 确认框, 返回 boolean
     * @param desc
     * @param ok
     * @param modal
     * @returns
     */
    async confirm(desc: string, ok: string = '确认', modal: boolean = true) {
        return window
            .showInformationMessage(
                `[${codeName_zh}]${desc}`,
                {
                    modal,
                },
                ok,
            )
            .then((data) => {
                if (data === ok) {
                    return true;
                } else {
                    return false;
                }
            });
    }

    /**
     * 选择框, 返回选择的值
     * @param desc
     * @param items
     * @returns
     */
    async select(desc: string, items: string[]) {
        return window.showQuickPick(items, {
            placeHolder: desc,
        });
    }

    /**
     * 文件夹选择框, 返回文件夹路径
     * @param desc
     * @returns
     */
    async directorySelect(desc: string) {
        return window.showOpenDialog({
            canSelectFolders: true,
            canSelectFiles: false,
            openLabel: desc,
        });
    }
}

export default PromptModel.create();
