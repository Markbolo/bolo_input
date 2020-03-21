var text = document.querySelector('#id-input-text')
// 显示拼音行
var letter = document.querySelector('#id-span-letter')
// 显示文字行
var font = document.querySelector('#id-span-font')
// 一次只显示 5 个文字
var keyString = '12345'
// 文本框文字表
var inputString = ''
// 内存拼音列表
var letterStr = ''

numberList = '0123456789'
letterList = 'abcdefghijklmnopqrstuvwxyz'
keyList = numberList + letterList

var clearFontArrayStyle = function(array) {
    var fontStr = ''
    for (var i = 0; i < array.length; i++) {
        fontStr += array[i] + ' '
    }
    return fontStr
}

var LastElement = function(str) {
    var last = str.charAt(str.length - 1)
    return last
}

var getLetter = function(k) {
    // 如果按了空格键
    if (k == ' ') {
        letterStr += ' '
    }
    if(letterStr.length == 0) {
        if(k == 'Backspace' && inputString != '') {
            inputString = inputString.substring(
                0, inputString.length - 1)
        }
    }
    if (k == 'Backspace' && letterStr != '') {
        letterStr = letterStr.substring(0, letterStr.length - 1)
    }
    for (var i = 0; i < keyList.length; i++) {
        if(k == keyList[i]) {
            letterStr += k
        }
    }
    return letterStr
}

var getKeyDown = function() {
    window.addEventListener('keyup', function(event){
        // 按下了哪个键
        var k = event.key
        // console.log('k:', k)
        console.log('inputString:', inputString)
        // 判断是否按了清除键
        // getKeyClear(k)

        // 获取拼音
        // var letterText = e.target.value
        var letterText = getLetter(k)
        letter.innerText = letterText

        // 根据拼音显示文字
        var fontKey = letterText
        var v = ''
        if(!letterMap.hasOwnProperty(fontKey)) {
            v = ''
            font.innerText = v
        } else {
            v = letterMap[fontKey]
            // 清洗格式 '1.啊', '2.阿', '3.锕', '4.嗄', '5.呵'
            // 1.啊 2.阿 3.锕 4.嗄 5.呵
            var fontStr = clearFontArrayStyle(v)
            font.innerText = fontStr
        }

        lastFont = LastElement(fontKey)
        // 按下数字选择文字
        for (var i = 0; i < keyString.length; i++) {
            if(lastFont == keyString[i]) {
                fontKey = fontKey.substring(0, fontKey.length - 1)
                selectFont(fontKey, k)
            }
        }
    })
}

var selectFont = function(key, num) {
    for (var i = 0; i < keyString.length; i++) {
        if(num == keyString[i]) {
            f = letterMap[key][num - 1]
            // 输入框显示最后一个元素 1.字
            display = LastElement(f)
            inputString += display
            text.value = inputString
            // 选择文字后清空内存拼音行
            letterStr = ''
            // 选择文字后清空页面拼音行
            letter.innerText = ''
        }
    }
}

var _main = function() {
    getKeyDown()
}

_main()
