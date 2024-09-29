enum EditorTarget {
    WYSIWYG,
    MARKDOWN,
    INIT,   // initial state
    DRAFT,  // save draft
    BACK,   // go back (and save draft)
}

export {EditorTarget};