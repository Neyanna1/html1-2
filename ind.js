let items = JSON.parse(localStorage.getItem('items')) || [];

function addItem() {
    let newItem = document.getElementById('newItem').value;
    if (newItem !== '') {
        let currentDate = new Date();
        let formattedDate = currentDate.toLocaleString();
        items.push({ text: newItem, status: 'active', date: formattedDate });
        saveItems();
        displayItems();
        document.getElementById('newItem').value = '';
    }
}

function displayItems() {
    let list = document.getElementById('todoList');
    list.innerHTML = '';
    for (let i = 0; i < items.length; i++) {
        let item = items[i];
        let li = document.createElement('li');
        li.textContent = `${item.text} (${item.date})`;
        li.className = item.status;

        // Add the 'completed' class if the item is completed
        if (item.status === 'completed') {
            li.classList.add('completed');
        }

        // Add the 'deleted' class if the item is deleted
        if (item.status === 'deleted') {
            li.classList.add('deleted');
        }
        


        // Удалить
        let deleteButton = document.createElement('button');
        if(item.status==='active'){
            deleteButton.textContent = 'Удалить';
            deleteButton.className = 'deleteButton';
            deleteButton.onclick = function() {
            item.status = 'deleted';
            saveItems();
            displayItems();
        };
        } if(item.status==='deleted'){
            deleteButton.textContent = 'Удалить';
            deleteButton.className = 'deleteButton';
            deleteButton.onclick = function() {
            items.splice(i, 1);
            saveItems();
            displayItems();
        };

        }
        
        li.appendChild(deleteButton);
        list.appendChild(li);

        //Заверишть и Восстановить
        let actionButton = document.createElement('button');
        if (item.status === 'active') {
            actionButton.textContent = 'Завершить';
            actionButton.className = 'completeButton';
            actionButton.onclick = function() {
                item.status = 'completed';
                saveItems();
                displayItems();
            };
        } else {
            actionButton.textContent = 'Восстановить';
            actionButton.className = 'restoreButton';
            actionButton.onclick = function() {
                item.status = 'active';
                saveItems();
                displayItems();
            };
        }
        li.appendChild(actionButton);

        list.appendChild(li);
    }
}


function saveItems() {
    localStorage.setItem('items', JSON.stringify(items));
}

function filterItems() {
    let filter = document.getElementById('filter').value;
    for (let i = 0; i < items.length; i++) {
        let item = items[i];
        if (filter === 'all' || item.status === filter) {
            document.getElementById('todoList').children[i].style.display = 'block';
        } else {
            document.getElementById('todoList').children[i].style.display = 'none';
        }
    }
}