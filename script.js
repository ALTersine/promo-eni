const myModal = document.getElementById('detailModal')
const myInput = document.getElementById('modal_1')

myModal.addEventListener('shown.bs.modal', () => {
  myInput.focus()
})