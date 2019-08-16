# React event boundary

Respond to user actions in easy and scalable way.

## Install

```bash

npm i -S react-event-boundary

```

## Usage

To use event boundary in your React project you first need to create one.

Boundary creator accepts a single context that will be used to pass dispatch function down through your React tree:

```javascript
import { createEventBoundary } from "react-event-boundary";

const DispatchContext = React.createContext(event => console.log(event));

const EventBoundary = createEventBoundary(DispatchContext);
```

That's it. Now you are able to set up boundaries in your project to handle events dispatched from below. Any event bubbles up to the highest boundary in your tree so it becomes easy to handle a single event at different levels.

```jsx
const Component1 = () => {
  const [count, setCount] = React.useState(0);

  const handleEvent = React.useCallback(event => {
    if (event === "INC") {
      setCount(prev => prev + 1);
    }
    if (event === "DEC") {
      setCount(prev => prev - 1);
    }
  }, []);

  return (
    <EventBoundary handler={handleEvent}>
      {count}
      <Component2 />
    </EventBoundary>
  );
};

const Component2 = () => {
  const [count, setCount] = React.useState(0);

  const handleEvent = React.useCallback(event => {
    if (event === "INC") {
      setCount(prev => prev + 2);
    }
    if (event === "DEC") {
      setCount(prev => prev - 2);
    }
  }, []);

  return (
    <EventBoundary handler={handleEvent}>
      {count}
      <Component3 />
    </EventBoundary>
  );
};

const Component3 = () => {
  const dispatch = React.useContext(DispatchContext);

  const handleIncButtonClick = React.useCallback(() => {
    dispatch("INC");
  }, [dispatch]);

  const handleDecButtonClick = React.useCallback(() => {
    dispatch("DEC");
  }, [dispatch]);

  return (
    <div>
      <button onClick={handleIncButtonClick}>inc</button>
      <button onClick={handleDecButtonClick}>dec</button>
    </div>
  );
};
```
