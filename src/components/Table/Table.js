import {ExcelComponent} from '@core/ExcelComponent'
import {createTable} from '@/components/Table';

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
            console.log('Start resizing', event.target.dataset.resize)
        }
    }

}
