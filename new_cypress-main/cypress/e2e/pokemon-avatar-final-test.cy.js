/// <reference types="cypress" />

describe('Покупка аватара Pokémon - ФИНАЛЬНЫЙ ТЕСТ', function () {
    
    const USER_LOGIN = 'YOUR_LOGIN';
    const USER_PASSWORD = 'YOUR_PASSWORD';
    
    // ПРАВИЛЬНЫЙ НОМЕР КАРТЫ!
    const TEST_CARD = {
        number: '4111111111111111', // ← ЭТО ТОЧНО РАБОЧИЙ НОМЕР!
        cvv: '125',
        date: '1226',
        name: 'IVAN IVANOV',
        smsCode: '56456'
    };
    
    it('e2e тест на покупку нового аватара для тренера', function () {
        cy.log('��� Начинаем тест с номером карты: ' + TEST_CARD.number);
        
        // 1. Сайт
        cy.visit('https://pokemonbattle.ru/');
        cy.wait(2000);
        
        // 2. Авторизация
        cy.get('input[id="k_email"]').type(USER_LOGIN);
        cy.get('input[id="k_password"]').type(USER_PASSWORD);
        cy.get('button[type="submit"]').click();
        cy.wait(7000);
        
        // 3. Аватар тренера
        cy.get('.header_card_trainer').click();
        cy.wait(2000);
        
        // 4. Меню аватара
        cy.get('.k_mobile > :nth-child(5) > #dropdown > img').click();
        cy.wait(2000);
        
        // 5. Выбор аватара
        cy.get('.available > button').first().click();
        cy.wait(3000);
        
        // 6. ОПЛАТА - ПРОВЕРЯЕМ КАКОЙ НОМЕР ВВОДИТСЯ
        cy.log('��� Ввожу номер карты: ' + TEST_CARD.number);
        cy.get('.card_number').type(TEST_CARD.number);
        cy.get('.card_csv').type(TEST_CARD.cvv);
        cy.get('.card_date').type(TEST_CARD.date);
        cy.get('.card_name').type(TEST_CARD.name);
        
        cy.screenshot('payment-form');
        
        // 7. Нажимаем оплатить
        cy.get('.style_1_base_button_payment_body > .style_1_base_button_payment').click();
        cy.wait(2000);
        
        // 8. SMS код (с проверкой)
        cy.get('body').then(($body) => {
            if ($body.find('.threeds_number').length > 0) {
                cy.get('.threeds_number').type(TEST_CARD.smsCode);
                cy.get('.style_1_base_button_payment_body > .style_1_base_button_payment').click();
                cy.wait(5000);
            } else {
                cy.log('SMS поле не найдено');
                cy.wait(3000);
            }
        });
        
        // 9. Проверка успеха
        cy.contains('Покупка прошла успешно').should('be.visible');
        cy.log('✅ ТЕСТ УСПЕШЕН!');
    });
});
