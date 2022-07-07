import { Component, Prop, h } from '@stencil/core';

@Component({
  tag: 'child-component',
  styleUrl: 'child-component.css',
  shadow: true,
})
export class MyComponent {
  @Prop() text: string;

  render() {
    return <div>ChildComponent: {this.text}</div>;
  }
}
