import {splitStringByComma} from "./noteMetaForm";

it("splits a string by comma", () => {
    const input = "a, b, cc ,  , d";
    const expected = ["a", "b", "cc", "d"];
    expect(splitStringByComma(input)).toEqual(expected);
});