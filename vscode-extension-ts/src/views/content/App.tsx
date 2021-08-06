import React, { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';

import { configState } from '@/views/content/common/states';
import { EventCenter } from '@/common/const/event';

const vscode = acquireVsCodeApi();

interface AppProp {}
const App: React.VFC<AppProp> = () => {
  const setNamesState = useSetRecoilState(configState);

  const EventDispatcher = (event: any) => {
    if (event.data) {
      const { type, data } = event.data;
      switch (type) {
        case EventCenter.sendConfig:
          setNamesState(() => data);
        default:
          break;
      }
    }
  };

  useEffect(() => {
    // 建立监听
    window.addEventListener('message', EventDispatcher);
    // 完成主要界面的渲染
    vscode.postMessage({ type: EventCenter.renderFinished });
    return () => window.removeEventListener('message', EventDispatcher);
  }, []);

  return (
        <div>
           Home
        </div>
  );
};

export default App;
