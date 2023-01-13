import ReactDOM from "react-dom"
import { startApp } from "./app"

// 这个文件里不能直接使用<App  />，因为这是ts文件.tsx里是可以用<App  />语法的
ReactDOM.render(startApp(), document.getElementById("root"))
