import {useEffect} from "react";
import {jwtDecode} from "jwt-decode";
import * as t from "io-ts";
import {isLeft} from "fp-ts/Either";

const StateCodec = t.intersection([
    t.type({
        username: t.string,
        id: t.string,
    }),
    t.partial({
        origin: t.string,
    }),
]);

type State = t.TypeOf<typeof StateCodec>;

const ImgurCallback = () => {

    function getState(): State | undefined {
        const urlParams = new URLSearchParams(window.location.search.substring(1));
        const stateParam = urlParams.get("state");
        if (!stateParam) {
            return undefined;
        }
        const stateUnknown = jwtDecode(stateParam);
        const decodedState = StateCodec.decode(stateUnknown);
        if (isLeft(decodedState)) {
            console.error("Failed to decode state");
            return undefined;
        }
        return decodedState.right;
    }

    useEffect(() => {
        const state = getState();
        if (!state) {
            console.error("No state found");
            return;
        }
        if (state.origin && state.origin !== window.location.origin) {
            window.location.replace(
                `${state.origin}/admin/imgur/callback` + window.location.search + window.location.hash
            );
        }
    });

    return (
        <></>
    )
};

export default ImgurCallback;