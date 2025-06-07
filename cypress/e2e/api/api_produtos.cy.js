import { randomProduct } from "../../support/utils";

let token

describe('API produtos test', () => {

    it('Should login', () => {
        cy.api_login('fulano@qa.com', 'teste').then((response) => {
            token = response.body.authorization
        })
    })

    it('Should show products registered', () => {
        cy.request({
            method: 'GET',
            url: 'produtos'
        })
    });

    it('Should register a product', () => {
        cy.request({
            method: 'POST',
            url: 'produtos',
            headers: {
                authorization: token
            },
            body: {
                "nome": randomProduct(),
                "preco": 470,
                "descricao": "descrição do carro",
                "quantidade": 5
            }
        }).then((response) => {
            expect(response.status).to.equal(201)
            expect(response.body.message).to.equal('Cadastro realizado com sucesso')
        })
    });

    it('Find a valid product', () => {
        cy.request({
            method: 'GET',
            url: 'produtos/BeeJh5lz3k6kSIzA'
        })
    });

    it('Try find a invalid product', () => {
        cy.request({
            method: 'GET',
            url: 'produtos/ZeeJh5lz3k6kSIzB',
            failOnStatusCode: false
        }).then((response) => {
            expect(response.body.message).to.equal('Produto não encontrado')
        })
    });

});