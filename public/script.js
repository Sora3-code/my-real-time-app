//----------------------------------------------------------------------------

let socket = io('https://my-real-time-app.onrender.com'); //my Render app URL. 
let currentUser = sessionStorage.getItem('loggedInUser') || 'guest';
//----------------------------------------------------------------------------

let globalCount = document.querySelector('#globalCount');
let acquireButton = document.querySelector('#acquireButton');
let lastAcquiredModal = document.querySelector('#lastAcquiredModal');
let myCollectionList = document.querySelector('#myCollectionList');
//----------------------------------------------------------------------------

acquireButton.addEventListener('click', () => {
    console.log('next modal request...');
    socket.emit('requestModal', currentUser);
    acquireButton.disabled = true;
});
//----------------------------------------------------------------------------

socket.on('modalAcquired', (modal) => {
    console.log('Get modal.', modal);
    lastAcquiredModal.innerHTML = `<img src="${modal.image}" width="150"><p>${modal.text}</p>`;
    let collectionItem = document.createElement('div');
    collectionItem.innerHTML = `<img src="${modal.image}" width="50"><span>${modal.text}</span>`;
    myCollectionList.appendChild(collectionItem);
    let myCollection = JSON.parse(localStorage.getItem(`collection_${currentUser}`)) || [];
    myCollection.push(modal);
    localStorage.setItem(`collection_${currentUser}`, JSON.stringify(myCollection));
});
//----------------------------------------------------------------------------

socket.on('updateGlobalCount', (count) => {
    console.log(`the rest of modal, ${count} update.`);
    globalCount.textContent = count;
    if(count > 0) {
        acquireButton.disabled = false;
    } else {
        acquireButton.textContent = 'modal is End.';
    }
});
//----------------------------------------------------------------------------

socket.on('noModalLeft', () => {
    alert('sorry, modal is nothing');
    acquireButton.textContent = 'modal is End.';
    acquireButton.disabled = true;
});
//----------------------------------------------------------------------------
