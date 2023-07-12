let page = 1;

const toBase64 = file => new Promise((resolve, reject) => {
	const reader = new FileReader();
	reader.readAsDataURL(file);
	reader.onload = () => resolve(reader.result);
	reader.onerror = reject;
});

function nextPage() {
	document.querySelector('.page' + page).style.display = 'none';
	document.querySelector('.page' + (page + 1)).style.display = 'block';
	page += 1;
}

function reboot() {
	fetch('/gen?password=' + document.querySelector('input[type="password"]').value).then(res => res.text())
		.then(async (data) => {
			config.setup.set(true);
			config.password.set(data);
			var file = document.querySelector('input[type="file"]').files[0];
			config.settings.set('profile', {
				url: await toBase64(file),
				username: document.querySelector('input[type="username"]').value
			});
			parent.window.location.reload();
		});
}

window.onload = () => {
	document.querySelectorAll('form')[0].onsubmit = (e) => {
		e.preventDefault();
		nextPage();
	};

	document.querySelectorAll('form')[1].onsubmit = (e) => {
		e.preventDefault();
		nextPage();
	};
};