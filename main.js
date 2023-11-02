
const addButton = document.querySelector('.add-button');
const modal = document.querySelector('.modal');

addButton.addEventListener('click', () => {
  modal.showModal();
});

modal.addEventListener("click", (e) => {
  const modalDimensions = modal.getBoundingClientRect()
  if (
    e.clientX < modalDimensions.left ||
    e.clientX > modalDimensions.right ||
    e.clientY < modalDimensions.top ||
    e.clientY > modalDimensions.bottom
  ) {
    modal.close()
  }
})