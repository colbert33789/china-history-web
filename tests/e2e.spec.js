/**
 * E2E 测试剧本（Playwright）
 * 运行：npm run test:e2e
 */
const { test, expect } = require('@playwright/test');
const { DYNASTIES, FIGURES } = require('../data.js');

const TOTAL_EVENTS = DYNASTIES.reduce((s, d) => s + d.events.length, 0);
const TOTAL_PEOPLE = DYNASTIES.reduce((s, d) => s + d.people.length, 0) + FIGURES.length;

test.beforeEach(async ({ page }) => {
  page.consoleErrors = [];
  page.on('console', m => m.type() === 'error' && page.consoleErrors.push(m.text()));
  page.on('pageerror', e => page.consoleErrors.push(e.message));
  await page.goto('/', { waitUntil: 'load' });
});

test('页面加载无 JS 错误，核心板块齐全', async ({ page }) => {
  await expect(page).toHaveTitle(/华夏五千年/);
  await expect(page.locator('#hero')).toBeVisible();
  await expect(page.locator('#timeline')).toBeVisible();
  await expect(page.locator('#figures')).toBeVisible();
  expect(page.consoleErrors).toEqual([]);
});

test('首屏统计数字与真实数据一致', async ({ page }) => {
  await page.waitForTimeout(2200); // 等待数字滚动完成
  await expect(page.locator('#statDynasty')).toHaveText(String(DYNASTIES.length));
  await expect(page.locator('#statEvent')).toHaveText(String(TOTAL_EVENTS));
  await expect(page.locator('#statPeople')).toHaveText(String(TOTAL_PEOPLE));
});

test('时间轴渲染全部朝代，点击可跳转', async ({ page }) => {
  const nodes = page.locator('.t-node');
  await expect(nodes).toHaveCount(DYNASTIES.length);

  await nodes.nth(9).click(); // 唐
  await page.waitForTimeout(1500);
  const box = await page.locator('#dynasty-9').boundingBox();
  const viewport = page.viewportSize();
  expect(box.y).toBeLessThan(viewport.height);
  expect(box.y + box.height).toBeGreaterThan(0);
});

test('时间轴箭头：起点隐藏左箭头，终点隐藏右箭头', async ({ page }) => {
  const wrap = page.locator('#timelineWrap');
  await expect(page.locator('#tPrev')).toHaveClass(/hidden/);

  await page.locator('#tNext').click();
  await page.waitForTimeout(800);
  const scrolled = await wrap.evaluate(el => el.scrollLeft);
  expect(scrolled).toBeGreaterThan(100);
  await expect(page.locator('#tPrev')).not.toHaveClass(/hidden/);

  await wrap.evaluate(el => { el.scrollLeft = el.scrollWidth; });
  await page.waitForTimeout(600);
  await expect(page.locator('#tNext')).toHaveClass(/hidden/);
});

test('朝代卡片内容与多字朝代表述正确', async ({ page }) => {
  await expect(page.locator('.dynasty')).toHaveCount(DYNASTIES.length);
  await expect(page.locator('.event')).toHaveCount(TOTAL_EVENTS);
  // 多字朝代不得出现「三国朝」这类错误表述
  const heads = await page.locator('.dynasty-head h3').allTextContents();
  expect(heads).toContain('三国时期');
  expect(heads).toContain('五代十国时期');
  expect(heads).toContain('唐朝');
  expect(heads.some(h => h === '三国朝' || h === '南北朝朝')).toBe(false);
});

test('人物卡片渲染完整', async ({ page }) => {
  await expect(page.locator('.figure-card')).toHaveCount(FIGURES.length);
  const first = page.locator('.figure-card').first();
  await expect(first.locator('.f-name')).not.toBeEmpty();
  await expect(first.locator('.f-desc')).not.toBeEmpty();
});

test('键盘可访问性：Tab 聚焦 + Enter 跳转', async ({ page }) => {
  const node = page.locator('.t-node').nth(3); // 秦
  await node.focus();
  await expect(node).toBeFocused();
  await page.keyboard.press('Enter');
  await page.waitForTimeout(1500);
  const box = await page.locator('#dynasty-3').boundingBox();
  expect(box.y).toBeLessThan(page.viewportSize().height);
});

test('移动端（390px）：无横向溢出，布局正常', async ({ browser }) => {
  const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });
  const page = await ctx.newPage();
  const errs = [];
  page.on('pageerror', e => errs.push(e.message));
  await page.goto('/', { waitUntil: 'load' });
  await page.waitForTimeout(1200);

  const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
  expect(scrollWidth).toBeLessThanOrEqual(391);

  await expect(page.locator('.dynasty').first()).toBeVisible();
  await expect(page.locator('.figure-card').first()).toBeVisible();
  expect(errs).toEqual([]);
  await ctx.close();
});
