// Задание 1.
// Сверстайте кнопку, которая будет содержать в себе icon_01 (как в примере в последнем видео). При клике на кнопку иконка должна меняться на icon_02. Повторный клик меняет иконку обратно.

const btn = document.querySelector('.j-btn');
const sparkle = document.querySelector('.sparkle');
const btnIcon = document.querySelector('.btn__icon')

let buttonClicked = false;

btn.addEventListener('mouseenter', function(e) {
  sparkle.style.display = 'block';
});

btn.addEventListener('mousemove', function(e) {
  const offsetX = 10;
  const offsetY = 0;
	
  sparkle.style.left = e.clientX + offsetX + 'px';
  sparkle.style.top = e.clientY + offsetY + 'px';
});

btn.addEventListener('mouseleave', function(e) {
  sparkle.style.display = 'none';
});

btn.addEventListener('click', function() {
		if (buttonClicked) {
			btnIcon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-down-left-circle" viewBox="0 0 16 16">
		<path fill-rule="evenodd" d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8m15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-5.904-2.854a.5.5 0 1 1 .707.708L6.707 9.95h2.768a.5.5 0 1 1 0 1H5.5a.5.5 0 0 1-.5-.5V6.475a.5.5 0 1 1 1 0v2.768z"/>
	</svg>`;
		} else {
			btnIcon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-down-left-circle-fill" viewBox="0 0 16 16">
  <path d="M16 8A8 8 0 1 0 0 8a8 8 0 0 0 16 0m-5.904-2.803a.5.5 0 1 1 .707.707L6.707 10h2.768a.5.5 0 0 1 0 1H5.5a.5.5 0 0 1-.5-.5V6.525a.5.5 0 0 1 1 0v2.768z"/>
</svg>`;
		}
	buttonClicked = !buttonClicked;
});