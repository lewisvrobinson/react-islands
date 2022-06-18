import { cloneElement } from 'react';
import { createPortal } from 'react-dom';

function createIsland(component: React.ReactElement, name: string) {
  const islandNode = document.querySelector(
    `react-component[data-component-name="${name}"]`
  ) as HTMLElement;

  if (islandNode) {
    const islandProps = islandNode.dataset.props ? JSON.parse(islandNode.dataset.props) : '';
    const componentWithProps = cloneElement(component, {
      ...component.props,
      ...islandProps,
    });

    return createPortal(componentWithProps, islandNode);
  }
}

export function islandRenderer(components: {
  [key: string]: React.ReactElement;
}) {
  return Object.entries(components).map(([name, component]) =>
    createIsland(component, name)
  );
}
