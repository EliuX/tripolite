import {describe, it} from "@jest/globals";
import app from "../../src/app";
import * as request from "supertest";
import {apiRoutes} from "../../src/routes";

describe("App API", () => {

    it(`should return a 200 in the base path (${apiRoutes.baseUrl})`, async() => {
        return request(app)
            .get(apiRoutes.baseUrl)
            .expect(200);
    });

    it("should return a 404 when a non existing path is requested", async() => {
        return request(app)
            .get('/noexistingpath')
            .expect(404);
    });
});

