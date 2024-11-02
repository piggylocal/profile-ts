import React, {useEffect} from 'react';
import {Editor, rootCtx} from '@milkdown/kit/core';
import {nord} from '@milkdown/theme-nord';
import {Milkdown, MilkdownProvider, useEditor, useInstance} from '@milkdown/react';
import {commonmark} from '@milkdown/kit/preset/commonmark';
import {editorViewCtx} from '@milkdown/core';
import {getMarkdown, replaceAll} from '@milkdown/kit/utils';
import {upload, uploadConfig, Uploader} from '@milkdown/kit/plugin/upload';
import type {Node} from '@milkdown/kit/prose/model';
import axios from "axios";

import {EditorTarget} from "../configs/note";
import {getImgurToken} from "../managers/imgurOAuth";

const uploader: Uploader = async (files, schema) => {
    const imgurToken = getImgurToken();
    const images: File[] = [];

    for (let i = 0; i < files.length; i++) {
        const file = files.item(i);
        if (!file || !file.type.includes('image')) {
            continue;
        }
        images.push(file);
    }

    const nodes: Node[] = await Promise.all(
        images.map(async (image) => {
            if (!imgurToken) {
                console.error('No imgur token found');
                return schema.text('No imgur token found');
            }

            const formData = new FormData();
            formData.append('image', image);
            formData.append('type', 'file');
            formData.append('title', image.name);
            let src: string;
            try {
                const response = await axios.post(
                    'https://api.imgur.com/3/image',
                    formData,
                    {
                        headers: {
                            Authorization: `Bearer ${imgurToken}`,
                        },
                    },
                );
                src = response.data.data.link;
            } catch (error) {
                console.error(error);
                return schema.text('Failed to upload image');
            }
            const alt = image.name;
            return schema.nodes.image.createAndFill({
                src,
                alt,
            }) as Node;
        }),
    );

    return nodes;
};

const MilkdownEditor = ({target, setTarget, content, setContent, editorValue, setEditorValue, storeContent}: {
    target: EditorTarget,
    setTarget: React.Dispatch<React.SetStateAction<EditorTarget>>,
    content: string,
    setContent: React.Dispatch<React.SetStateAction<string>>,
    editorValue: EditorTarget,
    setEditorValue: React.Dispatch<React.SetStateAction<EditorTarget>>,
    storeContent: () => void,
}) => {
    useEditor((root) =>
        Editor.make()
            .config(nord)
            .config((ctx) => {
                ctx.set(rootCtx, root);
            })
            .config((ctx) => {
                ctx.update(uploadConfig.key, (prev) => ({
                    ...prev,
                    uploader,
                }));
            })
            .use(commonmark)
            .use(upload),
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
        if (target === EditorTarget.INIT) {
            instance.action(replaceAll(content));
            setTarget(EditorTarget.WYSIWYG);
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
                } else if (
                    target === EditorTarget.DRAFT || target === EditorTarget.BACK || target === EditorTarget.NEXT
                ) {
                    storeContent();
                }
            });
        }
    }, [instance, target, setTarget, content, setContent, editorValue, setEditorValue, storeContent]);
    return <Milkdown/>;
};

export const MilkdownEditorWrapper = ({
                                          target,
                                          setTarget,
                                          content,
                                          setContent,
                                          editorValue,
                                          setEditorValue,
                                          storeContent
                                      }: {
    target: EditorTarget,
    setTarget: React.Dispatch<React.SetStateAction<EditorTarget>>,
    content: string,
    setContent: React.Dispatch<React.SetStateAction<string>>,
    editorValue: EditorTarget,
    setEditorValue: React.Dispatch<React.SetStateAction<EditorTarget>>,
    storeContent: () => void,
}) => {
    return (
        <MilkdownProvider>
            <MilkdownEditor
                target={target}
                setTarget={setTarget}
                content={content}
                setContent={setContent}
                editorValue={editorValue}
                setEditorValue={setEditorValue}
                storeContent={storeContent}
            />
        </MilkdownProvider>
    );
};