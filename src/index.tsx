import React from "react";

// Types

type EventBoundary<Event> = React.FC<{
  handler: React.Dispatch<Event>;
}>;

type DispatchContext<Event> = React.Context<React.Dispatch<Event>>;

export type EventBoundaryCreator = <Event>(
  DispatchContext: DispatchContext<Event>
) => EventBoundary<Event>;

// Utils

class EventBoundaryError extends Error {}

// Lib

export function createEventBoundary<Event>(
  DispatchContext: DispatchContext<Event>
) {
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
