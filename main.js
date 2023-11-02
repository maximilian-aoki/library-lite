
const addButton = document.querySelector('.add-button');
const addModal = document.querySelector('.add-modal');
const closeModal = document.querySelector('.close-modal');

addButton.addEventListener('click', () => {
  addModal.showModal();
});

closeModal.addEventListener('click', () => {
  addModal.close();
})

addModal.addEventListener("click", (e) => {
  const modalDimensions = addModal.getBoundingClientRect()
  if (
    e.clientX < modalDimensions.left ||
    e.clientX > modalDimensions.right ||
    e.clientY < modalDimensions.top ||
    e.clientY > modalDimensions.bottom
  ) {
    addModal.close();
  }
})