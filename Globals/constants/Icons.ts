enum myIconEnum {
    play = 'play',
    pause = 'pause',
    stop = 'stop',
    next = 'forward-step',
    back = 'backward-step',
};

export type iconType = myIconEnum;

export const myIcons: Record<string, iconType> = {
    play: myIconEnum.play,
    pause: myIconEnum.pause,
    stop: myIconEnum.stop,
    next: myIconEnum.next,
    back: myIconEnum.back,
} as const;