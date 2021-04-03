const BASE_URL = 'http://127.0.0.1:5000/api';

//create HTML for cupcake
function createCupcakeHTML(cupcake) {
    return `
    <div data-cupcake-id=${cupcake.id}>
        <li>
            ${cupcake.flavor} / ${cupcake.size} / ${cupcake.rating}
            <button type="button" id="delete" class="btn btn-danger">Danger</button>
         </li>
         <img style="width:200px; height:200px;" src="${cupcake.image}">
    </div> <br>
    `
}

// display cupcakes on page
async function displayCupcakes() {
    const response = await axios.get(`${BASE_URL}/cupcakes`);

    for(let data of response.data.cupcakes) {
        let newCupcake = $(createCupcakeHTML(data));
        $('#cupcakes-list').append(newCupcake);
    }
}

//handle form
$('form').on('sumbit',async function (e) {
    e.preventDefault();
    let flavor = $('#flavor').val()
    let rating = $('#rating').val()
    let size = $('#size').val()
    let image = $('#img').val()

    const newCupcakeResponse = await axios.post(`${BASE_URL}/cupcakes`,{flavor,rating,size,image});

    let newCupcake = $(createCupcakeHTML(newCupcakeResponse.data.cupcake));
    $('#cupcakes-list').append(newCupcake);
    $('#form').trigger('reset');
})

// handle delete button
$('#cupcakes-list').on('click',"#delete",async function (e) {
    e.preventDefault();
    let $cupcake = $(e.target).closest('div');
    let cupcakeId = $cupcake.attr('data-cupcake-id');

    await axios.delete(`${BASE_URL}/cupcakes/${cupcakeId}`);
    $cupcake.remove();
})


$(displayCupcakes)