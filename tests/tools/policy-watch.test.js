"use strict";
const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs/promises");
const os = require("node:os");
const path = require("node:path");
const http = require("node:http");
const { watch } = require("../../tools/policy-watch");
async function server(t, page) {
  const srv = http.createServer((req, res) => {
    if (req.url.endsWith(".json")) {
      res.setHeader("content-type", "application/json");
      res.end(
        JSON.stringify({
          post_stream: { posts: [{ cooked: `<p>${page()}</p>` }] },
        }),
      );
    } else {
      res.setHeader("content-type", "text/html");
      res.end(`<html><body>${page()}</body></html>`);
    }
  });
  await new Promise((r) => srv.listen(0, "127.0.0.1", r));
  t.after(() => srv.close());
  return `http://127.0.0.1:${srv.address().port}/source`;
}
test("baseline, unchanged, changed diff and alert", async (t) => {
  const dir = await fs.mkdtemp(path.join(os.tmpdir(), "policy-"));
  t.after(() => fs.rm(dir, { recursive: true, force: true }));
  let val = "first rule";
  const url = await server(t, () => val);
  const sources = [{ slug: "fixture", url }],
    opts = { snapshotDir: path.join(dir, "snapshot"), sources };
  assert.deepEqual((await watch(opts)).baselined, ["fixture"]);
  assert.equal((await watch(opts)).summary, "unchanged");
  val = "second rule";
  const r = await watch({ ...opts, now: new Date("2026-09-25T12:00:00Z") });
  assert.deepEqual(r.changed, ["fixture"]);
  assert.match(
    await fs.readFile(
      path.join(dir, "changes/2026-09-25-fixture.diff"),
      "utf8",
    ),
    /-first rule[\s\S]*\+second rule/,
  );
  assert.deepEqual(
    JSON.parse(await fs.readFile(path.join(dir, "ALERT.json"), "utf8")).changed,
    ["fixture"],
  );
});
test("alerts after two consecutive fetch failures", async (t) => {
  const dir = await fs.mkdtemp(path.join(os.tmpdir(), "policyfail-"));
  t.after(() => fs.rm(dir, { recursive: true, force: true }));
  const sources = [{ slug: "gone", url: "http://127.0.0.1:1/gone" }],
    opts = { snapshotDir: path.join(dir, "snapshot"), sources };
  await watch(opts);
  await watch(opts);
  const state = JSON.parse(
    await fs.readFile(path.join(dir, "state.json"), "utf8"),
  );
  assert.equal(state.gone.failures, 2);
  assert.deepEqual(
    JSON.parse(await fs.readFile(path.join(dir, "ALERT.json"), "utf8")).changed,
    ["gone"],
  );
});
