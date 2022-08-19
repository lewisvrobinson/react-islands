# 🏝 React Islands

> A modern take on an old React design pattern.

[⚡️ Live demo](https://react-islands.vercel.app)

## How it works

***🏗 This package is in early development. Proceed with caution.***

### No mounted root

`react-islands` works by creating a root element but *does not* add it to the DOM. 
This is because for apps using this approach there is no singular root element to mount a traditional "app" to.

### Islands

The *island* components are declared by passing them as children to `<IslandsRenderer />`.
These components are then rendered using React Portals into their respective DOM elements.

### Providers

Providers can be used to wrap the `<IslandsRenderer>` component, allowing its children to consume their provided context.

## Motivation

A common early design pattern for appliications using React was to use it to add "islands"[^1] of reactivity on a page.
As time moved on, and best-practices evolved, some of these projects were left behind.

Typically this is done by mounting a react component to an empty element that exists somewhere in the DOM.
This approach works fine more the most part but comes at the cost of being unable to benifit from global providers for context, state management, routing etc.

[^1]: https://jasonformat.com/islands-architecture/
