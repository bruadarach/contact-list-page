const get = (target) => document.querySelector(target);
const make = (target) => document.createElement(target);
const inputFormName = get('.form-name');
const inputFormAddress = get('.form-address');
const formSubmitButton = get('.form-submit-button');
const contactList = get('#contactList');

const addNewContact = (event) => {
    event.preventDefault();
    if (inputFormName.value && inputFormAddress.value) {
        let confirmAnswer = window.confirm("연락처를 추가하시겠습니까?");
        if (confirmAnswer === true) {
            const span = make('span');
            span.className = "list-user-name";
            span.textContent = inputFormName.value;
            const a = make('a');
            a.className = "list-github-address";
            a.setAttribute('href', inputFormAddress.value);
            a.setAttribute('target', "_blank");
            a.textContent = inputFormAddress.value;
            let label = make('label');
            label.textContent = "Confirmed";
            const input = make('input');
            input.setAttribute('type', "checkbox");
            label.append(input);
            let div = make('div');
            div.className = "contact-list-buttons";
            const button1 = make('button');
            button1.className = "edit-button";
            button1.textContent = 'Edit';
            const button2 = make('button');
            button2.className = "remove-button";
            button2.textContent = "Remove";
            div.append(button1, button2);
            let li = make('li');
            li.append(span, a, label, div);
            console.log(li);
            let ul = get('#contactList');
            ul.prepend(li);

            inputFormName.value = '';
            inputFormAddress.value = '';
           
        } else {
            alert("제출을 취소하셨습니다.");
        }
    } else {
        window.alert("필수사항을 모두 입력해주세요.");
    }
}

contactList.addEventListener('change', (event) => {
    const checkbox = event.target;
    const checked = checkbox.checked;
    li = checkbox.parentNode.parentNode; // label -> li
    if (checked) {
        li.className = 'confirmed';
    } else {
        li.className = '';
        checked = checkbox;
    }
})

contactList.addEventListener('click', (event) => {
    if (event.target.tagName === 'BUTTON') {
        const button = event.target;
        const div = button.parentNode;
        const li = div.parentNode;
        const ul = li.parentNode;
        if (button.textContent === "Remove") {
            let confirmAnswer = window.confirm("정보를 삭제하겠습니까?");
            if (confirmAnswer === true) {
            ul.removeChild(li);
            }
        } else if (button.textContent === "Edit") {
            const span = li.firstElementChild;
            const input = make('input');
            input.type = 'text';
            input.className = "form-name";
            input.value = span.textContent;
            li.insertBefore(input, span);
            li.removeChild(span);
         
            const a = li.children[1];
            const inputAddress = make('input');
            inputAddress.type='text';
            inputAddress.className = 'form-address';
            inputAddress.value = a.textContent;
            inputAddress.name = "form-user-name";
            li.insertBefore(inputAddress, a);
            li.removeChild(a);
            button.textContent = 'Save';
        } else if (button.textContent === "Save") {
            const input = li.firstElementChild;
            const span = make('span');
            span.className = 'list-user-name';
            span.textContent = input.value;
            li.insertBefore(span, input);
            li.removeChild(input);
       
            const a = li.children[1];
            const newA = make('a');
            newA.className = "list-github-address";
            newA.href = a.value;
            newA.target = "_blank";
            newA.textContent = a.value;
            li.insertBefore(newA, a);
            li.removeChild(a);
            button.textContent = 'Edit';
        }
    }
})

formSubmitButton.addEventListener("click", addNewContact)
