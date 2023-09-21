import ModalArticle from './modal-article.js'
class CurrentNews extends HTMLElement {
  static ARTICLE_TPL = './../../../../1-exercice/correction/src/html/_partials/article.html'
  static MODAL_TPL = './../../../../1-exercice/correction/src/html/_partials/modal.html'
  /**
   * Constructor
   * @param Object dataFetch
   * @param {Object} feed
   * @param {Array} items
   * @returns void
   */
  constructor (dataFetch = null, feed = {}, items = []) {
    super()
    this.dataFetch = dataFetch
    this.feed = feed
    this.items = items
    this.innerHTML = `
    <h2>Chargement actualité depuis ${this.feed.url}</h2>
    <div class="loader"></div>
    `
  }

  connectedCallback () {
    console.info('connected news Element in DOM')
  }

  /**
   * Return HTML with feed items
   * @returns void
   */
  async render () {
    console.info('render method start with promise all', this.feed)
    const fetchTplArticle = this.dataFetch.html(CurrentNews.ARTICLE_TPL)
    const fetchItems = this.dataFetch.xml(this.feed.url)
    return Promise.all([fetchTplArticle, fetchItems])
      .then((responses) => {
        /**
         * Avec Promise.all on rentre ici uniquement si tous les promesses reussissent
         * s'il y en a au moins un qui échoue, on va directement dans le catch
         * */
        const artTpl = responses[0]
        const feed = responses[1]
        const items = feed.items
        this.innerHTML = `<h2>${feed.title}</h2>`
        this.feed.title = feed.title
        for (let i = 0; i < items.length; i++) {
          const item = items[i]
          this.items = [...this.items, item]
          this.innerHTML += this.replaceWith(artTpl, item)
        }
        return artTpl // une promesse dont le résultat s'il est positif pour être récupérer dans un then
      })
      .then((template) => {
        // on appel ici parce qu'il faut avoir au moins un article dans le DOM
        this.openModal()
        return template // idem que pour return artTpl précédent
      })
      .then((template) => {
        return { // une promesse qui retourne un objet qu'on pourra recup dans then comme pour les cas préc.
          feed: this.feed,
          items: this.items,
          template // clé et valeur s'ils ont le même nom, on peut juste mettre le nom au lieu de faire template: template
        }
      })
      .catch(error => {
        console.error('error ', error)
        //
        this.innerHTML = `<p>Aucun article n'a pu être récupéré depuis ${this.feed.url}!</p>`
      })
  }

  /**
   * Replace html template pattern by data matches
   * @param {string} template
   * @param {string} data
   * @returns string
   */
  replaceWith (template, data) {
    return template
      .replace(/{{title}}/g, data.title)
      .replace(/{{thumbnail.url}}/g, data.media.thumbnail.url)
      .replace(/{{pubDate}}/g, this.getFrDate(data.pubDate))
      .replace(/{{author}}/g, data.author)
      .replace(/{{link}}/g, data.link)
      .replace(/{{description}}/g, data.description)
  }

  /**
   * Format to french date
   * @param {Number} timestamp
   * @returns string
   */
  getFrDate (timestamp) {
    const d = new Date(timestamp)
    return d.toLocaleDateString('fr')
  }

  /**
   * Get all items of RSS feed
   * @returns Array
   */
  async getAll () {
    return this.dataFetch.xml(this.feed.url)
  }

  /**
   * Find items only matches with url
   * @param {string} url
   * @returns Array
   */
  findOne (url) {
    return this.items.find(item => item.link === url)
  }

  /**
   * Open the modal
   * @returns void
   */
  async openModal () {
    console.info('openModal ready')
    const btns = document.querySelectorAll('.open-modal')
    const tpl = await this.dataFetch.html(CurrentNews.MODAL_TPL)
    for (let i = 0; i < btns.length; i++) {
      const btn = btns[i]
      btn.addEventListener('click', () => {
        const data = this.findOne(btn.dataset.link)
        const modalWithData = this.replaceWith(tpl, data)
        const modalEl = document.querySelector('modal-article')
        const modalArticle = new ModalArticle(modalWithData)
        if (modalEl) { // modal existe déjà dans le DOM
          modalEl.replaceWith(modalArticle)
        } else {
          document.body.querySelector('main').append(modalArticle)
        }
        document.querySelector('.modal').style.display = 'block'
      })
    }
  }
}

customElements.define('current-news', CurrentNews)
export default CurrentNews
