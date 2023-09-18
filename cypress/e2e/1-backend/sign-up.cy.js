describe('Sign up testing from Node JS Backend', () => {
  beforeEach(() => {
    cy.visit('/')
    cy.get('[type=button]').click({ force: true })
    cy.intercept({ url: 'http://localhost:7000/signup', method: 'POST' }).as('up')
  })

  it('Should not create new user => user already exists', () => {
    cy.get('[name=lastname]').type('Doe')
    cy.get('[name=firstname]').type('john')
    cy.get('[name=email]').type('john@doe.com')
    cy.get('[name=password]').type('Doe')
    cy.get('[name=confirm]').type('Doe')
    cy.get('[name=country]').select('France')
    cy.get('[name=city]').select('Paris')
    cy.get('[type=submit]').click({ force: true })
    cy.wait('@up').its('response.body').should('include', 'user already exists')
  })

  it('Should create new user', () => {
    cy.get('[name=lastname]').type('Doe')
    cy.get('[name=firstname]').type('john')
    cy.get('[name=email]').type(`john${Math.random()}@doe.com`)
    cy.get('[name=password]').type('Doe')
    cy.get('[name=confirm]').type('Doe')
    cy.get('[name=country]').select('France')
    cy.get('[name=city]').select('Paris')
    cy.get('[type=submit]').click({ force: true })
    cy.wait('@up').its('response.body').should('include', 'user already exists')
  })
})
