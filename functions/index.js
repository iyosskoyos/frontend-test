// const functions = require('firebase-functions');
const express = require("express")
const cors = require('cors');
var request = require("request");
const stripe = require('stripe')('sk_test_51HYSUxBQ41B1NYWvyvx20KIHhseIdP34vXgqSjQL4JD2hXRV9rqxPt4VGMMtGDWt24KYGkB7ES8QX4Ro89WMP5Ym000BBMs7NZ')
const axios = require('axios')

//API

//app config
const app = express()
axios.defaults.baseURL = 'https://api.rajaongkir.com/starter'
axios.defaults.headers.common['key'] = 'a3e878f5be3f1b86b5aab7573711e746'
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
const port = process.env.PORT || 9000

//Middlewares
app.use(cors())
app.use(express.json())

//API routes
app.get('/', (req, res) => res.status(200).send('helo world'))

// API GET province
app.get('/provinsi', (req, res) => {
    axios.get('/province')
        .then(response => res.json(response.data))
        .catch(err => res.send(err))
})

// API GET city by province_id
app.get('/kota/:provId', (req, res) => {
    const id = req.params.provId
    axios.get(`/city?province=${id}`)
        .then(response => res.json(response.data))
        .catch(err => res.send(err))
})

// API GET all city
app.get('/kota', (req, res) => {
    axios.get(`/city`)
        .then(response => res.json(response.data))
        .catch(err => res.send(err))
})

// API GET costs
app.get('/ongkos/:asal/:tujuan/:berat/:kurir', (req, res) => {
    const param = req.params
    axios.post('/cost', {
        origin: param.asal,
        destination: param.tujuan,
        weight: param.berat,
        courier: param.kurir
    })
        .then(response => res.json(response.data))
        .catch(err => res.send(err))
})

app.post('/payments/create', async (req, res) => {
    const total = req.query.total;
    console.log('payment req received', total);

    const paymentIntent = await stripe.paymentIntents.create({
        amount: total, //subunits of the currency
        currency: "usd"
    })

    res.status(201).send({
        clientSecret: paymentIntent.client_secret
    })
})

// var options = {
//     method: 'GET',
//     url: 'https://api.rajaongkir.com/starter/city',
//     headers: { key: 'a3e878f5be3f1b86b5aab7573711e746' }
// };

// request(options, (error, response, body) => {
//     if (error) throw new Error(error);

//     console.log(body);
// });

//listen command
// exports.api = functions.https.onRequest(app)
app.listen(port, () => console.log(`Listening on localhost:${port}`))

//http://localhost:5001/clone-f44bc/us-central1/api