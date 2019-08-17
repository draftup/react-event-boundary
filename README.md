# React event boundary

Simple and scalable event system for React projects.

[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)

## Install

```bash

npm i -S react-event-boundary

```

## Highlights

- Build to work with existing React state management solutions.
- Typescript and Flow type definitions included.

## Usage

To use event boundary in your React project you first need to create one.

Boundary creator accepts a React context instance that will be used to pass dispatch function down through your React tree:

```javascript
import { createEventBoundary } from "react-event-boundary";

const DispatchContext = React.createContext(event => {
  // Here you will be recieving all events dispatched
  // in your application. Use this handler, for example,
  // to log events into console.
  console.log(event);
});

const EventBoundary = createEventBoundary(DispatchContext);
```

That's it. Now you are able to set up boundaries in your project to handle events propagated through your application.

```jsx
const Root = () => {
  const [rootCount, setRootCount] = React.useState(0);

  const handleEvent = React.useCallback(event => {
    if (event === "INC") {
      // Each time local boundary cathes "INC" event
      // dispatched from child tree root count will be
      // incremented.
      setRootCount(prev => prev + 1);
    }
  }, []);

  return (
    <EventBoundary handler={handleEvent}>
      <div>{rootCount}</div>
      <Button />
    </EventBoundary>
  );
};

const Button = () => {
  const dispatch = React.useContext(DispatchContext);

  const handleButtonClick = React.useCallback(() => {
    // Dispatched event will bubble up to the
    // highest event boundary you set. Along the
    // way event can trigger as many state mutations
    // as you want.
    dispatch("INC");
  }, [dispatch]);

  return <button onClick={handleButtonClick}>increment</button>;
};
```

Any event bubbles up to the highest boundary in your tree. Therefore it becomes easy to handle a single event at different levels. See the working example on a codesandox:

[![Edit react-event-boundary demo (useState)](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/react-event-boundary-demo-usestate-qsiso?fontsize=14)

---

For complex state management scenarios you may want to replace `React.useState()` with `React.useReducer()`. It's straitforward to use this approach with event boudary:

```jsx
const reducer = (state, event) => {
  switch (event) {
    case "INC":
      return {
        ...state,
        count: state.count + 1
      };
    default:
      return state;
  }
};

const initialState = {
  count: 0
};

const Root = () => {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  // All events dispatched from child tree will be passed
  // directly to dispatch function.
  return (
    <EventBoundary handler={dispatch}>
      <div>{rootCount}</div>
      <Button />
    </EventBoundary>
  );
};
```

See the working example on a codesandox:

[![Edit react-event-boundary demo (useReducer)](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/react-event-boundary-demo-usereducer-pxrgr?fontsize=14)

## License

This project is [MIT licensed](./LICENSE).
