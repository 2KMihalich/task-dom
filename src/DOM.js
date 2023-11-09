/*
  В функцию appendToBody передаются 3 параметра:
  tag - имя тега, content - содержимое тега и count - количество вставок.
  Необходимо, чтобы функция осуществила вставку на страницу указанный тег с указанным содержимым указанное число раз.
  Считаем, что всегда передается тег, допускающий вставку текста в качестве своего содержимого (P, DIV, I и пр.).
*/
export function appendToBody(tag, content, count) {
    for (let i = 0; i < count; i++) {
        const elem = document.createElement(tag),
            body = document.getElementsByTagName('body')[0];
        elem.innerHTML = content;
        body.insertAdjacentElement('afterbegin', elem);
    }
}

/*
  Создайте дерево вложенных тегов DIV.
  Каждый узел дерева должен содержать childrenCount узлов.
  Глубина дерева задается параметром level.
  Каждый элемент должен иметь класс вида item_n, где n - глубина вложенности элемента. (Нумерацию ведем с единицы).
  Сформированное дерево верните в качестве результата работы функции.
*/
export function generateTree(childrenCount, level) {
    return (function appendTo(count, n, a = n) {
        if (n == 1) {
            let el = document.createElement('div');
            return el;
        }
        const parent = document.createElement('div');
        for (let i = 0; i < count; i++) {
            const child = appendTo(count, n - 1, a);
            child.classList.add(`item_${a - n + 2}`);
            parent.insertAdjacentElement('afterbegin', child);
            parent.classList.add(`item_${a - n + 1}`);
        }
        return parent;
    })(childrenCount, level);
}

/*
  Используйте функцию для создания дерева тегов DIV из предыдущего задания.
  Создайте дерево с вложенностью 3 и числом элементов в каждом узле 2.
  Далее замените все узлы второго уровня (т.е. имеющие класс item_2) на теги SECTION.
  Остальную структуру дерева сохраните неизменной, включая классы и те элементы,
  которые находились внутри переписанных тегов.
  Сформированное дерево верните в качестве результата работы функции.
*/
export function replaceNodes() {
    let tree = generateTree(2, 3);
    var elem = tree.querySelectorAll('.item_2');
    elem.forEach((el) => el.parentNode.removeChild(el));
    let section1 = document.createElement('section');
    section1.classList.add('item_2');
    tree.insertAdjacentElement('afterbegin', section1);
    createDivs(section1, 2, 'item_3');

    let section2 = document.createElement('section');
    section2.classList.add('item_2');
    tree.insertAdjacentElement('afterbegin', section2);
    createDivs(section2, 2, 'item_3');
    return tree;

    function createDivs(parent, count, clas) {
        for (let i = 0; i < count; i++) {
            const element = document.createElement('div');
            element.classList.add(clas);
            parent.insertAdjacentElement('afterbegin', element);
        }
    }
}
