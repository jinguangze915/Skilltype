Read-only

```js
const {
  skills,
  find,
  normalizeTagData,
  dedupe,
  pickFirst,
} = require('@skilltype/data')
const skillsList = dedupe(skills.map(normalizeTagData))
tagDedupe = {}
;<TagList tagTheme="sunshine">
  {pickFirst(12, skillsList, tagDedupe).map((skill, i) => (
    <Tag key={i}>{skill.name}</Tag>
  ))}
</TagList>
```

Removable

```js
const {
  skills,
  find,
  normalizeTagData,
  dedupe,
  pickFirst,
} = require('@skilltype/data')
const skillsList = dedupe(skills.map(normalizeTagData))
tagDedupe = {}
;<TagList tagTheme="sunshine">
  {pickFirst(12, skillsList, tagDedupe).map((skill, i) => (
    <RemovableTag key={i}>{skill.name}</RemovableTag>
  ))}
</TagList>
```
