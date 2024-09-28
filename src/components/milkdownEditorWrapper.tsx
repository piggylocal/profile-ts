import React, {useEffect} from 'react';
import {Editor, rootCtx} from '@milkdown/kit/core';
import {nord} from '@milkdown/theme-nord';
import {Milkdown, MilkdownProvider, useEditor, useInstance} from '@milkdown/react';
import {commonmark} from '@milkdown/kit/preset/commonmark';
import {editorViewCtx} from '@milkdown/core';
import {getMarkdown, replaceAll} from '@milkdown/kit/utils';

import {EditorTarget} from "../configs/note";

const MilkdownEditor = ({target, content, setContent, editorValue, setEditorValue}: {
    target: EditorTarget,
    content: string,
    setContent: React.Dispatch<React.SetStateAction<string>>,
    editorValue: EditorTarget,
    setEditorValue: React.Dispatch<React.SetStateAction<EditorTarget>>,
}) => {
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
        if (!instance) {
            return;
        }
        if (editorValue === EditorTarget.WYSIWYG) {
            instance.action((ctx) => {
                const view = ctx.get(editorViewCtx);
                view.focus();
            });
        }
        if (target === EditorTarget.WYSIWYG && editorValue === EditorTarget.WYSIWYG) {
            return;
        }
        if (target === EditorTarget.WYSIWYG) {
            instance.action(replaceAll(content));
            return;
        }
        if (editorValue === EditorTarget.WYSIWYG) {
            instance.action((ctx) => {
                const newContent = getMarkdown()(ctx);
                if (newContent !== content) {
                    setContent(newContent);
                    return;
                }
                if (target === EditorTarget.MARKDOWN) {
                    setEditorValue(EditorTarget.MARKDOWN);
                }
            });
        }
    }, [instance, target, content, setContent, editorValue, setEditorValue]);
    return <Milkdown/>;
};

export const MilkdownEditorWrapper = ({target, content, setContent, editorValue, setEditorValue}: {
    target: EditorTarget,
    content: string,
    setContent: React.Dispatch<React.SetStateAction<string>>,
    editorValue: EditorTarget,
    setEditorValue: React.Dispatch<React.SetStateAction<EditorTarget>>,
}) => {
    return (
        <MilkdownProvider>
            <MilkdownEditor
                target={target}
                content={content}
                setContent={setContent}
                editorValue={editorValue}
                setEditorValue={setEditorValue}
            />
        </MilkdownProvider>
    );
};