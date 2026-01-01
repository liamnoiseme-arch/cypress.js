/// <reference types="cypress" />

describe('Авторизация на login.qa.studio', () => {
    
    beforeEach(() => {
        cy.visit('https://login.qa.studio');
    });

    // ========== ТЕСТ 1: Успешная авторизация ==========
    it('1. Успешный вход с валидными данными', () => {
        cy.get('#mail').clear().type('german@dolnikov.ru');
        cy.get('#pass').clear().type('qa_one_love1');
        cy.get('#loginButton').click();
        
        cy.get('#messageHeader')
            .should('be.visible')
            .and('have.text', 'Авторизация прошла успешно');
        cy.get('#exitMessageButton').should('be.visible');
    });

    // ========== ТЕСТ 2: Восстановление пароля ==========
    it('2. Восстановление пароля по email', () => {
        // Нажимаем "Забыли пароль?"
        cy.get('#forgotEmailButton').click();
        
        // Ждём форму восстановления
        cy.contains('Восстановите пароль', { timeout: 5000 })
            .should('be.visible');
        
        // ПРАВИЛЬНЫЙ СЕЛЕКТОР: #mailForgot (из консоли браузера!)
        cy.get('#mailForgot', { timeout: 5000 })
            .should('be.visible')
            .clear()
            .type('test@example.com');
        
        // Нажимаем "Отправить код"
        cy.get('#restoreEmailButton').click();
        
        // Проверяем сообщение
        cy.get('#messageHeader', { timeout: 5000 })
            .should('be.visible')
            .and('have.text', 'Успешно отправили пароль на e-mail');
        cy.get('#exitMessageButton').should('be.visible');
    });

    // ========== ТЕСТ 3: Неверный пароль ==========
    it('3. Неверный пароль при правильном email', () => {
        cy.get('#mail').clear().type('german@dolnikov.ru');
        cy.get('#pass').clear().type('неправильный_пароль');
        cy.get('#loginButton').click();
        
        cy.get('#messageHeader')
            .should('be.visible')
            .and('have.text', 'Такого логина или пароля нет');
        cy.get('#exitMessageButton').should('be.visible');
    });

    // ========== ТЕСТ 4: Неверный email ==========
    it('4. Неверный email при правильном пароле', () => {
        cy.get('#mail').clear().type('wrong@email.com');
        cy.get('#pass').clear().type('qa_one_love1');
        cy.get('#loginButton').click();
        
        cy.get('#messageHeader')
            .should('be.visible')
            .and('have.text', 'Такого логина или пароля нет');
        cy.get('#exitMessageButton').should('be.visible');
    });

    // ========== ТЕСТ 5: Email без @ ==========
    it('5. Email без символа @', () => {
        cy.get('#mail').clear().type('germandolnikov.ru');
        cy.get('#pass').clear().type('qa_one_love1');
        cy.get('#loginButton').click();
        
        cy.get('#messageHeader')
            .should('be.visible')
            .and('have.text', 'Нужно исправить проблему валидации');
        cy.get('#exitMessageButton').should('be.visible');
    });

    // ========== ТЕСТ 6: Баг с регистром ==========
    it('6. БАГ: Email с разным регистром - ДОЛЖЕН УПАСТЬ!', () => {
        cy.get('#mail').clear().type('GerMan@Dolnikov.ru');
        cy.get('#pass').clear().type('qa_one_love1');
        cy.get('#loginButton').click();
        
        // ОЖИДАЕМ УСПЕХ (но тест УПАДЁТ из-за бага)
        cy.get('#messageHeader', { timeout: 5000 })
            .should('be.visible')
            .and('have.text', 'Авторизация прошла успешно');
        cy.get('#exitMessageButton').should('be.visible');
    });
});
