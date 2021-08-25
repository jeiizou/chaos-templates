import { Event } from '@/common/utils/event';
import { WebviewApi } from 'vscode-webview';

const vscode = acquireVsCodeApi();

let reciver = (fn: any) =>
    window.addEventListener('message', (ev: any) => {
        fn.call(this, ev.data);
    });
let emitter = vscode.postMessage;

const ev = new Event(reciver, emitter);

export default ev;
