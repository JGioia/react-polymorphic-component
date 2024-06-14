import React from 'react';

interface AsProp<C extends React.ElementType> {
    as?: C;
}

interface ForwardedProps<C extends React.ElementType> {
    className?: string;
    style?: React.CSSProperties;
    // This contains the props that are sent to the component
    // PolymorphicComponent is acting `as`. If you do not set the `as`
    // prop, then the PolymorphicComponent will have a default component
    // it renders as. This component may vary between each use of
    // PolymorphicComponent, but it is usually a div.
    asProps?: React.ComponentPropsWithoutRef<C>;
}

type PolymorphicComponentPropsWithoutRef<
    C extends React.ElementType,
    Props = unknown,
> = React.PropsWithChildren<Props & AsProp<C> & ForwardedProps<C>>;

/**
 * This type defines the props of a polymorphic component that accepts
 * a component to render `as`, a `ref`, and additional unknown props to
 * pass to the component we are rendering `as`. The props `className`
 * and `style` are forwarded to the component we are rendering `as`.
 * Any other props you want to forward must be sent through `asProps`.
 */
export type PolymorphicComponentProps<
    C extends React.ElementType,
    Props = unknown,
> = PolymorphicComponentPropsWithoutRef<C, Props> & { ref?: PolymorphicRef<C> };

type PolymorphicRef<C extends React.ElementType> =
    React.ComponentPropsWithRef<C>['ref'];


/**
 * This type represents any polymorphic component.
 *
 * DefaultType denotes what `as` will default to when not specified.
 * When this prop is not specified `as` will default to `div`.
 *
 * Note: Using forwardRef without defining the type of the component
 * will result in the component having `any` props.
 */
export type PolymorphicComponentType<
    Props = unknown,
    DefaultType extends React.ElementType = 'div',
> = <C extends React.ElementType = DefaultType>(
    props: PolymorphicComponentProps<C, Props>,
) => React.ReactNode;

/**
 * This component takes an `as` property which specifies what element type
 * that this component should act as. For example, setting `as="button"`
 * will cause this component to render as a button. This component
 * defaults to rendering as a div. You may supply instrinic elements or
 * user defined components to the `as` property. You may optionally pass
 * a ref to be forwarded to this component. This component also passes
 * along `className`, `style`, 'ref', and the contents of `asProps` to the
 * component it is rendering `as`.
 *
 * You may also want to reference to this component when you are defining
 * the type for a new polymorphic component using ref.
 */
export const PolymorphicComponent: PolymorphicComponentType = React.forwardRef(
    <C extends React.ElementType = 'div'>(
        {
            as,
            children,
            className,
            style,
            asProps,
        }: PolymorphicComponentProps<C>,
        ref?: PolymorphicRef<C>,
    ) => {
        const Component = as ?? 'div';
        return (
            <Component
                ref={ref}
                className={className}
                style={style}
                {...asProps}
            >
                {children}
            </Component>
        );
    },
);
