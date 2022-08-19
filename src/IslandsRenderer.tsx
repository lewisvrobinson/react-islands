import React, { createElement } from 'react';
import { createPortal } from 'react-dom';

interface IslandsRendererProps {
  fallback?: React.ReactNode | null;
  children: React.ReactElement | React.ReactElement[];
}

export function IslandsRenderer({
  fallback = null,
  children,
}: IslandsRendererProps) {
  const components = React.Children.toArray(children);

  function createIsland(component: React.ReactElement) {
    const { componentIslandName, ...componentProps } = component.props;
    const islandNodes = React.useRef<NodeListOf<HTMLElement>>(
      document.querySelectorAll(
        `react-component[data-component-name="${componentIslandName}"]`
      )
    );

    if (islandNodes?.current) {
      for (const islandNode of islandNodes.current) {
        // const componentStub = React.Children.only(component)
        const islandProps = islandNode.dataset.props
          ? JSON.parse(islandNode.dataset.props)
          : '';
        /**
         * NOTE: Using createElement instead of cloneElement allow prop removal
         * @see https://stackoverflow.com/questions/43041013/react-remove-prop-from-child
         */
        const componentWithProps: React.ReactElement = createElement(
          component.type,
          {
            ...componentProps,
            ...islandProps,
            key: component.key || 'island_' + performance.now,
          }
        );

        return (
          <React.Suspense fallback={fallback}>
            {createPortal(componentWithProps, islandNode)}
          </React.Suspense>
        );
      }
    }
  }

  return (
    <React.Fragment>
      {components.map((component) =>
        createIsland(component as React.ReactElement)
      )}
    </React.Fragment>
  );
}
