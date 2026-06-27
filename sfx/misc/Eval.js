class Eval extends SFX {
  constructor(context = {
    Code: "console.log('Eval SFX');"
  }) {
    super(context)
  }
  async Play() {
    try {
      new Function(this.context.Code).call(this)
    } catch (error) {
      console.error("moss-lancer | Eval SFX failed", error)
    }
  }
}
Eval.register()
