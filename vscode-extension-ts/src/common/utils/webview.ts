import { Uri, Webview } from 'vscode';
import Mustache from 'mustache';

import { getNonce } from '@/common/utils/tools';
import Context from '@/common/utils/context';
import indexContent from '@/common/utils/content.html';

export function getWebViewContent(script: string, webview: Webview) {

    const { extensionUri } = Context.getContext();
    const getPath = (pathList: string[]) =>
        webview.asWebviewUri(Uri.joinPath(extensionUri, ...pathList));

    const contentData: {
        [key: string]: any;
    } = {
        title: 'TODO',
        styles: [],
        scripts: [],
        cspSource: webview.cspSource,
        nonce: getNonce(),
        content: '<div id="root"></div> ',
    };

    // TODO: 添加需要注入的js和css

    let renderHtml = Mustache.render(indexContent, contentData);
    return renderHtml;
}
