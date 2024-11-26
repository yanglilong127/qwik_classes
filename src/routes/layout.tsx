import { component$, Slot, useSignal, $, useVisibleTask$ } from "@builder.io/qwik";
import { qwikify$ } from '@builder.io/qwik-react';
import { useNavigate, useLocation } from '@builder.io/qwik-city';
import { Tabs, type TabsProps } from 'antd';

export const AntTabs = qwikify$(Tabs, { eagerness: 'hover' });

export default component$(() => {
  const nav = useNavigate();
  const location = useLocation();
  const tab = useSignal('/');

  // 使用 useVisibleTask$ 来在组件可见时初始化 tab 的值
  useVisibleTask$(() => {
    // location.url.pathname // /todolist/
    let pathname = location.url.pathname
    if (pathname !== '/') {
      pathname = pathname.slice(0, -1)
    }
    tab.value = pathname; // 初始化为当前路径
  });

  const items: TabsProps['items'] = [
    {
      key: '/',
      label: '首页'
    },
    {
      key: '/example',
      label: '案例'
    },
    {
      key: '/todolist',
      label: 'todolist'
    },
    {
      key: '/mui',
      label: 'materialui框架'
    },
    {
      key: '/ant',
      label: 'antd'
    }
  ];

  const onChange = $((key: string) => {
    tab.value = key;
    nav(key); // 跳转路由
  });

  return (
    <>
      <AntTabs
        activeKey={tab.value}
        centered
        items={items}
        onChange$={onChange}
      />
      <Slot />
    </>
  );
});