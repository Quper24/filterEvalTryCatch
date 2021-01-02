// объявлена функция, которая принимает тип и массив, после применения фильтрации остаются только значения равные параметру type
const filterByType = (type, ...values) => values.filter(value => typeof value === type),
    //объявлена функция hideAllResponseBlocks
    hideAllResponseBlocks = () => {
        const responseBlocksArray = Array.from(document.querySelectorAll('div.dialog__response-block'));
        //создается переменная и присваивается значение из блоков div.dialog__response-block в виде массива
        responseBlocksArray.forEach(block => block.style.display = 'none');
        //скрываются все элементы из массива responseBlocksArray
    },
    // объявляется функция showResponseBlock принимающая параметры blockSelector, msgText, spanSelector
    showResponseBlock = (blockSelector, msgText, spanSelector) => {
        hideAllResponseBlocks(); // скрываются все элементы div.dialog__response-block
        document.querySelector(blockSelector).style.display = 'block'; // элемент blockSelector отображается
        if (spanSelector) {
            //если spanSelector существуем в DOMе
            document.querySelector(spanSelector).textContent = msgText;
            // отобразить сообщение из msgText в элементе spanSelector
        }
    },
    // обьявляется функция showError принимающая msgText как параметр, вызывается showResponseBlock  с тремя параметрами. В результате скроются все блоки, кроме .dialog__response-block_error, значение из msgText будет записано в элемент #error
    showError = msgText => showResponseBlock('.dialog__response-block_error', msgText, '#error'),

    // обьявляется функция showResults принимающая msgText как параметр, вызывается showResponseBlock  с тремя параметрами. В результате скроются все блоки, кроме .dialog__response-block_ok, значение из msgText будет записано в элемент #ok 
    showResults = msgText => showResponseBlock('.dialog__response-block_ok', msgText, '#ok'),
    // обьявляется функция showNoResults без параметров. Отобразит сообщение об отсутствии результатов
    showNoResults = () => showResponseBlock('.dialog__response-block_no-results'),
    // обьявляется функция tryFilterByType принимающая 2 параметра
    tryFilterByType = (type, values) => {
        // создается конструкция try/catch
        try {
            // создается переменнная valuesArrayс в которую записывается результат исполнения функциии filterByType, результат которой переводим в строку с разделителем ,
            const valuesArray = eval(`filterByType('${type}', ${values})`).join(", ");
            // создаем переменную alertMsg в которую запишем `Данные с типом ${type}: ${valuesArray}` если valuesArray существует иначе `Отсутствуют данные типа ${type}`
            const alertMsg = (valuesArray.length) ?
                `Данные с типом ${type}: ${valuesArray}` :
                `Отсутствуют данные типа ${type}`;
            //вызываем функцию showResults с параметром alertMsg для отображения результатов
            showResults(alertMsg);
            // catch блок для обработки случаев ошибки в блоке try
        } catch (e) {
            showError(`Ошибка: ${e}`); // отображаем ошибку
        }
    };
// создаем переменную filterButton и присваиваем елемент #filter-btn
const filterButton = document.querySelector('#filter-btn');
// добавляем слушателя на #filter-btn елемент
filterButton.addEventListener('click', e => {
    //создаем переменные typeInput и dataInput, присваиваем значение из поля типа (#type) и значения (#data) из фильтра
    const typeInput = document.querySelector('#type');
    const dataInput = document.querySelector('#data');
    // если значение отсутствует
    if (dataInput.value === '') {
        // отображаем сообщение об ошибке
        dataInput.setCustomValidity('Поле не должно быть пустым!');
        //вызов showNoResults для отображеня сообщения об отсутствии рез-в
        showNoResults();
    } else {
        // или записываем в dataInput пустую строку для сообщения
        dataInput.setCustomValidity('');
        // убираем стандартное поведение браузера
        e.preventDefault();
        // вызываем ф-ю tryFilterByType с параметрами typeInput и dataInput удалив пробелы с начала и конца строки
        tryFilterByType(typeInput.value.trim(), dataInput.value.trim());
    }
});