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

const WIZARD_FIREBALL = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];


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
      name: WIZARD_NAMES[getRandomNumber(WIZARD_NAMES.length)] +
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


// работа с модальным окном
const MIN_NAME_LENGTH = 2;
const MAX_NAME_LENGTH = 25;
const setupOpen = document.querySelector('.setup-open');
const setup = document.querySelector('.setup');
const setupClose = setup.querySelector('.setup-close');
const userNameInput = document.querySelector('.setup-user-name');
const setupWizard = document.querySelector('.setup-wizard');
const wizardCoat = setupWizard.querySelector('.wizard-coat');
const wizardEyes = setupWizard.querySelector('.wizard-eyes');
const wizardFireball = document.querySelector('.setup-fireball-wrap');


const onPopupEscPress = function (evt) {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    closePopup();
  }
};

const openPopup = function () {
  setup.classList.remove('hidden');

  document.addEventListener('keydown', onPopupEscPress);
};

const closePopup = function () {
  setup.classList.add('hidden');

  document.removeEventListener('keydown', onPopupEscPress);
};

setupOpen.addEventListener('click', function () {
  openPopup();
});

setupOpen.addEventListener('keydown', function (evt) {
  if (evt.key === 'Enter') {
    openPopup();
  }
});

setupClose.addEventListener('click', function () {
  closePopup();
});

setupClose.addEventListener('keydown', function (evt) {
  if (evt.key === 'Enter') {
    closePopup();
  }
});

userNameInput.addEventListener('input', function () {

});

userNameInput.addEventListener('input', function () {
  const valueLength = userNameInput.value.length;

  if (valueLength < MIN_NAME_LENGTH) {
    userNameInput.setCustomValidity('Напишите хотя бы еще ' + (MIN_NAME_LENGTH - valueLength) + ' симв.');
  } else if (valueLength > MAX_NAME_LENGTH) {
    userNameInput.setCustomValidity('Слишком много! удалите лишние ' + (valueLength - MAX_NAME_LENGTH) + ' симв.');
  } else {
    userNameInput.setCustomValidity('');
  }

  userNameInput.reportValidity();
});

// изменение цветов
wizardCoat.addEventListener('click', function () {
  wizardCoat.style.fill = WIZARD_COLORS[getRandomNumber(WIZARD_COLORS.length)];
});

wizardEyes.addEventListener('click', function () {
  wizardEyes.style.fill = WIZARD_EYES[getRandomNumber(WIZARD_EYES.length)];
});

wizardFireball.addEventListener('click', function () {
  wizardFireball.style.backgroundColor = WIZARD_FIREBALL[getRandomNumber(WIZARD_FIREBALL.length)];
});
