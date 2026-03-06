enum myIconEnum {
    play = 'play',
    pause = 'pause',
    stop = 'stop',
    next = 'forward-step',
    back = 'backward-step',
    info = 'circle-info',
    close = 'xmark',
};

export type iconType = myIconEnum;

export const myIcons: Record<string, iconType> = {
    play: myIconEnum.play,
    pause: myIconEnum.pause,
    stop: myIconEnum.stop,
    next: myIconEnum.next,
    back: myIconEnum.back,
    info: myIconEnum.info,
    closePopup: myIconEnum.close,
} as const;