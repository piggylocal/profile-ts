import React, {useEffect} from 'react';
import {Editor, rootCtx} from '@milkdown/kit/core';
import {nord} from '@milkdown/theme-nord';
import {Milkdown, MilkdownProvider, useEditor, useInstance} from '@milkdown/react';
import {commonmark} from '@milkdown/kit/preset/commonmark';
import {editorViewCtx} from '@milkdown/core';
import {getMarkdown, replaceAll} from '@milkdown/kit/utils';
import {useLocalStorage} from "@uidotdev/usehooks";

const MilkdownEditor = ({activePanelValue}: {activePanelValue: string}) => {
    const [content, setContent] = useLocalStorage("content", "");

    useEditor((root) =>
        Editor.make()
            .config(nord)
            .config((ctx) => {
                ctx.set(rootCtx, root);
            })
            .use(commonmark),
    );

    const [, getInstance] = useInstance();
    const instance = getInstance();

    useEffect(() => {
        instance?.action((ctx) => {
            const view = ctx.get(editorViewCtx);
            view.focus();
        });
        instance?.action(replaceAll(content));
    }, [instance, content]);
    useEffect(() => {
        if (activePanelValue === "wysiwyg") {
            return;
        }
        instance?.action((ctx) => {
            setContent(getMarkdown()(ctx));
        })
    }, [activePanelValue, instance, setContent]);
    return <Milkdown/>;
};

export const MilkdownEditorWrapper = ({activePanelValue}: {activePanelValue: string}) => {
    return (
        <MilkdownProvider>
            <MilkdownEditor activePanelValue={activePanelValue}/>
        </MilkdownProvider>
    );
};