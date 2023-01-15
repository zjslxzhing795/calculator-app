export class Eventer<Events extends Record<string, any>> {
  protected fns: {
    [k in keyof Events]?: Array<(v: Events[k]) => void>
  } = {}

  on<Key extends keyof Events>(k: Key, fn: (v: Events[Key]) => void) {
    const { fns } = this
    if (fns[k] === undefined) {
      fns[k] = []
    }
    fns[k].push(fn)
    // return () => this.off(k, fn)
  }
  //   off() {}
  emit<Key extends keyof Events>(k: Key, v: Events[Key]) {
    const { fns } = this
    if (fns[k] !== undefined) {
      for (const fn of fns[k]) {
        fn(v)
      }
    }
  }
}
