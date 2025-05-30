/// <reference types="cypress"/>

let token

describe('Should login and register new product', () => {

    it('Should login', () => {
        cy.api_login('fulano@qa.com', 'teste').then((response) => {
            expect(response.status).to.equal(200)
            expect(response.body.message).to.equal('Login realizado com sucesso')
            token = response.body.authorization
        })
    })

    it('Should register a product', () => {
        cy.request({
            method: 'POST',
            url: 'produtos',
            headers: {
                authorization: token
            },
            body: {
                "nome": "Carro Teste2",
                "preco": 470,
                "descricao": "descriçÃo do carro",
                "quantidade": 5
            }
        }).then((response) => {
            expect(response.status).to.equal(201)
            expect(response.body.message).to.equal('Cadastro realizado com sucesso')
        })
    });
});