import { faker } from "@faker-js/faker";

const randomProduct = faker.word.words()
const randomAlphanumeric = faker.string.alphanumeric(16)

let token

describe('API test cart', () => {

    it('Should login in page', () => {
        cy.api_login('oioioji2@qa.com.br', 'nova-senha').then((response) => {
            token = response.body.authorization
        })
    })

    it('Should products in cart', () => {
        cy.request({
            method: 'GET',
            url: 'carrinhos'
        }).then((response) => {
            cy.log(JSON.stringify(response.body))
        })
    })

    // it('Should register a new product in cart', () => {
    //     cy.request({
    //         method: 'POST',
    //         url: 'carrinhos',
    //         headers: {
    //             authorization: token
    //         },
    //         body:
    //         {
    //             "produtos": [
    //                 {
    //                     "idProduto": `${randomProduct}`,
    //                     "quantidade": 1
    //                 }
    //             ]
    //         }
    //     })
    // });

    it('Try register two products in cart', () => {
        cy.request({
            method: 'POST',
            url: 'carrinhos',
            headers: {
                authorization: token
            },
            body:
            {
                "produtos": [
                    {
                        "idProduto": `${randomProduct}`,
                        "quantidade": 1
                    }
                ]
            },
            failOnStatusCode: false
        }).then((response) => {
            expect(response.body.message).to.equal('Não é permitido ter mais de 1 carrinho')
        })
    });

    it('Try register a new product in cart using invalid token', () => {
        cy.request({
            method: 'POST',
            url: 'carrinhos',
            body:
            {
                "produtos": [
                    {
                        "idProduto": `${randomProduct}`,
                        "quantidade": 1
                    }
                ]
            },
            failOnStatusCode: false
        }).then((response) => {
            expect(response.body.message).to.equal('Token de acesso ausente, inválido, expirado ou usuário do token não existe mais')
        })
    })

    it('Should find a cart using ID', () => {
        cy.request({
            method: 'GET',
            url: 'carrinhos/qbMqntef4iTOwWfg'
        })
    })

    it('Try find a cart using invalid ID', () => {
        cy.request({
            method: 'GET',
            url: `carrinhos/${randomAlphanumeric}`,
            failOnStatusCode: false
        }).then((response) => {
            expect(response.body.message).to.equal('Carrinho não encontrado')
        })
    })


})