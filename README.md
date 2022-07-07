# Stencil + React + SSR Double Rendering Bug

I'm running into a bug where my component gets rendered twice under the following conditions:

1. Render a Stencil component as an override of another Stencil component's slot
2. Server side render the React output of these Stencil components
3. SSR will produce the correct output, but hydration will render a duplicate of the component inside the slot.

-----

## Repro

This repo has 3 subdirectories:

1. `test-components`
Stencil component library.

2. `test-components.react`
React output of `test-components`.

3. `my-app`
Simple React app with SSR that consumes these Stencil components.

To view the error, run the following:
```sh
# Install and build Stencil components
cd test-components
npm install
npm run build

# Install and build Stencil React output
cd test-components.react
npm install
npm run build

# Install and run React app
cd my-app
npm install
npm run dev
```

Then open `localhost:3006` and you'll see the double render bug. Specifically, the following markup renders a duplicate component on hydration:

```jsx

import {ParentComponent, ChildComponent} from 'test-components.react';

() => (
  <ParentComponent>
    <ChildComponent slot="test-slot" text="ChildComponent as slot replacement" />
  </ParentComponent>
)
```

![SSR working correctly](https://p-myf5wv.b3.n0.cdn.getcloudapp.com/items/5zurrxoJ/b41a0007-2d66-4ce1-a97c-ea1137dc354c.jpg?v=e6920539e4797cdff55cde2073494d5f)

![Hydration rendering a duplicate](https://p-myf5wv.b3.n0.cdn.getcloudapp.com/items/jkuXX5pB/75a09460-f38f-41a5-9f31-27438a3e0036.jpg?source=viewer&v=5e88892108395cd5547d92f77c05d529)