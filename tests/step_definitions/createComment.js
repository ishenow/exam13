const { I } = inject();

Given('я нохожусь на странице Авторизация', () => {
  I.amOnPage('/login');
});

When('я ввожу {string} в поле {string}', (text, fieldName) => {
  I.fillField({ xpath: `//input[@id='${fieldName}']` }, text);
});

When('нажимаю на кнопку {string}', (buttonName) => {
  I.click(`//button[.='${buttonName}']`);
});

When('я вижу имя пользователя {string}', (name) => {
  I.waitForElement(`//a[contains(., 'Hello, ${name}')]`, 10);
});

When('я открываю страницу одного заведения {string}', (text) => {
  I.click(`//div[.='${text}']/ancestor::div[@class='card']/descendant::img`);
});

When('я ввожу комментарий в текстовое поле', () => {
  I.fillField(`//textarea[@name='comment']`, 'Тест');
});

When('я ставлю рейтинг по качеству', () => {
  I.click(`//label[contains(.,'Quality of food')]/parent::div/descendant::div[@class='star-ratings']/div[1]`);
});

When('я нажимаю отправить комментарий', () => {
  I.click(`//button[.='Submit new review']`);
});

When('я вижу что рейтинг изменился на {string}', (text) => {
  I.waitForElement(`//p[contains(.,'food')]/parent::div/descendant::p[contains(.,'${text}')]`, 10);
});
