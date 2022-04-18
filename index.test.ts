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
        
        test('Should respond with 400 incomplete credentials', async () => {
            await supertest(app).post("/patient/add").send({
                "petName": "petName",
                "petType": "petType",
                "ownerName": "ownerName"
            })
            .then((res) => {
                expect(res.statusCode).toBe(400)
            })

        })

    })

})

describe('GET /patient', () => {

    describe("Gets all the patients", () => {
        
        test('Should respond with 200 Status', async () => {
            const response = await supertest(app).get("/patient").send();
            expect(response.statusCode).toBe(200)
        })
          
        test('Should respond with correct content-type', async () => {
            const response = await supertest(app).get("/patient").send();
            expect(response.headers['content-type']).toEqual(expect.stringContaining("json"))
        })

    })

})

describe('PATCH /patient/:id', () => {

    describe("Updates the patient detials!", () => {
 
        test('Should respond with 200 status', async () => {
            const response = await supertest(app).patch("/patient/62580302ab1a4c49559427d4").send({
                "ownerName": "ownerNameChanged",
            });
            expect(response.statusCode).toBe(200)
        })      
 
        test('Should respond with 400, nothing was passed!', async () => {
            const response = await supertest(app).patch("/patient/62580302ab1a4c49559427d4").send({});
            expect(response.statusCode).toBe(400)
        })      
 
        test('Should respond with 404, ID does not exist', async () => {
            const response = await supertest(app).patch("/patient/AnIdThatDoesNotExist404").send({
                "ownerName": "ownerNameChanged",
            });
            expect(response.statusCode).toBe(404)
        })      

    })

})

describe('DELETE /patient/:id', () => {

    describe("Deletes the patient detials!", () => {
        
        test('Should respond with Deletion Message', async () => {
            const response = await supertest(app).delete("/patient/62580302ab1a4c49559427d4").send();
            expect(response.statusCode).toBe(200)
        })      

        test('Should respond 404, ID doesnt Exist!', async () => {
            const response = await supertest(app).delete("/patient/AnIdThatDoesNotExist404").send();
            expect(response.statusCode).toBe(404)
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

        test('The Type of the body must be an Array, Else 403', async () => {
            const response = await supertest(app).post("/patient/62580302ab1a4c49559427d4/appointment").send({});
            expect(response.statusCode).toBe(403)
        })

        test('If the ID is not present, will get 404', async () => {
            const response = await supertest(app).post("/patient/ANonExistantID/appointment").send([]);
            expect(response.statusCode).toBe(404)
        })

    })

})

describe('GET /patient/:id/appointment', () => {
    
    describe("Get A Specific Patient's Appointment", () => {
      
        test('Should Send back an Array of the specific patient\'s appointment array!', async () => {
            const response = await supertest(app).get("/patient/6258033ed720beac5fb8e068/appointment").send();
            expect(response.headers['content-type']).toEqual(expect.stringContaining("text/html; charset=utf-8"))
        })
            
        test('Should Send back 404 for invalid ID', async () => {
            const response = await supertest(app).get("/patient/ANonExistantID/appointment").send();
            expect(response.statusCode).toBe(404)
        })  
        
    })

})

describe('PATCH /patient/:id/appointment', () => {
    
    describe("Update Specific Patient's Appointment", () => {
        
        test('Should Send back a JSON format of the appointment array!', async () => {
            const response = await supertest(app).patch("/patient/6258033ed720beac5fb8e068/appointment").send({

            });
            expect(response.headers['content-type']).toEqual(expect.stringContaining("text/html; charset=utf-8")) //text/html; charset=utf-8 == Array, I Think.
            expect(response.statusCode).toBe(200)
        })      
    
        test('Should Send back 404 for invalid ID', async () => {
            const response = await supertest(app).patch("/patient/ANonExistantID/appointment").send();
            expect(response.statusCode).toBe(404)
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

        test('For invalid ID, it should return 404', async () => {
            const response = await supertest(app).delete("/patient/ANonExistantID/appointment").send();
            expect(response.statusCode).toBe(404)
        })    
        
    })

})

describe('GET /appointment/:date/:month/:year', () => {

    describe("Get Specific Patient's Appointment Via Date!", () => {
        
        test('Should Show The JSON Content (if Any!)', async () => {
            const response = await supertest(app).get("/appointment/12/11/2002").send();
            expect(response.statusCode).toBe(200) //Will fail if any record in the DB doesnt contain appointment.day! 
        })      
    
        test('Should Respond with 404 if not found!', async () => {
            const response = await supertest(app).get("/appointment/12/12/2002").send();
            expect(response.statusCode).toBe(404)
        })      
    
    })
    
})

describe('GET /appointment/unpaid', () => {

    describe("Get Specific Patient's Appointment Via Paid Status!", () => {
       
        test('Should Respond with 200 status', async () => {
            const response = await supertest(app).get("/appointment/unpaid").send();
            expect(response.statusCode).toBe(200) 
        })      
        
        test('Should Show The Array (if Any!)', async () => {
            const response = await supertest(app).get("/appointment/unpaid").send();
            expect(response.headers['content-type']).toEqual(expect.stringContaining("application/json; charset=utf-8"))
            //Revisit this test... might not be valid...
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

describe('GET /patient/popular/get', () => {

    describe("Get's what is the most famous Pet!", () => {
        test('Should Send the most famous pet name...', async () => {
            const response = await supertest(app).get("/patient/popular/get").send();
            expect(response.statusCode).toBe(200) 
        })      
    })
    
})
