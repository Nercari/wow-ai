'use strict';
module.exports = {
  intercept(job) {
    if (job.cmd) job.text = `[wowai cmd=${job.cmd}]\n${job.text || ''}`;
    return false;
  },
};
