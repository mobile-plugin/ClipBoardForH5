import {
  FACKSETSTRONGE,
  FACKGETSTRONGE
} from '@api/fackStronge'

import {
  CLIPBOARDNAME,
  SUCCESSCODE,
  JSONERROR,
  COMMONERROR
} from '@const'

import {
  GENERATIONMSG
} from '@api/utils'

/**
 * clipboard
 */
class Clipboard {
  constructor() {
    /**
     * 1. 全局监听copy方法
     * 2. 将获取到copy的字符串存储到本地存储中，确保数据不会丢失
     */
    document.addEventListener('copy', () => {
      const value = window.getSelection()?.toString()
      FACKSETSTRONGE({
        key: CLIPBOARDNAME,
        value
      }).catch(error => {})
    })
  }

  /**
   * 设置系统clipboard
   * @params options<Object> { data<String> }
   */
  _set({ data = '' }) {
    return new Promise((resolve, reject) => {
      /* 若无设置内容抛出异常 */
      if (!data) {
        reject(GENERATIONMSG({ code: COMMONERROR, data: 'the action of setclipboard need a value' }))
      }

      /* 首先设置本地存储防止数据丢失 */
      FACKSETSTRONGE({
        key: CLIPBOARDNAME,
        value: data
      }).then(() => {
        if (document.execCommand('copy')) {
          this.fackInput(data)
          if (this.FACKINPUT.setSelectionRange) {
            this.FACKINPUT.setSelectionRange(0, this.FACKINPUT.value.length)
            document.execCommand('copy')
            this.removeFackInput()
            resolve(GENERATIONMSG({ code: SUCCESSCODE, data }))
          }
        } else {
          reject(GENERATIONMSG({ code: COMMONERROR, data: 'the systerm do not have a command copy' }))
        }
      }).catch(error => {
        reject(GENERATIONMSG({ code: COMMONERROR, data: error }))
      })
    })
  }

  /**
   * 获取系统clipboard
   */
  _get() {
    return new Promise((resolve, reject) => {
      FACKGETSTRONGE({
        key: CLIPBOARDNAME
      }).then(({ data = '' }) => {
        resolve(GENERATIONMSG({ code: SUCCESSCODE, data }))
      }).catch(error => {
        reject(GENERATIONMSG({ code: COMMONERROR, data: error }))
      })
    })
  }

  /**
   * createInput for fack selection
   * @params value<String>
   */
  fackInput(value = '') {
    const FACKINPUT = document.createElement('input')
    FACKINPUT.setAttribute('readonly', 'readonly')
    FACKINPUT.setAttribute('value', value)
    FACKINPUT.style.cssText = `
      position: fixed;
      top: -200000px;
      left: -200000px;
    `
    document.body.appendChild(FACKINPUT)
    FACKINPUT.focus()
    this.FACKINPUT = FACKINPUT
  }

  /**
   * removeFackInput
   * @params fackInput<HTMLELEMENT>
   */
  removeFackInput(fackInput = null) {
    if (fackInput) {
      document.body.removeChild(fackInput)
    }
  }
}

const clipboard = new Clipboard()
window._clipboard = clipboard
module.exports = clipboard