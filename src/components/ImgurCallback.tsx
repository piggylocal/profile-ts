import {useEffect} from "react";
import {jwtDecode} from "jwt-decode";
import * as t from "io-ts";
import {isLeft} from "fp-ts/Either";
import StatusCodes from "http-status-codes";
import axios from "axios";
import {useNavigate} from "react-router-dom";

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

    const navigate = useNavigate();

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
        async function onLoaded() {
            const navigateTarget = `${window.location.pathname}/../..`;
            const state = getState();
            if (!state) {
                console.error("No state found");
                navigate(navigateTarget);
                return;
            }
            // If the origin is different, redirect to the origin.
            // We don't verify the state before redirect. If the origin is different from current location,
            // it is likely that the user is different so that the verification won't succeed.
            if (state.origin && state.origin !== window.location.origin) {
                window.location.replace(
                    `${state.origin}/admin/imgur/callback` + window.location.search + window.location.hash
                );
                return;
            }

            // If there is no hash, redirect to the origin.
            if (!window.location.hash) {
                console.error("No hash found");
                navigate(navigateTarget);
                return;
            }

            // Now the origin is the same as the current location. We can verify the state.
            try {
                const response = await axios.post(
                    `${process.env.REACT_APP_API}/auth/state`,
                    new URLSearchParams(window.location.search.substring(1))
                );
                if (response.status !== StatusCodes.OK) {
                    console.error("Failed to verify state");
                    navigate(navigateTarget);
                    return;
                }
            } catch (error) {
                console.error(error);
                navigate(navigateTarget);
                return;
            }

            // Now the state is verified. Update the server with the new token.
            try {
                const response = await axios.put(
                    `${process.env.REACT_APP_API}/auth/imgur/credentials`,
                    new URLSearchParams(window.location.hash.substring(1))
                );
                if (response.status !== StatusCodes.OK) {
                    console.error("Failed to update credentials");
                    navigate(navigateTarget);
                    return;
                }
                navigate(navigateTarget);
            } catch (error) {
                console.error(error);
                navigate(navigateTarget);
            }
        }

        void onLoaded();
    });

    return (
        <></>
    )
};

export default ImgurCallback;