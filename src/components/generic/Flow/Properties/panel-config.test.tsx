import { dataFeaturesOptions, techFeaturesOptions, securityFeaturesOptions } from './panel-config';

describe('dataFeaturesOptions', () => {
    it('should return an array of objects with a label and options', () => {
        const result = dataFeaturesOptions("test");
        expect(result.length).toBeGreaterThan(0);
        result.forEach((item) => {
            expect(item).toHaveProperty('label');
            expect(item).toHaveProperty('options');
        });
    });
});

describe('techFeaturesOptions', () => {
    it('should return an array of objects with a label and options', () => {
        const result = techFeaturesOptions("test");
        expect(result.length).toBeGreaterThan(0);
        result.forEach((item) => {
            expect(item).toHaveProperty('label');
            expect(item).toHaveProperty('options');
        });
    });
});

describe('securityFeaturesOptions', () => {
    it('should return an array of objects with a label and options', () => {
        const result = securityFeaturesOptions("test");
        expect(result.length).toBeGreaterThan(0);
        result.forEach((item) => {
            expect(item).toHaveProperty('label');
            expect(item).toHaveProperty('options');
        });
    });
});
