const Iatlas = require("../atlas-interface.js");
const Iapi = require("../api-interface.js");
const Utente = require("../utente-definition.js");

const TIME_OUT = 10000;

describe("/users", () => {
	beforeAll(async () => {
		await Iatlas.atlasConnectionSetup();
	}, TIME_OUT);

	afterAll(async () => {
		await Iatlas.disconnect();
	});

	// Non utilizzato
	/*
	test("POST /v2/userGetStatus/ okay", async () => {
		expect(JSON.stringify(await Iapi.userGetStatus("629ca029ad5cd62c8b3b60d3", Utente))).toBe(
			JSON.stringify({ success: true, message: { _id: "629ca029ad5cd62c8b3b60d3", idPayment: "" } })
		);
	});

	test("POST /v2/userGetStatus/ error", async () => {
		expect(JSON.stringify(await Iapi.userGetStatus("456", Utente))).toBe(
			JSON.stringify({ success: false, message: "The ID 456 does not exist" })
		);
	});
	*/

	test("POST /v2/login invalid email or username", async () => {
		try {
			await Iapi.loginUser("invalid email", "9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08", Utente);
		} catch (result) {
			expect(result.success).toBeFalsy();
		}
	});

	test("POST /v2/login invalid password", async () => {
		try {
			await Iapi.loginUser("very.original@email.com", "invalid password", Utente);
		} catch (result) {
			expect(result.success).toBeFalsy();
		}
	});

	test("PUT /v2/register invalid username", async () => {
		try {
			await Iapi.registerUser(
				"invalid username",
				"veryoriginalemailthatdoesnotexist@email.com",
				"9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08",
				Utente
			);
		} catch (result) {
			expect(result.success).toBeFalsy();
		}
	});

	test("PUT /v2/register invalid email", async () => {
		try {
			await Iapi.registerUser(
				"UsernameThatDoesNotAlreadyExist",
				"invalid email",
				"9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08",
				Utente
			);
		} catch (result) {
			expect(result.success).toBeFalsy();
		}
	});

	test("PUT /v2/register invalid password", async () => {
		try {
			await Iapi.registerUser(
				"UsernameThatDoesNotAlreadyExist",
				"89N3PDyZzakoH7W6n8ZrjGDDktjh8iWFG6eKRvi3kvpQ",
				"invalid password",
				Utente
			);
		} catch (result) {
			expect(result.success).toBeFalsy();
		}
	});
});
