

const basket_greatest = document.getElementById('basket_greatesrt_div');
let isTrue=false;
const img_basket = document.querySelector('.img_basket');

img_basket.addEventListener('click',()=>{
    isTrue=!isTrue;
    if(isTrue===true){
        basket_greatest.style.display='flex';

    };
    if(isTrue===false){
        basket_greatest.style.display='none';

    }
})
const nameInput = document.getElementById('name');


const numberInput = document.getElementById('number');
const carInput = document.getElementById('car');
const all_elements = document.getElementById('all_elements');

function newProductList() {
    event.preventDefault();

    let obj = {
        name: nameInput.value,
        number: numberInput.value,
        car: carInput.value
    };

    axios.post('http://192.168.0.104:3000/admins', obj, {
        headers: {
            'Content-type': 'application/json'
        }
    })
    .then(response => {
        if (response.status !== 200 && response.status !== 201) {
            throw new Error('Error Response');
        }
        newUsersListS(); // Refresh the list after adding a new user
    })
    .catch(error => console.error(error));
}


function newUsersListS() {
    axios.get('http://192.168.0.104:3000/admins')  
    .then(response2 => {
        const data_get = response2.data;

        // Clear the previous content before reloading
        all_elements.innerHTML = '';

        const users = data_get.filter(user => user.name === 'Nigar' || user.car === 'Changan');
        users.forEach(user => {
            const user_Div = document.createElement('div');

            const p_input = document.createElement('p');
            p_input.textContent = user.name;

            const number_input = document.createElement('p');
            number_input.textContent = user.number;

            const car_input = document.createElement('p');
            car_input.textContent = user.car;
            const basket_icon = document.createElement('img');
            basket_icon.src='file:///C:/Users/ASUS/Downloads/2849824_store_shopping_market_buy_shop_icon.svg'
            basket_icon.addEventListener('click', ()=>{

                axios.post('http://192.168.0.104:3000/basket', user, {
                    headers: {
                        'Content-type': 'application/json'
                    }
                })
                .then(response => {
                    if (response.status !== 200 && response.status !== 201) {
                        throw new Error('Error Response');
                    }                    
                })
                .catch(error => console.error(error));
                 newBasketUser();
                
                
            })
            const delete_Button = document.createElement('button');
            delete_Button.textContent = "Delete";
            delete_Button.addEventListener('click', () => {
                axios.delete(`http://192.168.0.104:3000/admins/${user.id}`)
                .then(response => {
                    newUsersListS(); // Refresh the list after deleting a user
                })
                .catch(error => console.error(error));
            });

            user_Div.append(p_input, number_input, car_input,basket_icon ,  delete_Button);
            all_elements.append(user_Div);
        });
    })
    .catch(error => console.error(error));
}

       
function newBasketUser(){
    axios.get('http://192.168.0.104:3000/basket')
    .then(response =>{
    const data_post_basket = response.data;
    const basket_map =data_post_basket;
    basket_greatest.innerHTML = '';

    basket_map.forEach(user_basket=>{
        const basket_div = document.createElement('div');
        const p_input_basket = document.createElement('p');
        p_input_basket.textContent = user_basket.name;
        const p_input_number = document.createElement('p');
        p_input_number.textContent = user_basket.number;
        const p_input_car = document.createElement('p');
        p_input_car.textContent = user_basket.car;
        const delete_button_basket = document.createElement('button');
        delete_button_basket.innerText = 'Delete';
        delete_button_basket.addEventListener('click',()=>{
            axios.delete(`http://192.168.0.104:3000/basket/${user_basket.id}`)
            .then(response=>{
                newBasketUser();
            })
        })
        basket_div.append(p_input_basket,p_input_number,p_input_car,delete_button_basket)
        basket_greatest.append(basket_div);

    })
    

    })
}
newBasketUser();
// Call this function to load the users initially
newUsersListS();
