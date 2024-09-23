import React, {useEffect} from 'react';
import {Editor, rootCtx} from '@milkdown/kit/core';
import {nord} from '@milkdown/theme-nord';
import {Milkdown, MilkdownProvider, useEditor, useInstance} from '@milkdown/react';
import {commonmark} from '@milkdown/kit/preset/commonmark';
import {editorViewCtx} from '@milkdown/core';

const MilkdownEditor: React.FC = () => {
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
    }, [instance]);
    return <Milkdown/>;
};

export const MilkdownEditorWrapper: React.FC = () => {
    return (
        <MilkdownProvider>
            <MilkdownEditor/>
        </MilkdownProvider>
    );
};