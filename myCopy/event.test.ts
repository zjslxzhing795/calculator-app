import expect from "expect"
import { Eventer } from "./eventer"

describe("eventer", () => {
  const eventer = new Eventer()

  it("should work", () => {
    let k1v = 0
    let k2v = false

    const offk1 = eventer.on("k1", (v) => (k1v = v))
    const offk2 = eventer.on("k2", (v) => (k2v = v))

    expect(k1v).toBe(0)
    expect(k2v).toBe(false)

    eventer.emit("k1", 22)
    expect(k1v).toBe(22)
    expect(k2v).toBe(false)

    eventer.emit("k2", true)
    expect(k1v).toBe(22)
    expect(k2v).toBe(true)

    offk1()
    eventer.emit("k1", 3)
    expect(k1v).toBe(22)
    expect(k2v).toBe(true)

    offk2()
    eventer.emit("k2", false)
    expect(k1v).toBe(22)
    expect(k2v).toBe(true)
  })
})
