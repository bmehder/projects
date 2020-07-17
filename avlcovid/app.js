const businessList = document.querySelector('#business-list');
const form = document.querySelector('#add-business-form');

//create elements and render business
function renderBusiness(doc) {
  let li = document.createElement('li');
  let name = document.createElement('span');
  let city = document.createElement('span');
  // let state = document.createElement('span');
  // let cross = document.createElement('div');

  li.setAttribute('data-id', doc.id);
  name.textContent = doc.data().name;
  city.textContent = doc.data().city;
  // state.textContent = doc.data().state;
  // cross.textContent = 'x';

  li.appendChild(name);
  li.appendChild(city);
  // li.appendChild(state);
  // li.appendChild(cross);

  businessList.appendChild(li);

  //deleting data
  // cross.addEventListener('click', (e) => {
  //   e.stopPropagation();
  //   let id = e.target.parentElement.getAttribute('data-id');
  //   db.collection('businesses').doc(id).delete();
  // });
}

//getting data
// db.collection('businesses')
//   .where('city', '==', 'London')
//   // .orderBy('city')
//   .get()
//   .then((snapshot) => {
//     snapshot.docs.forEach((doc) => {
//       renderBusiness(doc);
//     });
//   });

//Saving data
form.addEventListener('submit', (e) => {
  e.preventDefault();

  db.collection('businesses').add({
    name: form.name.value,
    city: form.city.value,
    state: 'NC',
  });
  form.name.value = '';
  form.city.value = '';
  // form.state.value = '';
});

//getting real-time data
db.collection('businesses')
  .orderBy('name')
  .onSnapshot((snapshot) => {
    let changes = snapshot.docChanges();
    changes.forEach((change) => {
      if (change.type === 'added') {
        renderBusiness(change.doc);
      } else if (change.type === 'removed') {
        let li = businessList.querySelector('[data-id=' + change.doc.id + ']');
        cafeList.removeChild(li);
      }
    });
  });
