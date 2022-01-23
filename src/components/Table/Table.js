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
            const typeResizeElem = $resizer.data.resize

            const cellsResize = (typeResizeElem === 'col')
                ? this.$root.findAll(`[data-col="${$parent.data.col}"]`)
                : [];

            const resizeCol = (e) => {
                const delta = e.pageX - coords.right
                const widthCol = coords.width + delta
                cellsResize.forEach(el => el.style.width = `${widthCol}px`)
            }

            const resizeRow = (e) => {
                const delta = e.pageY - coords.bottom
                const heightRow = coords.height + delta
                $parent.css({height: `${heightRow}px`})
            }

            const resizesElem = {
                col: resizeCol,
                row: resizeRow
            }

            document.onmousemove = e => resizesElem[typeResizeElem]
                && resizesElem[typeResizeElem](e);

            document.onmouseup = () => {
                document.onmousemove = null
            }
        }
    }
}
