describe('Sign In testing', () => {
  beforeEach(() => {
    cy.visit('/')
    cy.intercept({ url: 'http://localhost:7000/signin', method: 'POST' }).as('in')
  })

  it('Should not get a user', () => {
    cy.get('[type=email]').type('john@doe.com')
    cy.get('[type=password]').type('wrong')
    cy.get('[type=submit]').click({ force: true })
    cy.wait('@in').its('response.body').should('include', 'unknown user')
  })

  it('Should get user with token', () => {
    cy.get('[type=email]').type('john@doe.com')
    cy.get('[type=password]').type('johndoe')
    cy.get('[type=submit]').click({ force: true })
    cy.wait('@in')
      .its('response.body')
      .should('include', 'token')
      .and('include', 'user')
  })
})
