const themeSwitcher = document.querySelector('#themeSwitcher'),
	icoThemeSwitcher = themeSwitcher.querySelector('img'),
	spanThemeSwitcher = themeSwitcher.querySelector('span'),
	textThemeSwitcher = themeSwitcher.querySelector('.aside__item-text'),
	root = document.documentElement;

themeSwitcher.addEventListener('click', (event) => {
	root.classList.toggle('light');
	root.classList.toggle('dark');

	if (root.classList.contains('dark')) {
		icoThemeSwitcher.src = "icons/aside/moon.svg";
		spanThemeSwitcher.innerHTML = 'Dark Mode';
		textThemeSwitcher.innerHTML = 'Dark Mode';
	} else {
		icoThemeSwitcher.src = "icons/aside/sun.svg";
		spanThemeSwitcher.innerHTML = 'Light Mode';
		textThemeSwitcher.innerHTML = 'Light Mode';
	}
})