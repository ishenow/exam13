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

When('я нажимаю на кнопку добавления {string}', (buttonName) => {
  I.click(`//a[.='${buttonName}']`);
  I.amOnPage('/places/add');
});

When('я ввожу поля формы:', table => {
  for (const id in table.rows) {
    if (id < 1) {
      continue;
    }
    const cells = table.rows[id].cells;

    const name = cells[0].value;
    const value = cells[1].value;

    if (name === 'image' || name === 'logo') {
      I.attachFile(`//input[@id='${name}']`, 'dataImage/jw.jpg');
    } else {
      I.fillField({ xpath: `//*[@id='${name}']` }, value);
    }
  }
});

When('нажимаю на чебокс и принимаю соглашение', () => {
  I.click(`//label[contains(.,'By submitting this form')]/parent::div/child::div/input[@type='checkbox']`);
});

When('кликаю по кнопке чтобы добавить ивент {string}', (buttonName) => {
  I.click(`//button[.='${buttonName}']`);
});

Then('я вижу созданный ивент {string} на главной странице', (text) => {
  I.waitForVisible(`//div[.='${text}']`, 10);
});
