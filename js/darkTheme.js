const themeSwitcher = document.querySelector('#themeSwitcher'),
	icoThemeSwitcher = themeSwitcher.querySelector('img'),
	spanThemeSwitcher = themeSwitcher.querySelector('span'),
	textThemeSwitcher = themeSwitcher.querySelector('.aside__item-text');

themeSwitcher.addEventListener('click', (event) => {
	document.body.classList.toggle('darkMode');

	if (document.body.classList.contains('darkMode')) {
		icoThemeSwitcher.src = "icons/aside/moon.svg";
		spanThemeSwitcher.innerHTML = 'Dark Mode';
		textThemeSwitcher.innerHTML = 'Dark Mode';
	} else {
		icoThemeSwitcher.src = "icons/aside/sun.svg";
		spanThemeSwitcher.innerHTML = 'Light Mode';
		textThemeSwitcher.innerHTML = 'Light Mode';
	}
})