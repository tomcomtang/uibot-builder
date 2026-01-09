const fs = require('fs');
const filePath = './public/index.html';

console.log('开始处理文件:', filePath);

// 读取文件
let html = fs.readFileSync(filePath, 'utf-8');
console.log('文件大小:', html.length, '字符');

// 查找 <div id="__content"> 的位置
const contentDivStart = html.indexOf('<div id="__content">');
if (contentDivStart === -1) {
  console.log('❌ 未找到 <div id="__content">');
  process.exit(0);
}

console.log('✓ 找到 <div id="__content"> 位置:', contentDivStart);

// 从开始标签后面查找，计算 div 的嵌套深度
let depth = 0;
let i = contentDivStart + 20; // '<div id="__content">'.length = 20

while (i < html.length) {
  if (html.substring(i, i + 4) === '<div') {
    depth++;
    i += 4;
  } else if (html.substring(i, i + 6) === '</div>') {
    if (depth === 0) {
      // 找到对应的结束标签
      console.log('✓ 找到对应的结束标签位置:', i);
      
      // 提取内部内容
      const innerContent = html.substring(contentDivStart + 20, i);
      
      // 重新组装 HTML
      const newHtml = html.substring(0, contentDivStart) + innerContent + html.substring(i + 6);
      
      // 写回文件
      fs.writeFileSync(filePath, newHtml, 'utf-8');
      console.log('✓ 成功删除 <div id="__content"> 包裹层');
      console.log('原始文件:', html.length, '字符');
      console.log('新文件:', newHtml.length, '字符');
      console.log('减少:', html.length - newHtml.length, '字符');
      process.exit(0);
    }
    depth--;
    i += 6;
  } else {
    i++;
  }
}

console.log('❌ 未找到对应的结束标签');
