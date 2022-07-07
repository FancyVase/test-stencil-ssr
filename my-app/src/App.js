import React from 'react';
import { ParentComponent, ChildComponent } from 'test-components.react';

function App() {
  const [env, setEnv] = React.useState('server');

  React.useEffect(() => {
    setEnv('browser');
  }, []);

  return (
    <div>
      <div>{`Default ParentComponent. Renders ChildComponent inside ParentComponent's test-slot`}</div>
      <ParentComponent />

      <br />

      <div>{`ChildComponent by itself renders as expected`}</div>
      <ChildComponent text="rendering directly from app" />

      <br />

      <div>{`ParentComponent with custom content in slot renders as expected`}</div>
      <ParentComponent>
        <div slot="test-slot">
          <div>Custom content in slot</div>
        </div>
      </ParentComponent>

      <br />

      <div><strong>{`BUG: ParentComponent with Stencil component inside its slot renders correctly on the server, but double renders on hydration`}</strong></div>
      <ParentComponent>
        <ChildComponent slot="test-slot" text="ChildComponent as slot replacement" />
      </ParentComponent>

      <br />

      <div>Currently rendering in: {env}</div>
    </div>
  );
}

export default App;
