/** Word-wrap `text` into lines of at most `cols` characters. Long words are split. */
export function wrapText(text: string, cols: number): string[] {
    const width = Math.max(1, Math.floor(cols));
    const out: string[] = [];
    for (const paragraph of text.split('\n')) {
        if (paragraph.length === 0) {
            out.push('');
            continue;
        }
        let line = '';
        for (const word of paragraph.split(' ')) {
            let w = word;
            while (w.length > width) {
                if (line) {
                    out.push(line);
                    line = '';
                }
                out.push(w.slice(0, width));
                w = w.slice(width);
            }
            if (line === '') line = w;
            else if (line.length + 1 + w.length <= width) line += ' ' + w;
            else {
                out.push(line);
                line = w;
            }
        }
        out.push(line);
    }
    return out;
}