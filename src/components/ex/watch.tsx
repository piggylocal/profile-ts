import React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import {Button} from "@mui/material";
import axios from "axios";
import Hls from "hls.js";
import {SyncLog} from "../../dto/ex/watch";

type PlayInfo = {
    M3U8: string;
    time?: Date;
    position?: number;
}

const Watch = () => {
    const [url, setUrl] = React.useState("");
    const [playInfo, setPlayInfo] = React.useState<PlayInfo>({M3U8: ""});
    const ref = React.useRef<HTMLVideoElement>(null);

    async function getM3U8(url: string): Promise<string | null> {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API}/watch/m3u8?url=${url}`);
            if (!response.data.url) {
                console.error("Failed to get m3u8");
                return null;
            }
            return response.data.url;
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    async function handleUrl(url: string) {
        const m3u8 = await getM3U8(url);
        if (m3u8 === null) {
            return;
        }
        setPlayInfo({M3U8: m3u8});
    }

    async function handleShare() {
        if (!ref.current || playInfo.M3U8 === "") {
            return;
        }
        const syncLog = {
            time: Date.now(),
            url,
            position: ref.current.currentTime
        };
        try {
            await axios.post(`${process.env.REACT_APP_API}/watch/syncLog`, syncLog);
        } catch (error) {
            console.error(error);
        }
    }

    async function handleSync() {
        if (!ref.current) {
            return;
        }
        let syncLog: SyncLog | null = null;
        try {
            const response = await axios.get(`${process.env.REACT_APP_API}/watch/syncLog`);
            syncLog = response.data;
        } catch (error) {
            console.error(error);
        }
        if (syncLog === null) {
            return;
        }
        setUrl(syncLog.url);
        const m3u8 = await getM3U8(syncLog.url);
        if (m3u8 === null) {
            return;
        }
        setPlayInfo({M3U8: m3u8, time: new Date(syncLog.time), position: syncLog.position});
    }

    React.useEffect(() => {
        console.log(playInfo);
        if (playInfo.M3U8 === "" || !ref.current) {
            return;
        }
        if (Hls.isSupported()) {
            const hls = new Hls();
            hls.detachMedia();
            hls.loadSource(playInfo.M3U8);
            hls.attachMedia(ref.current);
        } else if (ref.current.canPlayType('application/vnd.apple.mpegurl')) {
            ref.current.src = playInfo.M3U8;
        }
        if (playInfo.time && playInfo.position) {
            console.log((Date.now() - playInfo.time.getTime()) / 1000 + playInfo.position);
            ref.current.currentTime = (Date.now() - playInfo.time.getTime()) / 1000 + playInfo.position;
        }
        void ref.current.play();
    }, [playInfo]);

    return (
        <Box sx={{mt: 2}}>
            <Box>
                <TextField
                    label="url"
                    value={url}
                    onChange={(event) => {setUrl(event.target.value)}}
                    sx={{width: "50%"}}
                ></TextField>
                <Button
                    onClick={() => {void handleUrl(url);}}
                >Go!</Button>
                <Button onClick={() => {void handleShare();}}>Share</Button>
                <Button onClick={() => {void handleSync();}}>Sync</Button>
            </Box>
            <video ref={ref} controls></video>
        </Box>
    )
}

export default Watch;