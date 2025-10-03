
export declare type chapterType = {
    title: string,
    path: string
};
export declare type listType = {
    // oPlaybackObject?: Audio.SoundObject
    title: string,
    path: string,
    chapters?: chapterType[]
    // chapters?: [
    //     title: string,
    //     path: string
    // ]
};

//export declare type currentPlayingType = chapterType[];

export declare type myTreeNode<ID = string> = {
    'id': ID,
    'name': string,
    'children'?: myTreeNode[],
    'link'?: string,
    'playing'?: boolean
};

export declare type currentPlayingType = myTreeNode[];
/*declare type singleCurrentPlayingType = {
    oCurrent: myTreeNode,
    oPrevious?: myTreeNode,
    oNext?: myTreeNode
}

export declare type currentPlayingType = singleCurrentPlayingType[];*/
/*export declare type myTreeNodeOld<ID = string> = {
    'id': ID,
    'name': string,
    'children'?: myTreeNode[],
    'path': string
};*/