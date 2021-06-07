/**
 * @file issue 自动 `assign` 给指定人员
 * @author xuexb <fe.xiaowu@gmail.com>
 */

const { getPkgConfig } = require('../../utils')
const { addAssigneesToIssue } = require('../../github')

const config = getPkgConfig()
const assignMap = config.labelToAuthor || {}

module.exports = {
  name: 'issue/autoAssign',
  register (on) {
    on('issues_labeled', ({ payload, repo }) => {
      if (assignMap[payload.label.name]) {
        addAssigneesToIssue(
          payload,
          assignMap[payload.label.name]
        )
      }
    })
  }
}
