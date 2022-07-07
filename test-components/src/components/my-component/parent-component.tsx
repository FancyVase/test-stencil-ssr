import { Component, h, Prop } from '@stencil/core';

@Component({
  tag: 'parent-component',
  styleUrl: 'parent-component.css',
  shadow: true,
})
export class MyComponent {
  @Prop() text: string;

  render() {
    return (
      <div>
        <div>ParentComponent</div>
        <slot name="test-slot">
          <child-component text="Default - rendered in ParentComponent"></child-component>
        </slot>
      </div>
    );
  }
}
