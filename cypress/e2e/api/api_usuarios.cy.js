import { faker } from "@faker-js/faker"

const randomUser = faker.person.fullName()
const randomPassword = faker.internet.password()
const randomEmail = faker.internet.email()
const randomAlphanumeric = faker.string.alphanumeric(16)

describe('API users test', () => {

  it('Try login using incorrect password', () => {
    cy.api_login('fulano@qa.com', 'SenhaIncorreta').then((response) => {
      expect(response.status).to.equal(401)
      expect(response.body.message).to.equal('Email e/ou senha inválidos')
    })
  })

  it('Should login in page', () => {
    cy.api_login('fulano@qa.com', 'teste').then((response) => {
      expect(response.status).to.equal(200)
      expect(response.body.message).to.equal('Login realizado com sucesso')
    })
  })

  it('Should show users', () => {
    cy.request({
      method: 'GET',
      url: 'usuarios',
    }).then((response) => {
      expect(response.body.message)
    })
  })

  it('Should register new user', () => {
    cy.request({
      method: 'POST',
      url: 'usuarios',
      body: {
        "nome": randomUser,
        "email": randomEmail,
        "password": randomPassword,
        "administrador": "true"
      }
    }).then((response) => {
      expect(response.status).to.equal(201)
      expect(response.body.message).to.equal('Cadastro realizado com sucesso')
    })
  })

  it('Try created account using email registered', () => {
    cy.request({
      method: 'POST',
      url: 'usuarios',
      body: {
        "nome": randomUser,
        "email": 'beltrano@qa.com.br',
        "password": randomPassword,
        "administrador": "true"
      },
      failOnStatusCode: false
    }).then((response) => {
      expect(response.body.message).to.equal('Este email já está sendo usado')
    })
  })

  it('Find a user by id', () => {
    cy.request({
      method: 'GET',
      url: 'usuarios/0uxuPY0cbmQhpEz1'
    }).then((response) => {
      cy.log(JSON.stringify(response.body))
    })

  })

  it('Try find a user by id', () => {
    cy.request({
      method: 'GET',
      url: `usuarios/${randomAlphanumeric}`,
      failOnStatusCode: false
    }).then((response) => {
      expect(response.body.message).to.equal('Usuário não encontrado')
    })
  })

})