import { describe, it, expect } from "vitest";
import { processPortServiceData } from "../api";

describe("processPortServiceData", () => {
    it("should handle valid vessel data with complete dates", () => {
        const mockData = {
            "Container Vessel Activity Records": [
                [
                    "Vessel1",
                    "IMO1",
                    "MMSI1",
                    "Type1",
                    150,
                    "PP",
                    "2024-03-01T00:00:00Z",
                    "2024-03-01T02:00:00Z",
                    "2024-03-01T10:00:00Z",
                    "2024-03-01T12:00:00Z",
                ],
                [
                    "Vessel2",
                    "IMO2",
                    "MMSI2",
                    "Type2",
                    200,
                    "F2",
                    "2024-03-02T00:00:00Z",
                    "2024-03-02T02:00:00Z",
                    "2024-03-02T10:00:00Z",
                    "2024-03-02T12:00:00Z",
                ],
            ],
        };

        const result = processPortServiceData(mockData);
        expect(result.startDate).toBe("2024-03-01T00:00:00.000Z");
        expect(result.endDate).toBe("2024-03-02T12:00:00.000Z");
    });

    it("should handle vessel data with partial dates", () => {
        const mockData = {
            "Container Vessel Activity Records": [
                [
                    "Vessel1",
                    "IMO1",
                    "MMSI1",
                    "Type1",
                    150,
                    "PP",
                    "unavailable",
                    "2024-03-01T02:00:00Z",
                    "unavailable",
                    "unavailable",
                ],
                [
                    "Vessel2",
                    "IMO2",
                    "MMSI2",
                    "Type2",
                    200,
                    "F2",
                    "unavailable",
                    "unavailable",
                    "2024-03-02T10:00:00Z",
                    "unavailable",
                ],
            ],
        };

        const result = processPortServiceData(mockData);
        expect(result.startDate).toBe("2024-03-01T02:00:00.000Z");
        expect(result.endDate).toBe("2024-03-02T10:00:00.000Z");
    });

    it("should handle vessel data with single valid date", () => {
        const mockData = {
            "Container Vessel Activity Records": [
                [
                    "Vessel1",
                    "IMO1",
                    "MMSI1",
                    "Type1",
                    150,
                    "PP",
                    "unavailable",
                    "2024-03-01T02:00:00Z",
                    "unavailable",
                    "unavailable",
                ],
                [
                    "Vessel2",
                    "IMO2",
                    "MMSI2",
                    "Type2",
                    200,
                    "F2",
                    "unavailable",
                    "unavailable",
                    "unavailable",
                    "unavailable",
                ],
            ],
        };

        const result = processPortServiceData(mockData);
        expect(result.startDate).toBe("2024-03-01T02:00:00.000Z");
        expect(result.endDate).toBe("2024-03-01T02:00:00.000Z");
    });

    it("should handle invalid dates", () => {
        const mockData = {
            "Container Vessel Activity Records": [
                [
                    "Vessel1",
                    "IMO1",
                    "MMSI1",
                    "Type1",
                    150,
                    "PP",
                    "invalid-date",
                    "also-invalid",
                    "not-a-date",
                    "wrong",
                ],
                [
                    "Vessel2",
                    "IMO2",
                    "MMSI2",
                    "Type2",
                    200,
                    "F2",
                    "unavailable",
                    "unavailable",
                    "unavailable",
                    "unavailable",
                ],
            ],
        };

        const result = processPortServiceData(mockData);
        expect(result.startDate).not.toBe("invalid-date");
        expect(new Date(result.startDate)).toBeInstanceOf(Date);
        expect(new Date(result.endDate)).toBeInstanceOf(Date);
    });

    it("should handle empty vessel data", () => {
        const mockData = {
            "Container Vessel Activity Records": [],
        };

        const result = processPortServiceData(mockData);
        expect(new Date(result.startDate)).toBeInstanceOf(Date);
        expect(new Date(result.endDate)).toBeInstanceOf(Date);
        expect(result["All vessels"].TotalBerthed).toBe(0);
    });

    it("should handle null or undefined dates", () => {
        const mockData = {
            "Container Vessel Activity Records": [
                [
                    "Vessel1",
                    "IMO1",
                    "MMSI1",
                    "Type1",
                    150,
                    "PP",
                    null,
                    undefined,
                    "2024-03-01T10:00:00Z",
                    "unavailable",
                ],
            ],
        };

        const result = processPortServiceData(mockData);
        expect(result.startDate).toBe("2024-03-01T10:00:00.000Z");
        expect(result.endDate).toBe("2024-03-01T10:00:00.000Z");
    });

    it("should validate date ranges across all timestamps", () => {
        const mockData = {
            "Container Vessel Activity Records": [
                // Earlier ATA but later ATD
                [
                    "Vessel1",
                    "IMO1",
                    "MMSI1",
                    "Type1",
                    150,
                    "PP",
                    "2024-03-01T00:00:00Z",
                    "2024-03-02T00:00:00Z",
                    "2024-03-03T00:00:00Z",
                    "2024-03-04T00:00:00Z",
                ],
                // Later ATA but earlier ATD
                [
                    "Vessel2",
                    "IMO2",
                    "MMSI2",
                    "Type2",
                    200,
                    "F2",
                    "2024-03-02T00:00:00Z",
                    "2024-03-02T12:00:00Z",
                    "2024-03-03T12:00:00Z",
                    "2024-03-03T00:00:00Z",
                ],
            ],
        };

        const result = processPortServiceData(mockData);
        expect(result.startDate).toBe("2024-03-01T00:00:00.000Z"); // Should take earliest ATA
        expect(result.endDate).toBe("2024-03-04T00:00:00.000Z"); // Should take latest ATD
    });
});
