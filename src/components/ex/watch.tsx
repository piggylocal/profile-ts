import React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import {Button, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent} from "@mui/material";
import axios from "axios";
import Hls from "hls.js";

import {M3U8Mapping, SyncLog} from "../../dto/ex/watch";

type PlayInfo = {
    M3U8: string;
    time?: Date;
    position?: number;
}

const Watch = () => {
    const [title, setTitle] = React.useState("");
    const [episode, setEpisode] = React.useState(1);
    const [distinctTitles, setDistinctTitles] = React.useState<string[]>([]);
    const [url, setUrl] = React.useState("");
    const [playInfo, setPlayInfo] = React.useState<PlayInfo>({M3U8: ""});
    const ref = React.useRef<HTMLVideoElement>(null);
    const allMappingsRef = React.useRef(new Map<string, M3U8Mapping>());

    function getMappingKey(title: string, episode: number): string {
        return `${title} ${episode}`;
    }

    const handleTitleChange = (event: SelectChangeEvent) => {
        setTitle(event.target.value as string);
    };

    function getM3U8(url: string): string | null {
        for (const mapping of allMappingsRef.current.values()) {
            if (mapping.url === url) {
                return mapping.m3u8Url;
            }
        }
        return null;
    }

    function getTitleAndEpisode(url: string): [string, number] | null {
        for (const mapping of allMappingsRef.current.values()) {
            if (mapping.url === url) {
                return [mapping.title, mapping.episode];
            }
        }
        return null;
    }

    function handleUrl(url: string) {
        const m3u8 = getM3U8(url);
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
        const newTitleAndEpisode = getTitleAndEpisode(syncLog.url);
        if (newTitleAndEpisode === null) {
            // Although this seems not right, we still set the url.
            setUrl(syncLog.url);
        } else {
            setTitle(newTitleAndEpisode[0]);
            setEpisode(newTitleAndEpisode[1]);
        }
        const m3u8 = getM3U8(syncLog.url);
        if (m3u8 === null) {
            return;
        }
        setPlayInfo({M3U8: m3u8, time: new Date(syncLog.time), position: syncLog.position});
    }

    React.useEffect(() => {
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
            ref.current.currentTime = (Date.now() - playInfo.time.getTime()) / 1000 + playInfo.position;
        }
        void ref.current.play();
    }, [playInfo]);

    React.useEffect(() => {
        async function loadAllMappings() {
            if (allMappingsRef.current.size > 0) {
                return;
            }
            try {
                const response = await axios.get(`${process.env.REACT_APP_API}/watch/m3u8/all`);
                const mappings: M3U8Mapping[] = response.data;
                mappings.forEach((mapping) => {
                    allMappingsRef.current.set(getMappingKey(mapping.title, mapping.episode), mapping);
                });
                const newDistinctTitles = [...new Set(mappings.map((mapping) => mapping.title))].sort();
                setDistinctTitles(newDistinctTitles);
                if (newDistinctTitles.length === 0) {
                    return;
                }
                setTitle(newDistinctTitles[0]);
            } catch (error) {
                console.error(error);
            }
        }

        void loadAllMappings();
    }, []);

    React.useEffect(() => {
        setUrl(allMappingsRef.current.get(getMappingKey(title, episode))?.url || "");
    }, [title, episode]);

    return (
        <Box sx={{mt: 2}}>
            <Box sx={{margin: 2}}>
                <TextField
                    label="URL"
                    value={url}
                    onChange={(event) => {
                        setUrl(event.target.value)
                    }}
                    sx={{width: "70%"}}
                ></TextField>
            </Box>
            <Box sx={{margin: 2}}>
                <FormControl sx={{minWidth: 200, marginRight: 2}}>
                    <InputLabel id="watch-title-select-label">Title</InputLabel>
                    <Select
                        labelId="watch-title-select-label"
                        value={title}
                        label="Title"
                        onChange={handleTitleChange}
                        variant="outlined"
                    >
                        {distinctTitles.map((title, index) => (
                            <MenuItem key={index} value={title}>{title}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <TextField
                    label="Episode"
                    value={episode}
                    type="number"
                    sx={{width: 100}}
                    onChange={(event) => {
                        setEpisode(parseInt(event.target.value));
                    }}
                />
                <Button
                    onClick={() => handleUrl(url)}
                >Go!</Button>
                <Button onClick={() => {
                    void handleShare();
                }}>Share</Button>
                <Button onClick={() => {
                    void handleSync();
                }}>Sync</Button>
            </Box>
            <Box sx={{margin: 2}}>
                <video ref={ref} controls></video>
            </Box>
        </Box>
    )
}

export default Watch;