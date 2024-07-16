import {describe, it} from "@jest/globals";
import app from "../../src/app";
import * as request from "supertest";

describe("App API", () => {
    describe("Not found", () => {
        it("should return a 404 when a non existing path is requested", () => {
            request(app)
                .get('/noexistingpath')
                .expect(404);
        });
    });
});

