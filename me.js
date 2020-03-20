const addButton = document.querySelector('.addButton');
const container = document.querySelector('.container');
let inputValue = document.querySelector('.input');

let element;


if (localStorage.getItem('data-local') == undefined) {
    let data = [];
    localStorage.setItem('data-local', JSON.stringify(data))
}
let data = JSON.parse(localStorage.getItem('data-local'));


class Item {
    constructor(name) {
        this.createDiv(name);
    }
    createDiv(name) {
        let boxItem = document.createElement('div');
        boxItem.classList.add('item');

        let input = document.createElement('input');
        input.value = name;
        input.disabled = true;
        input.classList.add('item_input');
        input.type = 'text';

        let editButton = document.createElement('button');
        editButton.classList.add('editButton');
        editButton.innerHTML = '<i class="fas fa-pencil-alt">';
        editButton.addEventListener('click', () => {
            this.edit(input, name);
        })

        let removeButton = document.createElement('button');
        removeButton.classList.add('removeButton');
        removeButton.innerHTML = '<i class="fas fa-trash-alt">';
        removeButton.addEventListener('click', () => {
            this.remove(boxItem, name);
        })

        container.appendChild(boxItem);
        boxItem.append(input, editButton, removeButton)
    };
    edit(input, name) {
        if (input.disabled === true) {
            input.disabled = "";
        } else {
            input.disabled = !input.disabled;
            element = data.indexOf(name);
            data[element] = input.value;
            localStorage.setItem('data-local', JSON.stringify(data));

            console.log(data);

        }
    }
    remove(boxItem, name) {
        boxItem.remove(boxItem);
        data.splice(element, name)
        localStorage.setItem('data-local', JSON.stringify(data));
        console.log(data)
    }
}


addButton.addEventListener('click', add);
window.addEventListener('keydown', (e) => {
    if (e.which == 13) {
        add();
    }
})

function add() {
    if (inputValue.value != '') {
        new Item(inputValue.value)
        data.push(inputValue.value)
        inputValue.value = '';
        localStorage.setItem('data-local', JSON.stringify(data));
        console.log(data);
    }
}