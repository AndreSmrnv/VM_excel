import {ExcelComponent} from '@core/ExcelComponent'
import {createTable} from '@/components/Table';
import {$} from '@core/dom';

export class Table extends ExcelComponent {
    static className = 'excel__table'

    constructor($root) {
        super($root, {
            listeners: ['mousedown']
        })
    }

    toHTML() {
        return createTable()
    }

    onMousedown(event) {
        if (event.target.dataset.resize) {
            const $resizer = $(event.target)
            const $parent = $resizer.closest('[data-type="resizable"]')

            const coords = $parent.getCoords()
            const typeResize = $resizer.data.resize

            const cellsResize = (typeResize === 'col')
                ? this.$root.findAll(`[data-col="${$parent.data.col}"]`)
                : [];

            document.onmousemove = e => {
                if (typeResize === 'col') {
                    const delta = e.pageX - coords.right
                    const widthCol = coords.width + delta
                    $parent.css({width: `${widthCol}px`})
                    cellsResize.forEach(el => el.style.width = widthCol + 'px')
                } else {
                    const delta = e.pageY - coords.bottom
                    const heightRow = coords.height + delta
                    $parent.css({height: `${heightRow}px`})
                }
                //console.log($parent.$el.style)
            }

            document.onmouseup = () => {
                document.onmousemove = null
            }
        }
    }
}
