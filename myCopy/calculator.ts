import { Eventer } from "./eventer"
import { reduce, Stack } from "./stack"
type Events = { change: string }
type KeyNumber = "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9"
type KeyOpBinary = "+" | "-" | "*" | "/"
type KeyOpUnary = "%" | "+/-"
export type Key = KeyNumber | KeyOpBinary | KeyOpUnary | "." | "AC" | "="

export const isNumber = (k: Key): k is KeyNumber => !isNaN(Number(k))
export const isOpBinary = (k: Key): k is KeyOpBinary =>
  ["+", "-", "*", "/"].includes(k)
export const isOpUnary = (k: Key): k is KeyOpUnary => ["%", "+/-"].includes(k)

export class Calculator extends Eventer<Events> {
  protected stack: Stack = ["0"]
  press(k: Key) {
    const { stack } = this
    if (isNumber(k)) {
      if (stack.length === 1) {
        this.setStack([stack[0] === "0" ? k : stack[0] + k])
      } else if (stack.length === 2) {
        this.setStack([stack[0], stack[1], k])
      } else if (stack.length === 3) {
        this.setStack([stack[0], stack[1], stack[2] + k])
      }
    } else if (isOpBinary(k)) {
      if (stack.length === 1) {
        this.setStack([stack[0], k])
      } else if (stack.length === 2) {
        this.setStack([stack[0], k])
      } else if (stack.length === 3) {
        const [str, num] = reduce(stack)
        this.setStack([str, k])
      }
    } else if (isOpUnary(k)) {
      const operate = (num: string) => {
        if (k === "%") {
          return parseFloat((parseFloat(num) / 100).toFixed(8)).toString()
          // this.setStack([
          //   parseFloat((parseFloat(stack[0]) / 100).toFixed(8)).toString(),
          // ])
        } else if (k === "+/-") {
          if (k.startsWith("-")) {
            return num.slice(0)
            // this.setStack([stack[0].slice(0)])
          } else {
            return "-" + num
            // this.setStack(["-" + stack[0]])
          }
        } else {
          throw k
        }
      }
      if (stack.length === 1) {
        this.setStack([operate(stack[0])])
      } else if (stack.length === 2) {
        this.setStack([operate(stack[0]), stack[1]])
      } else if (stack.length === 3) {
        this.setStack([stack[0], stack[1], operate(stack[2])])
      }
    } else {
      switch (k) {
        case ".":
          const op = (k: string) => (k.includes(".") ? k : k + ".")
          if (stack.length === 1) {
            this.setStack([op(stack[0])])
          } else if (stack.length === 2) {
            this.setStack([stack[0], stack[1], "0."])
          } else if (stack.length === 3) {
            this.setStack([stack[0], stack[1], op(stack[2])])
          }
          break
        case "AC":
          this.setStack(["0"])
          break
        case "=":
          if (stack.length === 3) {
            const [str, num] = reduce(stack)
            this.setStack([str])
          }
          break
        default:
          break
      }
    }
  }
  setStack(stack: Stack) {
    this.stack = stack
    if (stack.length === 1) {
      this.emit("change", this.stack[0])
    } else if (stack.length === 2) {
      this.emit("change", this.stack[0])
    } else if (stack.length === 3) {
      this.emit("change", this.stack[2])
    } else {
      throw stack
    }
  }
}
