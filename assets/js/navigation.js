document.addEventListener('DOMContentLoaded', function () {
	const header = document.querySelector('header.wp-block-template-part');

	watchScroll();
	window.addEventListener('scroll', function () {
		watchScroll();
	});

	function watchScroll() {
		if (window.scrollY) {
			header.classList.add('scrolled');
		} else {
			header.classList.remove('scrolled');
		}
	}
});
