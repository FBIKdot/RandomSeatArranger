/*
 * RandomSeatArranger - 随机座位表生成器
 * https://github.com/BovineBeta/RandomSeatArranger
 * Copyright (C) 2023 FBIK <fbik@fbik.top>
 * https://github.com/BovineBeta/RandomSeatArranger/blob/master/LICENSE
 */
import 'mdui/dist/css/mdui.min.css';
import mdui from 'mdui';

let $ = mdui.$;
$('body').removeAttr('style');

function getRandomArray(number) {
    let list = [];
    for (let i = 0; i < number; i++) list.push(i);
    for (let i = list.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [list[i], list[j]] = [list[j], list[i]];
    }
    return list;
}

console.log(getRandomArray(46));

async function main(row) {
    let data = await fetch('./student.json').then(response => response.json());
    /** @type {*} */
    let dom = document.querySelector('.mdui-table');
    console.log(dom.innerHTML);
    /** @type {Array} */
    const student = data['students'];
    const lists = (() => {
        let array = getRandomArray(student.length);
        let i = 0;
        /** @type {Array} */
        let list = [];
        for (let x = 0; x <= Math.ceil(student.length / row) - 1; x++) {
            list[x] = [[`行${x + 1}`]];
            for (let y = 1; y <= row; y++) {
                list[x][y] = student[array[i]];
                i++;
            }
        }
        return list;
    })();
    console.log(lists);

    let content = (() => {
        let text = '';
        for (let i = 1; i <= row; i++) text += `<td>${i}</td>`;
        return `<therd><tr><td>行列</td>${text}</tr></therd>`;
    })();
    lists.reverse().forEach(list => {
        content += `<tr>${list.map(person => `<td>${person || ''}</td>`).join('')}</tr>`;
        console.log(content);
    });
    dom.innerHTML = content;
}

document.querySelector('#run')?.addEventListener('click', () => {
    try {
        mdui.prompt(
            '每列的人数 (默认为8). 不能填的太离谱, 没写错误处理',
            text => {
                main(Number(text || 8));
            },
            () => {},
        );
    } catch (e) {
        throw new Error(e);
    }
});
