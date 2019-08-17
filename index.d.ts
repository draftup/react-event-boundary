type THandler<Event> = (event: Event) => void;

type EventBoundary<Event> = React.FC<{
  handler: THandler<Event>;
}>;

type TDispatch<Event> = (event: Event) => void;

type DispatchContext<Event> = React.Context<TDispatch<Event>>;

export function createEventBoundary<Event>(
  DispatchContext: DispatchContext<Event>
): EventBoundary<Event>;
