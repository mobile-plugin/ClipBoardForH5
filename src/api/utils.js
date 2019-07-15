/**
 * utils
 * 工具
 * @author: innocces
 */

import {
  SUCCESSCODE
} from '@const'

/**
 * 统一结果格式
 * @params params<Object> { code<Number>, data<Any> }
 */
export const GENERATIONMSG = ({ code= SUCCESSCODE, data = '' }) => {
  return {
    code,
    data
  }
}