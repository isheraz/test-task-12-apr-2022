import supertest from 'supertest';
import app from './index'

describe('POST /patient/add', () => {

    describe("Added a new Pet!", () => {
        test('Should respond with patient added!', async () => {
            await supertest(app).post("/patient/add").send({
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
                expect(res.statusCode).toBe(200)
            })

        })      
    })

})

describe('GET /patient', () => {

    describe("Gets all the patients", () => {
        test('Should respond with JSON body!', async () => {
            const response = await supertest(app).get("/patient").send();
            expect(response.statusCode).toBe(200)
        })      
    })

})

describe('PATCH /patient/:id', () => {

    describe("Updates the patient detials!", () => {
        test('Should respond with JSON body!', async () => {
            const response = await supertest(app).patch("/patient/62580302ab1a4c49559427d4").send({
                "ownerName": "ownerNameChanged",
            });
            expect(response.statusCode).toBe(200)
        })      
    })

})

describe('DELETE /patient/:id', () => {

    describe("Deletes the patient detials!", () => {
        test('Should respond with Deletion Message', async () => {
            const response = await supertest(app).delete("/patient/62580302ab1a4c49559427d4").send();
            expect(response.statusCode).toBe(200)
        })      
    })

})

describe('POST /patient/:id/appointment', () => {

    describe("Add an appoinment to an existing Patient!", () => {
        test('Should Update the patient\'s appointment array!', async () => {
            const response = await supertest(app).post("/patient/62580302ab1a4c49559427d4/appointment").send([{
                "startTime": "startTime",
                "endTime": "endTime",
                "description": "description",
                "feePaid": false
            }]);
            expect(response.statusCode).toBe(200)
        })      
    })

})

describe('GET /patient/:id/appointment', () => {
    
    describe("Get A Specific Patient's Appointment", () => {
        test('Should Send back a JSON format of the specific patient\'s appointment array!', async () => {
            const response = await supertest(app).get("/patient/6258033ed720beac5fb8e068/appointment").send();
            expect(response.statusCode).toBe(200)
        })      
    })

})

describe('PATCH /patient/:id/appointment', () => {
    
    describe("Update Specific Patient's Appointment", () => {
        test('Should Send back a JSON format of the appointment array!', async () => {
            const response = await supertest(app).patch("/patient/6258033ed720beac5fb8e068/appointment").send();
            expect(response.statusCode).toBe(200)
        })      
    })

})

//Passing
describe('DELETE /patient/:id/appointment', () => {
    
    describe("Delete Specific Patient's Appointment", () => {
        test('Should Delete The JSON Content', async () => {
            const response = await supertest(app).delete("/patient/6258033ed720beac5fb8e068/appointment").send();
            expect(response.statusCode).toBe(200)
        })      
    })

})

describe('GET /appointment/:date/:month/:year', () => {

    describe("Get Specific Patient's Appointment Via Date!", () => {
        test('Should Show The JSON Content (if Any!)', async () => {
            const response = await supertest(app).get("/appointment/12/11/2002").send();
            expect(response.statusCode).toBe(200) 
        })      
    })
    
})

describe('GET /appointment/unpaid', () => {

    describe("Get Specific Patient's Appointment Via Paid Status!", () => {
        test('Should Show The JSON Content (if Any!)', async () => {
            const response = await supertest(app).get("/appointment/unpaid").send();
            expect(response.statusCode).toBe(200) 
        })      
    })
    
})

describe('GET /patient/:id/remains', () => {

    describe("Get Specific Patient's Appointment Via Remains Status!", () => {
        test('Should Show The JSON Content (if Any!)', async () => {
            const response = await supertest(app).get("/patient/6258033ed720beac5fb8e068/remains").send();
            expect(response.statusCode).toBe(200) 
        })      
    })
    
})
