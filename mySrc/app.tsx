import React, { useState } from "react"
import cn from "classnames"
import "./app.css"

const panel = [
  "AC",
  "+/-",
  "%",
  "/",
  "7",
  "8",
  "9",
  "*",
  "4",
  "5",
  "6",
  "-",
  "1",
  "2",
  "3",
  "+",
  "0",
  ".",
  "=",
]
const App = () => {
  const [value, setValue] = useState("0")
  const onChange = (item: string) => {
    setValue(item)
  }
  const yellow = ["/", "*", "-", "+", "="]
  const grey = ["AC", "+/-", "%"]
  return (
    <div className="app">
      <div className="value">
        <span>{value}</span>
      </div>
      <div className="panel">
        {panel.map((item) => {
          return (
            <button
              key={item}
              className={cn(
                "item",
                item === "0" ? "zero" : "",
                yellow.includes(item) ? "yellow" : "",
                grey.includes(item) ? "grey" : ""
              )}
              onClick={() => onChange(item)}
            >
              {item}
            </button>
          )
        })}
      </div>
    </div>
  )
}

// Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:
// 1. You might have mismatching versions of React and the renderer (such as React DOM)
// 2. You might be breaking the Rules of Hooks
// 3. You might have more than one copy of React in the same app

// 不能直接export App，要加一个函数中间层
// Hooks有哪些rules?
export const startApp = () => {
  return <App />
}
