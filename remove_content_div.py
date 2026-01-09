#!/usr/bin/env python3
import sys

file_path = './public/index.html'

print(f'开始处理文件: {file_path}')

# 读取文件
with open(file_path, 'r', encoding='utf-8') as f:
    html = f.read()

print(f'文件大小: {len(html)} 字符')

# 查找 <div id="__content"> 的位置
search_str = '<div id="__content">'
content_div_start = html.find(search_str)

if content_div_start == -1:
    print('❌ 未找到 <div id="__content">')
    sys.exit(0)

print(f'✓ 找到 <div id="__content"> 位置: {content_div_start}')

# 从开始标签后面查找，计算 div 的嵌套深度
depth = 0
i = content_div_start + len(search_str)  # 20

while i < len(html):
    if html[i:i+4] == '<div':
        depth += 1
        i += 4
    elif html[i:i+6] == '</div>':
        if depth == 0:
            # 找到对应的结束标签
            print(f'✓ 找到对应的结束标签位置: {i}')
            
            # 提取内部内容
            inner_content = html[content_div_start + len(search_str):i]
            
            # 重新组装 HTML
            new_html = html[:content_div_start] + inner_content + html[i + 6:]
            
            # 写回文件
            with open(file_path, 'w', encoding='utf-8') as f:
                f.write(new_html)
            
            print('✓ 成功删除 <div id="__content"> 包裹层')
            print(f'原始文件: {len(html)} 字符')
            print(f'新文件: {len(new_html)} 字符')
            print(f'减少: {len(html) - len(new_html)} 字符')
            sys.exit(0)
        depth -= 1
        i += 6
    else:
        i += 1

print('❌ 未找到对应的结束标签')
