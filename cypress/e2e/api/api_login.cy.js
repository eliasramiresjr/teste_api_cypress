/// <reference types="cypress"/>

describe('API login test', () => {

  it('Should login in page', () => {
    cy.api_login('fulano@qa.com', 'teste').then((response) => {
      expect(response.status).to.equal(200)
      expect(response.body.message).to.equal('Login realizado com sucesso')
    })
  })

  it('Should validate incorrect password', () => {
    cy.api_login('fulano@qa.com', 'SenhaIncorreta').then((response) => {
      expect(response.status).to.equal(401)
      expect(response.body.message).to.equal('Email e/ou senha inválidos')
    })
  })
})