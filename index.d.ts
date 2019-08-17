import { FC, Context } from "react";

type Handler<Event> = (event: Event) => void;

type EventBoundary<Event> = FC<{
  handler: Handler<Event>;
}>;

type Dispatch<Event> = (event: Event) => void;

type DispatchContext<Event> = Context<Dispatch<Event>>;

export function createEventBoundary<Event>(
  DispatchContext: DispatchContext<Event>
): EventBoundary<Event>;
