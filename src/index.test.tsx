import React from "react";
import { render, cleanup, fireEvent } from "@testing-library/react";

import { createEventBoundary } from "..";

type TEvent = "EVENT";

const TEST_EVENT: TEvent = "EVENT";

const renderComponent = () => {
  // Use any to make typescript shut up when passing DispatchContext to createEventBoundary.
  const fallbackEventHandler: any = jest.fn();

  const DispatchContext = React.createContext(fallbackEventHandler);

  const BUTTON_TEST_ID = "BUTTON_TEST_ID";

  const Component = () => {
    const dispatch = React.useContext(DispatchContext);

    const handleClick = () => {
      dispatch(TEST_EVENT);
    };

    return <button onClick={handleClick} data-testid={BUTTON_TEST_ID} />;
  };

  const eventHander = jest.fn();

  const EventBoundary = createEventBoundary(DispatchContext);

  const mounted = render(
    <EventBoundary handler={eventHander}>
      <Component />
    </EventBoundary>
  );

  const getFallbackEventHandler = () => fallbackEventHandler;

  const getEventHandler = () => eventHander;

  const getButtonNode = () => mounted.getByTestId(BUTTON_TEST_ID);

  const clickButton = () => {
    fireEvent.click(getButtonNode());
  };

  return {
    getEventHandler,
    getFallbackEventHandler,
    clickButton
  };
};

afterEach(cleanup);

describe("should recieve event dispatched from child tree", () => {
  test("locally", () => {
    const { getEventHandler, clickButton } = renderComponent();

    clickButton();

    expect(getEventHandler()).toBeCalledTimes(1);
    expect(getEventHandler()).toBeCalledWith(TEST_EVENT);
  });
  test("with fallback handler", () => {
    const { getFallbackEventHandler, clickButton } = renderComponent();

    clickButton();

    expect(getFallbackEventHandler()).toBeCalledTimes(1);
    expect(getFallbackEventHandler()).toBeCalledWith(TEST_EVENT);
  });
});
