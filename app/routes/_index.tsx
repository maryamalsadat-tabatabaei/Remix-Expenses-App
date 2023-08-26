import type { V2_MetaFunction } from "@remix-run/node";

export const meta: V2_MetaFunction = () => {
  return [
    { title: "Remix Expenses App" },
    {
      name: "description",
      content: "This is an expenses app using Remix and Tailwind!",
    },
  ];
};

export default function Index() {
  return <main></main>;
}
