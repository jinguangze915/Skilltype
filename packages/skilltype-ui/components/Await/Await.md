The `Await` component presents a loading component if any of its props are promises.
If any of the promises throw an error, the `Await` component renders an error component.

```js
const sleep = ms => new Promise(r => setTimeout(r, ms))
const SomeComponent = ({ val, val2 }) => {
  if (val === undefined) {
    throw new Error("Shouldn't happen: await property is undefined")
  }
  if (val instanceof Promise) {
    throw new Error("Shouldn't happen: await property is Promise")
  }
  return (
    <React.Fragment>
      <Notify show>{val}</Notify>
      <Notify show>{val2}</Notify>
    </React.Fragment>
  )
}
const someAsyncFunction = ms =>
  sleep(ms).then(() => `Was it worth the wait (${ms}ms)?`)
const someAsyncFunctionWithError = () =>
  sleep(3500).then(() => {
    throw new Error('Mistakes were made.')
  })
const LoadingFallback = () => (
  <Notify show>
    <Progress />loading...
  </Notify>
)
const ErrorFallback = ({ error }) => (
  <NotifyError show>{error.message}</NotifyError>
)

initialState = {
  showAsync: false,
  showAsyncWithError: false,
}
;<NotifyProvider>
  <Section>
    <PrimaryButton
      onClick={() =>
        setState({
          showAsync: true,
          asyncVal: someAsyncFunction(2500).then(asyncVal =>
            setTimeout(() => setState({ asyncVal }), 1000)
          ),
          asyncVal2: someAsyncFunction(1000).then(asyncVal2 =>
            setState({ asyncVal2 })
          ),
        })
      }
    >
      Load Async Component
    </PrimaryButton>
  </Section>
  <Section>
    <PrimaryButton
      onClick={() =>
        setState({
          showAsyncWithErr: true,
          asyncErr: someAsyncFunctionWithError(),
        })
      }
    >
      Load Async Component with Error
    </PrimaryButton>
  </Section>
  <Section>
    {state.showAsync && (
      <Await loadingFallback={<LoadingFallback />}>
        <SomeComponent val={state.asyncVal} val2={state.asyncVal2} />
      </Await>
    )}
    {state.showAsyncWithErr && (
      <Await
        loadingFallback={<LoadingFallback />}
        errorFallback={<ErrorFallback />}
      >
        <SomeComponent val={state.asyncErr} />
      </Await>
    )}
  </Section>
</NotifyProvider>
```
