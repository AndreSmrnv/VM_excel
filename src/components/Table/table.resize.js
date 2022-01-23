import {$} from '@core/dom'

export function resizeHandler( event, $root) {
  const state = {};
  const $resizer = $(event.target)
  const $parent = $resizer.closest('[data-type="resizable"]')
  const coords = $parent.getCoords()
  const type = $resizer.data.resize

  const sideProp = {
    col: 'bottom',
    row: 'right'
  }
  const sidePropMove = {
    col: 'right',
    row: 'bottom'
  }

  $resizer.css({
    opacity: 1,
    [sideProp[type]]: '-5000px'
  })

  const getValueMoveCol = (e) => {
    state.delta = e.pageX - coords.right
    state.value = coords.width + state.delta
  }

  const getValueMoveRow = (e) => {
    state.delta = e.pageY - coords.bottom
    state.value = coords.height + state.delta
  }

  const getValueMoveElem = {
    col: getValueMoveCol,
    row: getValueMoveRow
  }

  document.onmousemove = e => {
    getValueMoveElem[type](e);
    $resizer.css({[sidePropMove[type]]: -state.delta + 'px'})
  }

  const resizeCol = () => {
    $root.findAll(`[data-col="${$parent.data.col}"]`)
        .forEach(el => el.style.width = `${state.value}px`)
  }

  const resizeRow = () => {
    $parent.css({height: `${state.value}px`})
  }

  const resizesElem = {
    col: resizeCol,
    row: resizeRow
  }

  document.onmouseup = () => {
    document.onmousemove = null
    document.onmouseup = null

    resizesElem[type] && resizesElem[type]();

    $resizer.css({
      opacity: 0,
      bottom: 0,
      right: 0
    })
  }
}
