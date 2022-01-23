import {ExcelComponent} from '@core/ExcelComponent'
import {createTable} from '@/components/Table';
import {shouldResize} from "@/components/Table/table.helpers";
import {resizeHandler} from "@/components/Table/table.resize";

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
        if (shouldResize(event)) {
            resizeHandler(event, this.$root)
        }
    }
}
