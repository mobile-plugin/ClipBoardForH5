/**
 * FackStronge
 * 封装localStronge
 * @author: innocces
 */

import { 
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

export const FACKSETSTRONGE = ({ key = INITSETSTRONGENAME , value }) => {
  // 若未填写key，抛出警告且提示初始key
  if (key === INITSETSTRONGENAME) {
    console.warn('warning: you have not get a key of the stronge, the init key of the stronge you set is ' + INITSETSTRONGENAME)
  }
  const setAction = new Promise((resolve, reject) => {
    if (!value) {
      // 若未填写value, 抛出异常
      reject(GENERATIONMSG({ code: COMMONERROR, data: 'you mast set a value of stronge' }))
    } else {
      try {
        localStorage.setItem(key, value)
      }
      catch(error) {
        reject(GENERATIONMSG({ code: JSONERROR, data: error }))
      }
      localStorage.setItem(key, value)
      resolve(GENERATIONMSG({ code: SUCCESSCODE, data: value }))
      
    }
  })
  return setAction
}

 /**
  * FackGetstronge
  * 获取本地存储
  * @param option<Object> { key<String> }
  */

export const FACKGETSTRONGE = ({ key = INITSETSTRONGENAME }) => {
  let stronge = ''
  // 若未填写key，抛出警告且提示初始key
  if (key === INITSETSTRONGENAME) {
    console.warn('warning: you have not get a key of the stronge, the init key of the stronge you get is ' + INITSETSTRONGENAME)
  }
  const getAction = new Promise((resolve, reject) => {
    try{
      stronge = localStorage.getItem(key)
      stronge = JSON.parse(stronge)
    }
    catch(error){
      reject(GENERATIONMSG({ code: JSONERROR, data: error }))
    }
    resolve(GENERATIONMSG({ code: SUCCESSCODE, data: stronge }))
  })
  return getAction
}

 /**
  * FackRemovestronge
  * 获取本地存储
  * @param option<Object> { key<String> }
  */

 export const FACKREMOVESTRONGE = ({ key = INITSETSTRONGENAME }) => {
  // 若未填写key，抛出警告且提示初始key
  if (key === INITSETSTRONGENAME) {
    console.warn('warning: you have not get a key of the stronge, the init key of the stronge you remove is ' + INITSETSTRONGENAME)
  }
  const removeAction = new Promise((resolve, reject) => {
    Promise.try(() => {
      localStorage.removeItem(key)
    }).then( _ => {
      resolve(GENERATIONMSG({ code: SUCCESSCODE, data: '' }))
    }).catch(error => reject(GENERATIONMSG({ code: JSONERROR, data: error })))
  })
  return removeAction
}