import { component$, useStylesScoped$, useSignal, useStore, useResource$, Resource } from "@builder.io/qwik";
import { useLocation, routeLoader$ } from '@builder.io/qwik-city';
import styles from "./index.css?inline";

// 随机讲一个笑话
export const useDadJoke = routeLoader$(async () => {
  const response = await fetch('https://icanhazdadjoke.com/', {
    headers: { Accept: 'application/json' },
  });
  return (await response.json()) as {
    id: string;
    status: number;
    joke: string;
  };
});

export default component$(() => {
  useStylesScoped$(styles);
  const location = useLocation();
  const dadJokeSignal = useDadJoke();
  console.log(location, '路由参数')
  console.log(dadJokeSignal, '笑话数据')

  // Qwik 提供了一个 useSignal 钩子来跟踪应用程序的状态
  const isFavoriteSignal = useSignal(false)
  const postId = useSignal('23');
  const state = useStore({ 
    count: 0
  });

  const postTitle = useResource$<string>(async ({ track }) => {
    // it will run first on mount (server), then re-run whenever postId changes (client)
    // this means this code will run on the server and the browser
    track(() => postId.value);
 
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/posts/${postId.value}`
    );
    const data = await response.json();
    return data.title as string;
  });

  return (
    <>
      <h1>案例!</h1>
      <button
        onClick$={() => {
          isFavoriteSignal.value = !isFavoriteSignal.value;
        }}>
          点我 {isFavoriteSignal.value ? '❤️' : '🤍'}
      </button>
      <button onClick$={() => state.count++}>数据++: {state.count}</button>
      <section class="section bright">
        <p>{dadJokeSignal.value.joke}</p>
      </section>


      <input type="number" bind:value={postId} max={100} min={0} />
      <Resource
        value={postTitle}
        onPending={() => <p>Loading...</p>}
        onResolved={(title) => <h2>{title}</h2>}
      />
    </>
  );
});