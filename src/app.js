let sliderMenu = document.querySelector('.slider__menu'); //получаю родительский элемент меню
let sliderMenuLink = document.querySelectorAll('.slider-menu__link'); //получаю список элементов меню
let sliderImage = document.querySelectorAll('.slider-right__image'); //получаю список картинок
let sliderSwitches = document.querySelector('.slider-switches'); //получаю контейнер для точек
let leftArray = document.querySelector('.arrow-left');
let RigthArray = document.querySelector('.arrow-rigth');
let sliderInformation = document.querySelector('.slider-information'); //получаю контейнер для основной информации по объектам

//массив объектов, в котором содержатся данные для объектов (город, площадь и т.п.)
let objectsData = [
    {
        city: "Rostov-on-Don LCD admiral",
        apartamentArea: "81 m2",
        repairTime: "3.5 months",
        repairCost: "Upon request"
    },
    {
        city: "Sochi Ice Town",
        apartamentArea: "105 m2",
        repairTime: "4 months",
        repairCost: "Upon request"
    },
    {
        city: "Rostov-on-Don Patriotic",
        apartamentArea: "93 m2",
        repairTime: "3.5 months",
        repairCost: "Upon request"
    }
];

//задаю начальный индекс, чтобы подставлять в индекс элемента массива картинок
let currentIndex = 0;

//вставляю данные из объектов
function  initInformation(index) {
    sliderInformation.querySelector('.city').textContent = objectsData[index].city;
    sliderInformation.querySelector('.apartamentArea').textContent = objectsData[index].apartamentArea;
    sliderInformation.querySelector('.repairTime').textContent = objectsData[index].repairTime;
    sliderInformation.querySelector('.repairCost').textContent = objectsData[index].repairCost;
}

//сразу инициализирую функцию, чтобы при загрузки страницы вставить объекты из первого объекта (когда currentIndex = 0)
initInformation(currentIndex);

//динамически добавляю точки - количество зависит от количества картинок
function initDots () {
    for (i=0; i<sliderImage.length; i++) {
        let dot = `<li class="slider-switches__element"}"></li>`;
        sliderSwitches.innerHTML += dot;
    }
}

//сразу инициалиизрую полученную функцию, чтобы отобразить все точки
initDots();


let sliderSwitchesElement = document.querySelectorAll('.slider-switches__element'); //получаю список точек
//добавляю класс точке
function initDotsActive () {
    sliderSwitchesElement.forEach(element => element.classList.remove('slider-switches__element--active'));
    sliderSwitchesElement[currentIndex].classList.add('slider-switches__element--active');
}
initDotsActive();

//навешиваю обработчик для меню
sliderMenu.addEventListener(
    'click',
    (event) => {
        event.preventDefault();
        sliderMenuLink.forEach(
            item => item.classList.remove('slider-menu__link-active')
        )
        if (event.target.classList.contains('slider-menu__link')) {
            event.target.classList.add('slider-menu__link-active');
            let menuEl = Array.from(sliderMenuLink).indexOf(event.target); //получаю индекс элемента с активным классом
            sliderImage[currentIndex].classList.remove('slider-right__image-active');
            currentIndex = menuEl; //полученный индекс перезаписывается в основную переменную currentIndex для изменения картинки
            sliderImage[currentIndex].classList.add('slider-right__image-active');
            initDotsActive();
            initInformation(currentIndex);
        }
    }
)

//функция с изменениями класса в элементах меню при нажатии на стрелки или точки - в дальнйшем использую её ниже
function changeMenuEl (index){
    sliderMenuLink.forEach(
        item => item.classList.remove('slider-menu__link-active')
    )
    sliderMenuLink[index].classList.add('slider-menu__link-active');
}

//навешиваю обработчики на точки
sliderSwitchesElement.forEach((dot) => {
    dot.addEventListener(
        'click',
        () => {
            sliderSwitchesElement.forEach(element => {
                element.classList.remove('slider-switches__element--active');
            })
            dot.classList.add('slider-switches__element--active');
            slide = Array.from(sliderSwitchesElement).indexOf(dot); //получаю индекс точки с активным классом
            sliderImage[currentIndex].classList.remove('slider-right__image-active');
            currentIndex = slide; //полученный индекс перезаписываются в основную переменную currentIndex для изменения картинки
            sliderImage[currentIndex].classList.add('slider-right__image-active');
            changeMenuEl(currentIndex);
            initInformation(currentIndex);
        }
    )
})

//навешиваю обработчик на левую стрелку
leftArray.addEventListener(
    'click',
    () => {
        sliderImage[currentIndex].classList.remove('slider-right__image-active');
        currentIndex = currentIndex - 1;
        if (currentIndex == -1){
            currentIndex = sliderImage.length - 1
        }
        sliderImage[currentIndex].classList.add('slider-right__image-active');
        initDotsActive();
        changeMenuEl(currentIndex);
        initInformation(currentIndex);
    }
)

//навешиваю обработчик на правую стрелку
RigthArray.addEventListener(
    'click',
    () => {
        sliderImage[currentIndex].classList.remove('slider-right__image-active');
        currentIndex = currentIndex + 1;
        if (currentIndex == sliderImage.length){
            currentIndex = 0;
        }
        sliderImage[currentIndex].classList.add('slider-right__image-active');
        changeMenuEl(currentIndex);
        initDotsActive();
        initInformation(currentIndex);
    }
)