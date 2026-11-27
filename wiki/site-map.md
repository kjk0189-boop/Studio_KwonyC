# 홈페이지 파일 연결

네이티브 codegraph 도구·CLI를 찾지 못해 HTML 자산 참조를 읽는 대체 그래프를 생성했다. JavaScript의 전체 호출 관계나 브라우저 실행 검증은 아니다.

```mermaid
graph TD
  index["site/index.html"]
  index --> asset0["site/about/index.html"]
  index --> asset1["site/app.js"]
  index --> asset2["site/assets/fonts/Poppins-Regular.ttf"]
  index --> asset3["site/assets/fonts/Pretendard-Regular.subset.woff2"]
  index --> asset4["site/assets/haru-sudoku-current.png"]
  index --> asset5["site/assets/studio-kwonyc-navy.svg"]
  index --> asset6["site/assets/studio-kwonyc-white.svg"]
  index --> asset7["site/blog.css"]
  index --> asset8["site/blog/index.html"]
  index --> asset9["site/design.css"]
  index --> asset10["site/favicon.svg"]
  index --> asset11["site/fonts.css"]
  index --> asset12["site/index.html"]
  index --> asset13["site/notes/index.html"]
  index --> asset14["site/styles.css"]
  index --> asset15["site/work/index.html"]
```

콘텐츠와 링크는 site/index.html, 반응형은 site/styles.css, 모바일 메뉴와 Blog 카테고리 동작은 site/app.js에서 수정한다.
