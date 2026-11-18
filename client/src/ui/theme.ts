// Look and layout constants for DOS-style UI

export const WIDTH = 640;
export const HEIGHT = 400;

/** A subset of the 16-color DOS palette */
export const COLOR = {
    bg:     0x0000aa,
    panel:  0x000000,
    text:   0xaaaaaa,
    bright: 0xffffff,
    accent: 0xffff55,
    dim:    0x555555,
    good:   0x55ff55,
    bad:    0xff5555,
} as const;

export const css = (color: number): string => '#' + color.toString(16).padStart(6, '0');

export const FONT_FAMILY = '"Courier New", Courier, monospace';
export const TEXT_PAD_BOTTOM = 3;

export function textStyle(color: number = COLOR.text, fontSize = 14) {
    return { 
        fontFamily: FONT_FAMILY, 
        fontSize: `${fontSize}px`, 
        color: css(color),
        padding: { bottom: TEXT_PAD_BOTTOM },
    };
}

/** Screen regions, in game pixels */
export const LAYOUT = {
    header: { y: 5 },
    log:    { x: 10, y: 32, width: 620, height: 228 },
    menu:   { x: 4, y: 266, width: 632, height: 130 },
} as const;