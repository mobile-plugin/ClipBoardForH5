# ClipBoardForH5
clipboard api for mobile

## useage
```html
<script src='path/clipboard.min.js'></script>
<script>
  // _clipboard 已经默认挂载到window上了，可以直接使用

  // set
  _clipboard._set({ data: 'your clipboard data' }).then(res => successHandler).catch(error => errorHandler)

  // get
  _clipboard._get().then(res => console.log(res.data)).catch(error => errorHandler)
</script>
```

use for npm/cnpm
```bash
# install
npm/cnpm i clipboardh5 --save 
```
```javascript
import { _clipboard as cpb } from 'clipboardh5'
# 用法同上面
```
