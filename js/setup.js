"use strict";

const WIZARDS_QUANTITY = 4;

const WIZARD_NAMES = [
  'Иван',
  'Хуан Себастьян',
  'Мария',
  'Кристоф',
  'Виктор',
  'Юлия',
  'Люпита',
  'Вашингтон',
];

const WIZARD_SURNAMES = [
  'да Марья',
  'Верон',
  'Мирабелла',
  'Вальц',
  'Онопко',
  'Топольницкая',
  'Нионго',
  'Ирвинг',
];

const WIZARD_COLORS = [
  'rgb(101, 137, 164)',
  'rgb(241, 43, 107)',
  'rgb(146, 100, 161)',
  'rgb(56, 159, 117)',
  'rgb(215, 210, 55)',
  'rgb(0, 0, 0)',
];

const WIZARD_EYES = ['black', 'red', 'blue', 'yellow', 'green'];

const wizards = [];

const userDialog = document.querySelector('.setup');
userDialog.classList.remove('hidden');

const setupSimilar = userDialog.querySelector('.setup-similar');
setupSimilar.classList.remove('hidden');

const similarListElement = userDialog.querySelector('.setup-similar-list'); // сюда добавим элементы
const similarWizardTemplate = document
  .querySelector('#similar-wizard-template') // шаблон волшебников
  .content.querySelector('.setup-similar-item');

// рандомное число
function getRandomNumber(max) {
  return Math.floor(Math.random() * max);
}

// создаем массив
function renderWizardsArr(wizardsQuantity) {
  for (let i = 0; i < wizardsQuantity; i++) {
    wizards[i] = {
      name:
        WIZARD_NAMES[getRandomNumber(WIZARD_NAMES.length)] +
        ' ' +
        WIZARD_SURNAMES[getRandomNumber(WIZARD_SURNAMES.length)],
      coatColor: WIZARD_COLORS[getRandomNumber(WIZARD_COLORS.length)],
      eyesColor: WIZARD_EYES[getRandomNumber(WIZARD_EYES.length)],
    };
  }
}

// создаем персонажа
function renderWizard(wizard) {
  const wizardElement = similarWizardTemplate.cloneNode(true);
  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;
  return wizardElement;
}

const fragment = document.createDocumentFragment();
renderWizardsArr(WIZARDS_QUANTITY);
wizards.forEach((item) => {
  fragment.appendChild(renderWizard(item));
});

similarListElement.appendChild(fragment);
