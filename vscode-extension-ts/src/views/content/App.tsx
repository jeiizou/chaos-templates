import React, { useEffect } from 'react';
import event from '@page-content/common/event-view';
import { EVENT_ENUM } from '@/common/types/event';

interface AppProp {}
const App: React.VFC<AppProp> = () => {
    useEffect(() => {
        // 通知宿主, 完成渲染
        event.emit({ type: EVENT_ENUM.HOOKS_RENDER_FINISHED });
    }, []);

    return <div>Home</div>;
};

export default App;
