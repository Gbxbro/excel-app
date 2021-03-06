import {$} from '@core/Dom'

export function resizeHandler(event) {
    return new Promise(resolve => {
        const $table = $(event.currentTarget)
        const $resizer = $(event.target)
        const $parent = $resizer.closest('[data-type="resizable"]')
        const $resizeLine = $resizer.find('.line')
        const coord = $parent.getCoord()
        const type = $resizer.data.resize
        let moveCounter = 0
        let value

        $resizeLine.css({'opacity': '1'})

        if (type === 'col') {
            $resizeLine.css({
                'top': '0',
                'bottom': 'none',
                'left': 'none',
                'right': '2px',
                'width': '1px',
                'height': $table.getComputedStyle('height')
            })
        } else {
            $resizeLine.css({
                'top': 'none',
                'bottom': '2px',
                'left': '0',
                'right': 'none',
                'height': '1px',
                'width': $table.getComputedStyle('width')
            })
        }

        document.onmousemove = e => {
            if (type === 'col') {
                moveCounter += e.movementX
                $resizer.css({'right': `${-moveCounter}px`})
            } else {
                moveCounter += e.movementY
                $resizer.css({'bottom': `${-moveCounter}px`})
            }
        }

        document.onmouseup = e => {
            document.onmousemove = null
            $resizeLine.css({opacity: '0'})

            if (type === 'col') {
                value = coord.width + moveCounter
                const resizedCells = document.querySelectorAll(
                    `[data-col="${$parent.data.col}"]`)

                $resizer.css({'right': '0'})
                resizedCells.forEach(item => {
                    $(item).css({'width': value + 'px'})
                })
            } else {
                value = coord.height + moveCounter

                $resizer.css({'bottom': '0'})
                $parent.css({'height': value + 'px'})
            }
            resolve({
                id: $parent.data[type],
                type,
                value
            })
        }
    })
}