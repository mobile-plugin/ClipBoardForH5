/**
 * FackStronge
 * 封装localStronge
 * @author: innocces
 */

import { 
  FACKSETSTRONGE,
  FACKGETSTRONGE,
  INITSETSTRONGENAME,
  SUCCESSCODE,
  JSONERROR,
  COMMONERROR
} from '@const'

import {
  GENERATIONMSG
} from '@api/utils'

import '@exts/Promise'
 
 /**
  * FackSetstronge
  * 设置本地存储
  * @param option<Object> { key<String>, value<Any> }
  */

exports[FACKSETSTRONGE] = ({ key = INITSETSTRONGENAME , value }) => {
  // 若未填写key，抛出警告且提示初始key
  if (key === INITSETSTRONGENAME) {
    console.warn('warning: you have not get a key of the stronge, the init key of the stronge you set is ' + INITSETSTRONGENAME)
  }
  const setAction = new Promise((resolve, reject) => {
    if (!value) {
      // 若未填写value, 抛出异常
      reject(GENERATIONMSG({ code: COMMONERROR, data: 'you mast set a value of stronge' }))
    } else {
      Promise.try(() => {
        value = JSON.stringify(value)
      }).then( _ => {
        localStorage.setItem(key, value)
      }).catch(error => reject(GENERATIONMSG({ code: JSONERROR, data: error })))
      // try {
      //   localStorage.setItem(key, value)
      // }
      // catch(error) {
      //   reject(error)
      // }
    }
  })
  return setAction
}