// Small HTML asset graph. This is a fallback, not the unavailable codegraph CLI.
import { readFile, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
const root=resolve(dirname(fileURLToPath(import.meta.url)),'..');
const html=await readFile(resolve(root,'site/index.html'),'utf8');
const local=[...new Set([...html.matchAll(/(?:src|href)="(\.\/[^"#]+)"/g)].map(match=>`site/${match[1].slice(2)}`))].sort();
const lines=['# 홈페이지 파일 연결','', '네이티브 codegraph 도구·CLI를 찾지 못해 HTML 자산 참조를 읽는 대체 그래프를 생성했다. JavaScript의 전체 호출 관계나 브라우저 실행 검증은 아니다.','','```mermaid','graph TD','  index["site/index.html"]'];
local.forEach((file,i)=>lines.push(`  index --> asset${i}["${file}"]`));
lines.push('```','','콘텐츠와 링크는 site/index.html, 반응형은 site/styles.css, 메뉴·현재 섹션 표시는 site/app.js에서 수정한다.','');
await writeFile(resolve(root,'wiki/site-map.md'),lines.join('\n'),'utf8');
console.log(`Wrote wiki/site-map.md with ${local.length} local references.`);
