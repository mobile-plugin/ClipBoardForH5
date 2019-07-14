/**
 * extend Promise
 * 简单的扩展一下Promise
 * @author: innocces
 */

/**
 * try
 * 用于检测当前Promise是否在执行过程中抛错，并以Promise的形式返回
 * @params fnc<Fuction> Promise?
 */
Promise.try = (fnc) => {
  return new Promise((resolve, reject) => {
    try{ 
      fnc()
    }
    catch(error) {
      reject(error)
    }
    resolve()
  })
}