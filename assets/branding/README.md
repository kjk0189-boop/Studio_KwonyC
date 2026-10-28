# Studio KWONYC 로고

2026-10-28 사용자가 1차 로고를 수용했다. **STUDIO 위 / KWONYC 아래**, 굵은 글자와 남색 계열의 구성을 유지한다.

![남색·흰색 비교](studio-kwonyc-variants-preview.png)

## 파일

| 파일 | 용도 |
|---|---|
| [승인 시안 PNG](studio-kwonyc-logo-concept-01.png) | 처음 만든 인쇄 질감과 배경을 그대로 보존 |
| [남색 SVG](studio-kwonyc-navy.svg) / [흰색 SVG](studio-kwonyc-white.svg) | 투명 배경·글자 외곽선으로 만든 웹/편집용 벡터 |
| [남색 PNG](studio-kwonyc-navy.png) / [흰색 PNG](studio-kwonyc-white.png) | 투명 배경, 1428×388 픽셀 |
| [남색 PDF](studio-kwonyc-navy.pdf) / [흰색 PDF](studio-kwonyc-white.pdf) | 벡터 전달용, 흰색은 어두운 배경에서 확인 |
| [남색 EPS](studio-kwonyc-navy.eps) / [흰색 EPS](studio-kwonyc-white.eps) | 범용 PostScript 벡터 전달용 |
| [검증 정보](export-validation.json) | 추출 크기와 원본 외곽 비교 결과 |

벡터 파일은 이미지를 삽입한 것이 아니라 실제 경로로 구성했다. 글자는 아웃라인이므로 폰트 설치가 필요 없고, 글자 내용은 일반 텍스트처럼 수정되지 않는다. 글자 외곽과 색은 편집할 수 있다. 원본의 작은 인쇄 질감은 벡터에서 정리했으며 질감이 필요하면 승인 PNG를 사용한다. 흰색 버전에 남색 사각형은 포함하지 않는다.

## Illustrator에서 AI로 저장

이 환경에서는 Illustrator 실행 파일을 찾지 못해 **네이티브 `.ai` 파일은 생성하지 않았다.** 다른 형식의 확장자만 `.ai`로 바꾸지 않는다.

1. Illustrator → **파일(File) → 열기(Open)** → 남색 또는 흰색 SVG 선택.
2. 흰색은 어두운 배경 위에서 확인한다. 로고 본체의 배경은 투명이다.
3. **파일(File) → 다른 이름으로 저장(Save As)** → **Adobe Illustrator (*.AI)** 선택.
4. 필요하면 **Create PDF Compatible File**을 선택하고 저장.

[Adobe 지원 형식](https://helpx.adobe.com/illustrator/desktop/get-started/learn-the-basics/supported-file-formats-in-illustrator.html) · [AI 저장 방법](https://helpx.adobe.com/illustrator/desktop/save-and-export/export-files-to-different-formats/save-artwork-in-illustrator-ai-format.html)

## 검증

원본을 그대로 보관하고 글자 마스크와 벡터 렌더의 교집합/합집합 비율은 약 99.77%다. 남색·흰색 시트와 PDF 렌더를 확인한다. Illustrator에서의 직접 열기와 EPS 실렌더는 도구가 없어 별도 미검증이다. 홈페이지 적용·모바일 헤더 최소 크기는 구현 시 검증한다.
