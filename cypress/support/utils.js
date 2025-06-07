import { faker } from '@faker-js/faker'

export function randomUser() {
    return faker.person.fullName();
}

export function randomEmail() {
    return faker.internet.email()
}

export function randomPassword() {
    return faker.internet.password()
}

export function randomAlphaNumeric() {
    return faker.string.alphanumeric(16)
}

export function randomProduct() {
    return faker.word.words()
}