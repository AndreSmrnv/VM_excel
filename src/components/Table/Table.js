import {ExcelComponent} from '@core/ExcelComponent'
import {createTable} from '@/components/Table';

export class Table extends ExcelComponent {
    static className = 'excel__table'

    toHTML() {
        return createTable()
    }
}
