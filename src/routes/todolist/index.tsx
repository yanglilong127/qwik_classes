import { component$, useSignal, $ } from '@builder.io/qwik';
import { qwikify$ } from '@builder.io/qwik-react';
import { Input, Button, List } from 'antd';
import 'antd/dist/antd.css'; // 引入 Ant Design 的样式

// 使用 qwikify$ 包装 Ant Design 组件
const AntInput = qwikify$(Input, { eagerness: 'hover' });
const AntButton = qwikify$(Button, { eagerness: 'hover' });
const AntList = qwikify$(List, { eagerness: 'load' });
const AntListItem = qwikify$(List.Item, { eagerness: 'load' });

export default component$(() => {
  const newTask = useSignal('');
  const tasks = useSignal<string[]>([]);

  const addTask = $(() => {
    if (newTask.value.trim()) {
      tasks.value = [...tasks.value, newTask.value];
      newTask.value = '';
    }
  });

  const removeTask = $((index: number) => {
    tasks.value = tasks.value.filter((_, i) => i !== index);
  });

  return (
    <div style={{ padding: '20px', maxWidth: '400px', margin: '0 auto' }}>
      <h2>待办事项</h2>
      <div style={{ display: 'flex', marginBottom: '10px' }}>
        <input
          value={newTask.value}
          onChange$={(e) => (newTask.value = (e.target as any).value)}
          placeholder="输入新任务"
          style={{ marginRight: '10px' }}
        />
        <AntButton type="primary" onClick$={addTask}>
          添加
        </AntButton>
      </div>
      <AntList
        bordered
        dataSource={tasks.value}
        renderItem$={(item) => <AntListItem>{item}</AntListItem>}
      />
    </div>
  );
});