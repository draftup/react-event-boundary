import React from "react";

import { DispatchContext, EventBoundary } from "..";

/**
 * A custom error class.
 */
class EventBoundaryError extends Error {}

/**
 * @function createEventBoundary - function that can be used to create event boundary.
 *
 * @param DispatchContext - a React context instance that will be used to pass dispatch function down through your React tree.
 */
export function createEventBoundary<Event>(
  DispatchContext: DispatchContext<Event>
) {
  /**
   * @function EventBoundary - functional React component that can be used to catch events dispatched from a child component tree.
   *
   * @param handler - a function that will handle dispatched events locally.
   */
  const EventBoundary: EventBoundary<Event> = props => {
    const { children, handler: localHandler } = props;

    if (!localHandler) {
      throw new EventBoundaryError('Missing required "handler" prop.');
    }

    const upperDispatch = React.useContext(DispatchContext);

    const nextDispatch = React.useCallback(
      event => {
        localHandler(event);
        upperDispatch(event);
      },
      [localHandler, upperDispatch]
    );

    return (
      <DispatchContext.Provider value={nextDispatch}>
        {children}
      </DispatchContext.Provider>
    );
  };

  return EventBoundary;
}
