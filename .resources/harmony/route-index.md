# Route Index

> 页面类型路由：prompt / Figma 意图 -> page_type -> layout path

## Page Types

| page_type | layout | hit_rules | exclusion_rules |
|-----------|--------|-----------|-----------------|
| mobile-settings | layout/mobile-settings.md | "喝水设置" / "water settings" / "设置页" | "健康" / "服药" / "medication" |
| health-dashboard | layout/health-dashboard.md | "健康" / "三叶草" / "health" / "clover" / "任务进度" | "设置" / "服药" |
| mobile-sheet | layout/mobile-sheet.md | "服药" / "medication" / "提醒" / "半模态" / "sheet" | |

## Fallback

> 未命中上述规则时，默认使用 `mobile-settings`

## Notes

- page_type 使用 kebab-case
- layout 路径相对于 `.resources/harmony/`
