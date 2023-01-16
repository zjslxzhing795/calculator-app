import expect from "expect"
import { Calculator } from "./calculator"

describe("calculator", () => {
  const calculator = new Calculator()
  let r: string = ""
  let off = () => {}
  // 想一想calculator实现的功能，是不是就是press(item)执行后，setState(item)被执行？以下(v) => (r = v)就能说得通了
  beforeAll(() => (off = calculator.on("change", (v) => (r = v))))
  afterAll(() => {
    off()
  })
  beforeEach(() => {
    calculator.press("AC")
  })
  describe("plus", () => {
    it("plus should be correct", () => {
      calculator.press("1")
      expect(r).toBe("1")
      calculator.press("+")
      expect(r).toBe("1")
      calculator.press("2")
      expect(r).toBe("2")
      calculator.press("=")
      expect(r).toBe("3")
    })
  })
  describe("plusDecimer", () => {
    it("plus should be correct", () => {
      calculator.press("1")
      expect(r).toBe("1")
      calculator.press(".")
      expect(r).toBe("1.")
      calculator.press("1")
      expect(r).toBe("1.1")
      calculator.press("+")
      expect(r).toBe("1.1")
      calculator.press("2")
      expect(r).toBe("2")
      calculator.press("=")
      expect(r).toBe("3.1")
    })
  })
  describe("mimus", () => {
    it("plus should be correct", () => {
      calculator.press("1")
      expect(r).toBe("1")
      calculator.press("-")
      expect(r).toBe("1")
      calculator.press("2")
      expect(r).toBe("2")
      calculator.press("=")
      expect(r).toBe("-1")
    })
  })
  describe("multi", () => {
    it("plus should be correct", () => {
      calculator.press("9")
      expect(r).toBe("9")
      calculator.press("*")
      expect(r).toBe("9")
      calculator.press("2")
      expect(r).toBe("2")
      calculator.press("=")
      expect(r).toBe("18")
    })
  })
  describe("div", () => {
    it("plus should be correct", () => {
      calculator.press("8")
      expect(r).toBe("8")
      calculator.press("/")
      expect(r).toBe("8")
      calculator.press("3")
      expect(r).toBe("3")
      calculator.press("=")
      expect(r).toBe("2.66666667")
    })
  })
  describe("divError", () => {
    it("plus should be correct", () => {
      calculator.press("8")
      expect(r).toBe("8")
      calculator.press("/")
      expect(r).toBe("8")
      calculator.press("0")
      expect(r).toBe("0")
      calculator.press("=")
      expect(r).toBe("ERROR")
    })
  })
})
