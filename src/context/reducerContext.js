import React from "react";

const ReducerContext = React.createContext({
  state: {},
  dispatch: () => {}
})

ReducerContext.displayName = 'ReducerContext'

export default ReducerContext