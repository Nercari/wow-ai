# Bridge modules

Files ending in `.js` are loaded in filename order. The filename without `.js` is the module name; add it to `forever.disabled` to skip it. Export an object with optional `init(ctx)`, `intercept(job, ctx)`, `augment(job, runInfo, ctx)`, `onRun(info, ctx)`, `onFinish(job, status, text, ctx)`, and `stop()` functions. Hooks are isolated: thrown errors are logged. The bridge context is documented in `docs/FOREVER.md`.
