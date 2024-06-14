# react-polymorphic-component
A successor to kripod's react-polymorphic-types to make it fully compatible with Typescript 5
![gif](https://github.com/JGioia/react-polymorphic-component/assets/14362324/b5c121e4-e1b7-4a4a-8f01-05967d6cac8c)

## What is a polymorphic component?
A Polymoprhic Component is a component that can act as if it is any other component! It passes props along to the component it is acting `as`, and it can be used when you want the component it is acting as to change at runtime or to apply some shared styling to all of the components it is acting as. 

## Why not use kripod's react-polymorphic-box or react-polymorphic-types?
A common usecase is to define your own polymorphic component on top of `PolymorphicComponent` that applies some shared styling. The type checking for this use case broke in Typescript 5. That is because there is a possibility of overlap between the props of the component you are acting as and the props of the polymorphic component. For example, if the polymorphic component requires a `size` prop that is a `number` and the component we are acting `as` requires a `size` prop that is a `string`, Typescript doesn't know which type `size` should have. This issue is discussed in more detail on this blog: https://sandroroth.com/blog/react-polymorphic-components/#problems and this github issue: https://github.com/kripod/react-polymorphic-box/issues/25.

## How does this package solve that?
By separating all of the props we want to send to the `as` component into their own `asProps` there is no possibility of a type overlap! Additionally, I chose to automatically forward the `className` and `style` props along to the `as` component to make it very easy to migrate from kripod's react-polymorphic-box.
