"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const index_1 = __importDefault(require("./index"));
describe('POST /patient/add', () => {
    describe("Added a new Pet!", () => {
        test('Should respond with patient added!', () => __awaiter(void 0, void 0, void 0, function* () {
            yield (0, supertest_1.default)(index_1.default).post("/patient/add").send({
                "petName": "petName",
                "petType": "petType",
                "ownerName": "ownerName",
                "ownerAddress": "ownerAddress",
                "ownerPhoneNumber": 111111,
                "appointment": [{
                        "startTime": "startTime",
                        "endTime": "endTime",
                        "description": "description",
                        "feePaid": false
                    }]
            })
                .then((res) => {
                expect(res.statusCode).toBe(200);
            });
        }));
    });
});
describe('GET /patient', () => {
    describe("Gets all the patients", () => {
        test('Should respond with JSON body!', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(index_1.default).get("/patient").send();
            expect(response.statusCode).toBe(200);
        }));
    });
});
describe('PATCH /patient/:id', () => {
    describe("Updates the patient detials!", () => {
        test('Should respond with JSON body!', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(index_1.default).patch("/patient/62580302ab1a4c49559427d4").send({
                "ownerName": "ownerNameChanged",
            });
            expect(response.statusCode).toBe(200);
        }));
    });
});
describe('DELETE /patient/:id', () => {
    describe("Deletes the patient detials!", () => {
        test('Should respond with Deletion Message', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(index_1.default).delete("/patient/62580302ab1a4c49559427d4").send();
            expect(response.statusCode).toBe(200);
        }));
    });
});
describe('POST /patient/:id/appointment', () => {
    describe("Add an appoinment to an existing Patient!", () => {
        test('Should Update the patient\'s appointment array!', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(index_1.default).post("/patient/62580302ab1a4c49559427d4/appointment").send([{
                    "startTime": "startTime",
                    "endTime": "endTime",
                    "description": "description",
                    "feePaid": false
                }]);
            expect(response.statusCode).toBe(200);
        }));
    });
});
describe('GET /patient/:id/appointment', () => {
    describe("Get A Specific Patient's Appointment", () => {
        test('Should Send back a JSON format of the specific patient\'s appointment array!', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(index_1.default).get("/patient/6258033ed720beac5fb8e068/appointment").send();
            expect(response.statusCode).toBe(200);
        }));
    });
});
describe('PATCH /patient/:id/appointment', () => {
    describe("Update Specific Patient's Appointment", () => {
        test('Should Send back a JSON format of the appointment array!', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(index_1.default).patch("/patient/6258033ed720beac5fb8e068/appointment").send();
            expect(response.statusCode).toBe(200);
        }));
    });
});
//Passing
describe('DELETE /patient/:id/appointment', () => {
    describe("Delete Specific Patient's Appointment", () => {
        test('Should Delete The JSON Content', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(index_1.default).delete("/patient/6258033ed720beac5fb8e068/appointment").send();
            expect(response.statusCode).toBe(200);
        }));
    });
});
describe('GET /appointment/:date/:month/:year', () => {
    describe("Get Specific Patient's Appointment Via Date!", () => {
        test('Should Show The JSON Content (if Any!)', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(index_1.default).get("/appointment/12/11/2002").send();
            expect(response.statusCode).toBe(200);
        }));
    });
});
describe('GET /appointment/unpaid', () => {
    describe("Get Specific Patient's Appointment Via Paid Status!", () => {
        test('Should Show The JSON Content (if Any!)', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(index_1.default).get("/appointment/unpaid").send();
            expect(response.statusCode).toBe(200);
        }));
    });
});
describe('GET /patient/:id/remains', () => {
    describe("Get Specific Patient's Appointment Via Remains Status!", () => {
        test('Should Show The JSON Content (if Any!)', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(index_1.default).get("/patient/6258033ed720beac5fb8e068/remains").send();
            expect(response.statusCode).toBe(200);
        }));
    });
});
