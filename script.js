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