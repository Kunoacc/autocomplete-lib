1. **Difference between Component and PureComponent**

    N/A

2. **Context + ShouldComponentUpdate**

    React's `shouldComponentUpdate` lifecycle method allows us to prevent unnecessary re-renders by comparing new and old props/state. However, changes in React context do not trigger `shouldComponentUpdate`, even when a component consumes the changed context. If a parent component returns false from `shouldComponentUpdate`, React will skip rendering for its entire subtree, even if a child component consumes a context value that has changed.

3. **Three ways to pass information from a component to its parent**

- **Lifting State Up**: Storing shared state in the nearest parent so depending children can access it from a single place.

- **Callbacks**: The parent can pass a function to the child component via props. The child then calls this function to send necessary data back to the parent.

- **Event Bubbling**: You can bubble events up the component tree from child to parent so the parent utlizes the data passed for processing.

4. **Two ways to prevent components from re-rendering**

  - **useMemo**.

  - **useCallback**.

5. **What is a fragment and why do we need it**

    A Fragment is like a component that let's you group multiple elements/components together and it's complied away on runtime so it does not actually add any more elements to the DOM. You can also use them to have multiple root nodes in a react component.

6. **Three examples of the HOC pattern**

  - **withRouter**: This HOC provides routing props to the wrapped component.

  - **React.memo**: This HOC provides a performance boost in some cases by memoizing the result, i.e., it only re-renders if the props change.

7. **Difference in handling exceptions in promises, callbacks and async/await**

  - **Promises** Use `.catch()` in the promise chain for error handling.

  - **Callbacks** use an argument for error handling.

  - **Async/Await** Uses try-catch blocks to handle errors in these functions.

8. **Arguments in setState and its asynchronous nature**

    setState takes two arguments: one to update the state and a callback function. The updater is responsible for actually updating the state. The callback is a function that will be called after state is updated. setState is async to be able to support batch changes/updates.

9. **Steps to migrate a Class to Function Component**

  - Replace the class declaration with a function declaration.
  - Move the body of the `render` method to the function body.
  - Replace `this.props` with `props`.
  - Replace the constructor and `this.state` with `useState` hooks.
  - Replace lifecycle methods with `useEffect` hooks.
  - Replace `this.setState` with the `setState` function returned from `useState`.

10. **Ways styles can be used with components**

- **Inline styles**.

- **CSS classes**.

- **Styled-components**.

- **CSS Modules**.

11. **Rendering an HTML string coming from the server**

Use the `dangerouslySetInnerHTML` prop.