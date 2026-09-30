/**
 * 数据完整性测试（Node 内置 test runner，零依赖）
 * 运行：npm run test:data
 */
const { test } = require('node:test');
const assert = require('node:assert/strict');
const { DYNASTIES, FIGURES } = require('../data.js');

test('朝代数量与顺序正确', () => {
  assert.equal(DYNASTIES.length, 15);
  assert.deepEqual(
    DYNASTIES.map(d => d.name),
    ['夏', '商', '周', '秦', '汉', '三国', '晋', '南北朝', '隋', '唐', '五代十国', '宋', '元', '明', '清']
  );
});

test('每个朝代字段完整', () => {
  for (const d of DYNASTIES) {
    assert.ok(d.name, 'name 必填');
    assert.ok(d.years.includes('–'), `${d.name} years 需包含区间符`);
    assert.ok(d.tag && d.motto, `${d.name} tag/motto 必填`);
    assert.ok(Array.isArray(d.events) && d.events.length >= 2, `${d.name} 至少 2 条事件`);
    assert.ok(Array.isArray(d.people) && d.people.length >= 2, `${d.name} 至少 2 位人物`);
  }
});

test('事件字段完整且无空描述', () => {
  for (const d of DYNASTIES) {
    for (const e of d.events) {
      assert.ok(e.title, `${d.name} 事件缺 title`);
      assert.ok(e.year, `${d.name}「${e.title}」缺 year`);
      assert.ok(e.desc && e.desc.length >= 10, `${d.name}「${e.title}」描述过短`);
    }
  }
});

test('人物标签格式正确（姓名 + 称号）', () => {
  for (const d of DYNASTIES) {
    for (const p of d.people) {
      assert.ok(Array.isArray(p) && p.length === 2, `${d.name} 人物格式应为 [姓名, 称号]`);
      assert.ok(p[0] && p[1], `${d.name} 人物姓名/称号不能为空`);
    }
  }
});

test('朝代起止年份逻辑自洽', () => {
  const parse = s => s.match(/(前)?(\d+)/g).map(t =>
    t.startsWith('前') ? -parseInt(t.slice(1)) : parseInt(t));
  let prevEnd = -Infinity;
  for (const d of DYNASTIES) {
    const [start, end] = parse(d.years);
    assert.ok(start < end, `${d.name} 起始年份应早于结束年份`);
    assert.ok(end >= prevEnd, `${d.name} 时间轴顺序异常`);
    prevEnd = end;
  }
});

test('精选人物字段完整且不重复', () => {
  assert.ok(FIGURES.length >= 10);
  const names = FIGURES.map(f => f.name);
  assert.equal(new Set(names).size, names.length, '人物不能重复');
  for (const f of FIGURES) {
    assert.ok(f.name && f.dynasty && f.desc.length >= 10, `${f.name} 字段不完整`);
  }
});
