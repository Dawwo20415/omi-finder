const Iatlas = require('../atlas-interface.js');
const Iapi = require('../api-interface.js');
const Utente = require("../utente-definition.js");

let TIME_OUT = 10000;

describe('/users', function () {
  beforeAll(async () => {
    await Iatlas.atlasConnectionSetup();
  }, TIME_OUT)
  
  afterAll(async () => {
    await Iatlas.disconnect();
  })

  test('POST /v2/userGetStatus/ okay', async () => {
    expect(JSON.stringify(await Iapi.userGetStatus('629ca029ad5cd62c8b3b60d3', Utente)))
      .toBe(JSON.stringify({success:true,message:{"_id":"629ca029ad5cd62c8b3b60d3",idPayment:""}}))
  })

  test('POST /v2/userGetStatus/ error', async () => {
    expect(JSON.stringify(await Iapi.userGetStatus('456', Utente)))
      .toBe(JSON.stringify({success:false,message:"The ID 456 does not exist"}))
  })

  test('POST /v2/login/ wrong password', async () => {
    expect(JSON.stringify(await Iapi.loginUser('finaltest@testingthetests.com', 'test', Utente)))
      .toBe(JSON.stringify({success:false,message:" The password does not match the one on the database "}))
  })

  test('PUT /v2/register/ email format invalid', async () => {
    expect(JSON.stringify(await Iapi.registerNewUser('e382ej3', 'wuhdiquw', 844645, Utente)))
      .toBe(JSON.stringify({success:false,message:" The format for the email address is wrong "}))
  })

  test('PUT /v2/register/ email already registered', async () => {
    expect(JSON.stringify(await Iapi.registerNewUser('lalala@test.com', 'wuhdiquw', 844645, Utente)))
      .toBe(JSON.stringify({success:false,message:" A user with this email address has already registered "}))
  })
})