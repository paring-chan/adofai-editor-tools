// eslint-disable-next-line
String.prototype.replaceAll = function (org, dest) {
    return this.split(org).join(dest as string)
}

export const LevelParser = (level: string) => {
    try {
        return JSON.parse(level)
    } catch (e) {
        return JSON.parse(
            String(level)
                .trim()
                .replaceAll(', ,', ',')
                .replaceAll('}\n', '},\n')
                .replaceAll('},\n\t]', '}\n\t]')
                .replaceAll(', },', ' },')
                .replaceAll(', }', ' }')
                .replaceAll('\n', '')
                .replaceAll('}\n', '},\n'),
        )
    }
}
