import fs from 'fs';
import path from 'path';

/**
 * 加载并处理 Evervault 原始 HTML
 */
export function loadEvervaultHTML() {
  const evervaultHtml = fs.readFileSync(
    path.join(process.cwd(), 'public/index.html'),
    'utf-8'
  );
  
  return evervaultHtml;
}

/**
 * 提取 HTML 中的 head 内容
 */
export function extractHeadContent(html: string): string {
  const headMatch = html.match(/<head[^>]*>([\s\S]*)<\/head>/i);
  return headMatch ? headMatch[1] : '';
}

/**
 * 提取 HTML 中的 body 内容
 */
export function extractBodyContent(html: string): string {
  const bodyMatch = html.match(/<body[^>]*>([\s\S]*)<\/body>/i);
  return bodyMatch ? bodyMatch[1] : '';
}

/**
 * 删除指定 id 的 div 包裹层（保留内部内容）
 */
export function removeContentDiv(html: string, divId: string = '__content'): string {
  const searchStr = `<div id="${divId}">`;
  const contentDivStart = html.indexOf(searchStr);
  
  if (contentDivStart === -1) return html;
  
  // 从开始标签后面查找，计算 div 的嵌套深度
  let depth = 0;
  let i = contentDivStart + searchStr.length;
  
  while (i < html.length) {
    if (html.substring(i, i + 4) === '<div') {
      depth++;
      i += 4;
    } else if (html.substring(i, i + 6) === '</div>') {
      if (depth === 0) {
        // 找到对应的结束标签，提取内部内容
        const innerContent = html.substring(contentDivStart + searchStr.length, i);
        return html.substring(0, contentDivStart) + innerContent + html.substring(i + 6);
      }
      depth--;
      i += 6;
    } else {
      i++;
    }
  }
  
  return html;
}

/**
 * 批量删除匹配的元素
 */
export function removeElements(html: string, patterns: RegExp[]): string {
  let result = html;
  
  patterns.forEach(pattern => {
    result = result.replace(pattern, '');
  });
  
  return result;
}

/**
 * 保留 main 标签下只有 header
 */
export function keepOnlyHeaderInMain(html: string): string {
  const mainStart = html.indexOf('<main');
  const mainEnd = html.indexOf('</main>');
  
  if (mainStart === -1 || mainEnd === -1) return html;
  
  const beforeMain = html.substring(0, mainStart);
  const mainSection = html.substring(mainStart, mainEnd + 7);
  const afterMain = html.substring(mainEnd + 7);
  
  // 在 main section 中找到 </header>
  const headerEnd = mainSection.indexOf('</header>');
  
  if (headerEnd !== -1) {
    // 保留从 <main 到 </header> 的内容，删除 </header> 到 </main> 之间的所有内容
    const keepPart = mainSection.substring(0, headerEnd + 9); // +9 是 '</header>' 的长度
    const newMain = keepPart + '</main>';
    
    return beforeMain + newMain + afterMain;
  }
  
  return html;
}

/**
 * 替换文本内容
 */
export function replaceText(html: string, search: string | RegExp, replacement: string): string {
  return html.replace(search, replacement);
}
