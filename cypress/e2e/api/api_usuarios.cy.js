import { faker } from "@faker-js/faker"

const randomUser = faker.person.fullName()
const randomPassword = faker.internet.password()
const randomEmail = faker.internet.email()

describe('API login test', () => {

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

  it('Should show users', () => {
    cy.request({
      method: 'GET',
      url: 'usuarios',
    }).then((response) => {
      expect(response.body.message)
      // cy.log(JSON.stringify(response.body))
    })
  })

  // it('Try delete an user', () => {

  // })

  // it('Delete an user', () => {

  // })

  // it('Try edit an user', () => {

  // })

  // it('Edit an user', () => {

  // })
  
})