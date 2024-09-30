enum EditorTarget {
    WYSIWYG,
    MARKDOWN,
    INIT,   // initial state
    DRAFT,  // save draft
    BACK,   // go back (and save draft)
    NEXT,   // go next (and save draft)
}

export {EditorTarget};