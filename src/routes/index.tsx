import { component$ } from "@builder.io/qwik";
import { type DocumentHead, Link } from "@builder.io/qwik-city";

export default component$(() => {
  return (
    <>
      <h1>Hi 👋</h1>
      <div>
        快来试试吧~  
        <br />快乐编码吧~
      </div>
      <div>
        <Link href="/example" prefetch={false}>
          example
        </Link>
      </div>
      <div>
        <Link href="/todolist" prefetch={false}>
          todolist
        </Link>
      </div>
      <div>
        <Link href="/mui" prefetch={false}>
          mui
        </Link>
      </div>
      <div>
        <Link href="/ant" prefetch={false}>
          ant
        </Link>
      </div>
    </>
  );
});

export const head: DocumentHead = {
  title: "Welcome to Qwik",
  meta: [
    {
      name: "description",
      content: "Qwik site description",
    },
  ],
};
