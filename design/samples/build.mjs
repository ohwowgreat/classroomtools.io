import { readFileSync, writeFileSync, mkdirSync, copyFileSync, readdirSync } from 'fs';

const css = readFileSync('/workspace/design-work/shared.css', 'utf8');
const boards = [
  { name: 'Main', dark: false },
  { name: 'OptionB', dark: false },
  { name: 'OptionC', dark: false },
  { name: 'ToolPage', dark: false },
  { name: 'Dark', dark: true },
];

mkdirSync('/workspace/design-work/out', { recursive: true });
mkdirSync('/workspace/design-work/preview', { recursive: true });

for (const b of boards) {
  const body = readFileSync(`/workspace/design-work/bodies/${b.name}.html`, 'utf8');
  const rootOpen = `<div class="ct-root"${b.dark ? ' data-theme="dark"' : ''} style="width: 1440px">`;

  const dc = `<!doctype html>
<html>
<head>
  <meta charset="utf-8">
  <script src="./support.js"><\/script>
</head>
<body>
<x-dc>
<helmet>
  <style>
${css}
  </style>
</helmet>
${rootOpen}
${body}
</div>
</x-dc>
<script data-dc-script data-props='{}'>
class Component extends DCLogic {
  renderVals() { return {}; }
}
<\/script>
</body>
</html>
`;
  writeFileSync(`/workspace/design-work/out/${b.name}.dc.html`, dc);

  const preview = `<!doctype html>
<html>
<head><meta charset="utf-8"><style>html,body{margin:0}
${css}
</style></head>
<body>${rootOpen}
${body}
</div></body>
</html>
`;
  writeFileSync(`/workspace/design-work/preview/${b.name}.html`, preview);
}

for (const f of readdirSync('/workspace/shots/web')) {
  copyFileSync(`/workspace/shots/web/${f}`, `/workspace/design-work/preview/${f}`);
}
console.log('built', boards.map(b => b.name).join(', '));
