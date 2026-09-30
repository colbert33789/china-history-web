# 华夏五千年 · China History Web

一个介绍中国历朝历代重大事件与历史人物的炫酷单页网站。

## 特性

- 金色粒子连线背景，随鼠标互动
- 首屏打字机文案 + 数字滚动统计
- 可横向滚动的朝代长河时间轴，点击直达对应朝代
- 15 个朝代详情：大事记、风云人物标签
- 历史人物卡片 3D 倾斜悬停效果
- 滚动显现动画、吸顶导航、响应式布局

## 本地预览

```bash
cd china-history-web
python3 -m http.server 8000
# 浏览器打开 http://localhost:8000
```

无任何依赖与构建步骤，纯 HTML/CSS/JS。

## 质量保障

### 自动化测试

```bash
npm install                 # 安装 @playwright/test
npx playwright install chromium
npm run test:data           # 数据完整性测试（Node 内置 runner，零依赖）
npm run test:e2e            # E2E 测试（自动启动本地服务器）
npm test                    # 全部测试
```

- `tests/data.test.js`：6 项数据测试 —— 朝代数量与顺序、字段完整性、事件/人物格式、年份区间逻辑自洽、人物去重
- `tests/e2e.spec.js`：8 项 E2E 剧本 —— 页面无 JS 错误、统计数字与数据一致、时间轴点击跳转、箭头边界行为、多字朝代表述、人物卡片渲染、键盘可访问性、移动端 390px 无横向溢出

### CI 持续集成

`.github/workflows/ci.yml`：每次 push / PR 到 `main` 自动运行数据测试与 E2E 测试，失败时上传截图工件。
