/// <reference types="cypress"/>

describe('API test', () => {

  beforeEach('Go to home page', () => {
    cy.visit('/')
  })

  it('Should login in page', () => {
    cy.request({
      method: 'POST',
      url: 'login',
      body: {
        "email": "fulano@qa.com",
        "password": "teste"
      }
    }).then((response) => {
      expect(response.status).to.equal(200)
      expect(response.body.message).to.equal('Login realizado com sucesso')
    })
  })

  it('Should validate incorrect password', () => {
    cy.request({
      method: 'POST',
      url: 'login',
      body: {
        "email": "fulano@qa.com",
        "password": "IncorrectPassword"
      }, failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.equal(401)
      expect(response.body.message).to.equal('Email e/ou senha inválidos')
    })
  })

  it.only('Should list users', () => {
    cy.request({
      method: 'GET',
      url: 'usuarios',
      body: {

      },
    }).then((response) => {
      expect(response.status).to.equal(200)
      expect(response.body.message)
    })
  });

})