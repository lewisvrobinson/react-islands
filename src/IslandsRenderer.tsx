import React, { cloneElement, createElement } from 'react';
import { createPortal } from 'react-dom';

export function IslandsRenderer({
  children,
}: {
  children: React.ReactElement | React.ReactElement[];
}) {
  const components = React.Children.toArray(children);
  console.log(components);

  function createIsland(component: React.ReactElement) {
    const { componentIslandName, ...componentProps } = component.props;
    const islandNodes = React.useRef(
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
          <React.Suspense>
            {createPortal(componentWithProps, islandNode)}
          </React.Suspense>
        );
      }
    }
  }

  return (
    <React.Fragment>
      {components.map((component) => createIsland(component))}
    </React.Fragment>
  );
}
