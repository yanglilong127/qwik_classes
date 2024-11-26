
import { component$, useSignal, $ } from '@builder.io/qwik';
import { qwikify$ } from '@builder.io/qwik-react';
import { Button, Divider } from 'antd';
import 'antd/dist/antd.css'; // 引入 Ant Design 的样式

// 注意这里一定要加， { eagerness: 'hover' } 否则无法触发click事件
export const AntButton = qwikify$(Button, { eagerness: 'hover' });
export const AntDivider = qwikify$(Divider);

export default component$(() => {
  const count = useSignal(0);

  const onClick = $(() => {
    count.value++
  })
  return (
    <div>
      <AntButton type="primary" onClick$={onClick}>按钮 {count.value}</AntButton>
      <AntDivider />
    </div>
  );
});