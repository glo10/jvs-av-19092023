import { describe, it, afterEach, vi } from 'vitest'
import CurrentNews from '../2-exercice/correction/src/js/current-news'
import fileFetch from 'file-fetch'
import { fetchMockText, items, baseHtml } from './utilities'
global.fetch = vi.fn()
const article = fileFetch(`${baseHtml}/_partials/article.html`)
const url = 'http://feed.com'

describe('Exercice 2 : news', () => {
  afterEach(() => {
    vi.fn().mockReset()
  })

  it.skip('Should get and show articles', async () => {
    // Arrange
    document.body.innerHTML = `
    <section>
      <h2>France 24</h2>
      <div class="row"></div><!--Les news-->
    </section>
    `
    const news = new CurrentNews(null, { url })
    await fetch.mockResolvedValue([fetchMockText(article), items])
    // Act
    await news.getItems()
    const content = document.querySelector('.row').innerHTML
    expect(fetch).toHaveBeenCalledWith('http://feed.com')
    expect(fetch).toHaveBeenCalledWith(CurrentNews.template)
    // TODO mock replaceInputBySelect
    // Assert
    expect(content).toContain('.h5') // title
    expect(content).toContain('aside img') // cover image
    expect(content).toContain('a.btn') // link
    expect(content).toContain('h3+p') // author
    expect(content).toContain('p small') // pub date
  })

  it('Should get articles', async () => {
    // Arrange
    const news = new CurrentNews(null, { url })
    const spy = vi.spyOn(news, 'getAll')
    spy.mockImplementationOnce(() => new Promise((resolve) => resolve(items)))
    // Act
    const res = await news.getAll()
    // Assert
    expect(spy).toHaveBeenCalledTimes(1)
    expect(res).toEqual(items)
  })

  it('Should replace placeholders by data', async () => {
    // Arrange
    const news = new CurrentNews()
    const spy = vi.spyOn(news, 'getFrDate')
    spy.mockImplementationOnce(() => '16/08/2023')
    // Act
    const template = await article.then(html => html.text())
    const item = news.replaceWith(template, items[1])
    expect(item).toContain('title 2')
    expect(item).toContain('http://feed.com/article2')
    expect(item).toContain('Auteur: Tshimini')
    expect(item).toContain('Date: 16/08/2023')
    expect(item).toContain('http://feed.com/article2/img.png')
    expect(spy).toHaveBeenCalledTimes(1)
  })

  it('Should transform timestamp to fr date', () => {
    // Arrange
    const news = new CurrentNews()
    // Act
    const res = news.getFrDate(1692179626000)
    // Assert
    expect(res).toEqual('16/08/2023')
  })

  it('Should find one article', () => {
    // Arrange
    const news = new CurrentNews(null, { url }, items)
    // Act
    const res = news.findOne(url + '/article1')
    // Assert
    expect(res).toStrictEqual(items[0])
  })

  it('Should not find an article', () => {
    // Arrange
    const news = new CurrentNews(null, { url }, items)
    // Act
    const res = news.findOne('http://feed.com/article3')
    // Assert
    expect(res).toBeUndefined()
  })
})
