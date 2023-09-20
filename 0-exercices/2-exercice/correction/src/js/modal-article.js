class ModalArticle extends HTMLElement {
  constructor (content = null) {
    super()
    this.innerHTML = content
    console.info('constructor modal')
  }

  connectedCallback () {
    console.info('modal connected')
    this.close()
  }

  close () {
    console.info('modal event close ready')
    const btns = document.querySelectorAll('.close, .btn-close')
    for (let i = 0; i < btns.length; i++) {
      btns[i].addEventListener('click', () => {
        document.querySelector('.modal').style.display = 'none'
      })
    }
  }
}
customElements.define('modal-article', ModalArticle)
export default ModalArticle
