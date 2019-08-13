import React from "react";

type EventBoundaryProps<Event> = React.FC<{
  handler: React.Dispatch<Event>;
}>;

type EventBoundaryCreator = <Event>(
  DispatchContext: React.Context<React.Dispatch<Event>>
) => React.FC<EventBoundaryProps<Event>>;

export const createEventBoundary: EventBoundaryCreator = DispatchContext => {
  const EventBoundary = props => {
    const { children, handler: localHandler } = props;

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
};
