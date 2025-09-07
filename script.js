const drop = document.getElementById('drop-zone');
const input = document.getElementById('folder-input');
const fileList = document.getElementById('file-list');
const preview = document.getElementById('preview');

// drag & drop highlight
['dragenter','dragover'].forEach(e =>
  drop.addEventListener(e, ev => { ev.preventDefault(); drop.classList.add('dragover'); })
);
['dragleave','drop'].forEach(e =>
  drop.addEventListener(e, ev => { ev.preventDefault(); drop.classList.remove('dragover'); })
);
drop.addEventListener('drop', ev => input.files = ev.dataTransfer.files);

// when folder chosen
input.addEventListener('change', () => {
  fileList.innerHTML = '';
  Array.from(input.files).forEach(f => {
    const li = document.createElement('div');
    li.textContent = f.webkitRelativePath;
    li.dataset.path = f.webkitRelativePath;
    fileList.appendChild(li);
  });
});

fileList.addEventListener('click', async e => {
  if (!e.target.dataset.path) return;
  const file = Array.from(input.files)
    .find(f => f.webkitRelativePath === e.target.dataset.path);
  const text = await file.text();
  preview.innerText = `${file.name}:\n${text}`;
});

// automatically show all in one go
document.getElementById('preview-all')?.addEventListener('click', async () => {
  let out = '';
  for (let f of input.files) {
    out += `${f.name}:\n${await f.text()}\n\n`;
  }
  preview.innerText = out.trim();
});
